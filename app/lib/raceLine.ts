// Create RaceLine and update positions for start

import { RaceLine } from '@prisma/client'
import { db } from '~/utils/db.server'

type RaceLineData = {
  boatSailnumber: string
  boatName: string
  boatHandicap: number
  boatModel: string
  boatSkipper: string
  endTime: Date | null
  raceStartId: string
  startTime: Date | null
  sailingDuration?: number
  handicapDuration?: number
}

export async function createRaceLineAndReorder(rlData: RaceLineData) {
  const durations = getDurations(
    rlData.startTime,
    rlData.endTime,
    rlData.boatHandicap
  )

  rlData.sailingDuration = durations?.sailingDuration
  rlData.handicapDuration = durations?.handicapDuration

  const raceLine = await createRaceLine(rlData)

  await updatePositions(rlData.raceStartId)

  return raceLine
}

async function createRaceLine(rlData: RaceLineData) {
  const {
    boatSailnumber,
    boatName,
    boatHandicap,
    boatModel,
    boatSkipper,
    endTime,
    raceStartId,
    sailingDuration,
    handicapDuration,
  } = rlData

  return await db.raceLine.create({
    data: {
      // position: parseInt(position),
      boatSailnumber,
      boatName,
      boatHandicap,
      boatModel,
      boatSkipper,
      endTime,
      sailingDuration,
      handicapDuration,
      raceStartId,
    },
  })
}

export async function updatePositions(raceStartId: string) {
  const raceLines = await db.raceLine.findMany({
    where: {
      raceStartId: raceStartId,
    },
  })

  // console.log('before')
  // for (const r of raceLines) console.log(r.position, r.boatName)

  raceLines.sort(compare)

  for (let i = 0; i < raceLines.length; i++) {
    const raceLine = raceLines[i]
    raceLine.position = i + 1

    await db.raceLine.update({
      where: { id: raceLine.id },
      data: {
        position: raceLine.position,
      },
    })
  }

  // console.log('after')
  // for (const r of raceLines) console.log(r.position, r.boatName)
}

function compare(a: RaceLine, b: RaceLine) {
  if (!a.handicapDuration) return -1

  if (!b.handicapDuration) return 1

  if (a.handicapDuration < b.handicapDuration) return -1

  if (a.handicapDuration > b.handicapDuration) return 1

  return 0
}

function getDurations(
  startTime: Date | null,
  endTime: Date | null,
  handicap: number
) {
  if (!startTime || !endTime) return

  const sailingDuration = endTime.getTime() - startTime.getTime()
  console.log('sailingDuration :', sailingDuration)
  const handicapDuration = Math.round(sailingDuration * handicap)
  console.log('handicapDuratio :', handicapDuration)

  return {
    sailingDuration,
    handicapDuration,
  }
}
