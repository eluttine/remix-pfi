import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function seed() {
  console.log('Start seeding ...')

  for (const c of getClubs()) {
    const club = await db.club.upsert({
      where: { id: c.id },
      update: {},
      create: c,
    })
    console.log(`Club '${club.name}' OK.`)
  }

  for (const r of getRegattas()) {
    const regatta = await db.regatta.upsert({
      where: { id: r.id },
      update: {},
      create: r,
    })
    console.log(`Regatta '${regatta.name}' OK.`)
  }

  for (const r of getRaces()) {
    const race = await db.race.upsert({
      where: { id: r.id },
      update: {},
      create: r,
    })
    console.log(`Race '${race.name}' OK.`)
  }

  for (const rs of getRaceStarts()) {
    const raceStart = await db.raceStart.upsert({
      where: { id: rs.id },
      update: {},
      create: rs,
    })
    console.log(`RaceStart '${raceStart.id}' OK.`)
  }

  for (const rl of getRaceLines()) {
    const raceStart = await db.raceLine.upsert({
      where: { id: rl.id },
      update: {},
      create: rl,
    })
    console.log(`RaceLine '${raceStart.position} - ${raceStart.boatName}' OK.`)
  }

  console.log('Seeding finished.')
}

seed().catch((e) => {
  console.error('Seed error:', e)
  process.exit(1)
})

function getClubs() {
  return [
    {
      id: 'jvs',
      name: 'Jyväskylän veneseura',
      abbreviation: 'JVS',
      slug: 'jvs',
    },
    {
      id: 'teps',
      name: 'Tehin pursiseura',
      abbreviation: 'TePS',
      slug: 'teps',
    },
  ]
}

function getRegattas() {
  return [
    {
      id: 'kokkokarnevaali',
      name: 'Kokkokarnevaali 2021',
      date: new Date('2021-06-21'),
      clubId: 'jvs',
    },
  ]
}

function getRaces() {
  return [
    {
      id: 'kokkokarnevaali-race',
      date: new Date('2021-06-21'),
      name: 'Kokkokarnevaali 2021',
      regattaId: 'kokkokarnevaali',
    },
  ]
}

function getRaceStarts() {
  return [
    {
      id: 'kokkokarnevaali-start',
      number: 1,
      startTime: new Date('2021-06-21T13:00'),
      raceId: 'kokkokarnevaali-race',
    },
  ]
}

function getRaceLines() {
  const racelines = []

  const start = new Date('2021-06-21T13:00:00+03:00')
  let end = new Date('2021-06-21T14:57:15+03:00')
  let handicap = 0.9227
  let durations = getDurations(start, end, handicap)
  racelines.push({
    id: 'raceline-1',
    position: 1,
    boatSailnumber: 'FIN-5591',
    boatName: 'Accelerando',
    boatHandicap: handicap,
    boatModel: 'Still 900',
    boatSkipper: 'Markku Pöyhönen',
    // startTime: start,
    endTime: end,
    sailingDuration: durations.sailingDuration,
    handicapDuration: durations.handicapDuration,
    raceStartId: 'kokkokarnevaali-start',
  })

  // start = new Date("2021-06-21T13:00:00+03:00");
  end = new Date('2021-06-21T15:00:30+03:00')
  handicap = 0.9025
  durations = getDurations(start, end, handicap)
  racelines.push({
    id: 'raceline-2',
    position: 2,
    boatSailnumber: 'FIN-8845',
    boatName: 'Shango',
    boatHandicap: handicap,
    boatModel: 'X-79',
    boatSkipper: 'Heikki Nurmi',
    // startTime: start,
    endTime: end,
    sailingDuration: durations.sailingDuration,
    handicapDuration: durations.handicapDuration,
    raceStartId: 'kokkokarnevaali-start',
  })

  return racelines
}

function getDurations(startTime: Date, endTime: Date, handicap: number) {
  const sailingDuration = endTime.getTime() - startTime.getTime()
  const handicapDuration = Math.round(sailingDuration * handicap)

  return {
    sailingDuration,
    handicapDuration,
  }
}
