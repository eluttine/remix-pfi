import {
  LoaderFunction,
  useLoaderData,
  useParams,
  useCatch,
  Form,
  ActionFunction,
  json,
} from 'remix'

import RaceComponent from '~/components/RaceComponent'
import Breadcrumb from '~/components/Breadcrumb'
import Navbar from '~/components/Navbar'
import { TextFieldInput } from '~/components/TextFieldInput'

import type { Club, Race, RaceLine, RaceStart } from '@prisma/client'
import { db } from '~/utils/db.server'
import { createRaceLineAndReorder } from '~/lib/raceLine'

type LoaderData = {
  club: Club
  race: Race //& { starts: (RaceStart & { raceLines: RaceLine[] })[] };
  start: RaceStart & { raceLines: RaceLine[] }
}

export let loader: LoaderFunction = async ({ params }) => {
  const club = await db.club.findUnique({
    where: { slug: params.clubId },
  })

  const race = await db.race.findUnique({
    where: {
      id: params.raceId,
    },
    include: {
      starts: {
        where: {
          id: params.raceStartId,
        },
        include: {
          raceLines: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  })

  const start = race?.starts[0]

  if (!club || !race || !start) {
    throw new Response('Sivua ei löytynyt.', {
      status: 404,
    })
  }

  return { club, race, start }
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    boatSailnumber: string | undefined
    boatName: string | undefined
    boatHandicap: string | undefined
    boatModel: string | undefined
    endTime: string | undefined
  }
  fields?: {
    boatSailnumber: string
    boatName: string
    boatHandicap: string
    boatModel: string
    endTime: string
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

// Validators
const validateBoatSailnumber = (boatSailnumber: string) => {
  return undefined
}
const validateBoatName = (boatName: string) => {
  return undefined
}
const validateBoatHandicap = (boatHandicap: string) => {
  const float = parseFloat(boatHandicap.replace(',', '.'))
  if (typeof float !== 'number' && !isNaN(float)) return 'Handicap not valid'
}
const validateBoatModel = (boatModel: string) => {
  return undefined
}
const validateBoatSkipper = (boatSkipper: string) => {
  return undefined
}
const validateEndTime = (endTime: string) => {
  return undefined
}

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()

  const boatSailnumber = form.get('boatSailnumber')
  const boatName = form.get('boatName')
  const boatHandicap = form.get('boatHandicap')
  const boatModel = form.get('boatModel')
  const boatSkipper = form.get('boatSkipper')
  // const startTime = form.get("startTime");
  const endTime = form.get('endTime')
  // const sailingDuration = form.get("sailingDuration"); //  number | null
  // const handicapDuration = form.get("handicapDuration"); //  number | null
  // const raceStartId = form.get("raceStartId"); //  string
  //const raceStartId = form.get("raceStartId");

  if (
    typeof boatSailnumber !== 'string' ||
    typeof boatName !== 'string' ||
    typeof boatHandicap !== 'string' ||
    typeof boatModel !== 'string' ||
    typeof boatSkipper !== 'string' ||
    typeof endTime !== 'string'
  ) {
    return badRequest({
      formError: `Form not submitted correctly 1`,
    })
  }

  const fieldErrors = {
    boatSailnumber: validateBoatSailnumber(boatSailnumber),
    boatName: validateBoatName(boatName),
    boatHandicap: validateBoatHandicap(boatHandicap),
    boatModel: validateBoatModel(boatModel),
    boatSkipper: validateBoatSkipper(boatSkipper),
    endTime: validateEndTime(endTime),
  }

  const fields = {
    boatSailnumber,
    boatName,
    boatHandicap,
    boatModel,
    boatSkipper,
    endTime,
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  const raceStart = await db.raceStart.findUnique({
    where: { id: params.raceStartId },
  })

  if (!raceStart) {
    throw new Response('Race start not found', { status: 404 })
  }

  const endtimeDt = getEndTime(raceStart.startTime, endTime)

  try {
    return createRaceLineAndReorder({
      boatSailnumber,
      boatName,
      boatHandicap: parseFloat(boatHandicap.replace(',', '.')),
      boatModel,
      boatSkipper,
      endTime: endtimeDt,
      raceStartId: raceStart.id,
      startTime: raceStart.startTime,
    })
  } catch (e) {
    console.log('Form parameter error:', e)
    return badRequest({
      formError: `Form not submitted correctly.`,
    })
  }
}

export default function ClubIdRoute() {
  const data = useLoaderData<LoaderData>()

  return (
    <div>
      <Navbar />
      <Breadcrumb club={data.club} race={data.race} />
      <div className="container pt-5 pl-5">
        <RaceComponent race={data.race} start={data.start} />

        <Form method="post">
          <div className="field is-horizontal">
            <div className="field-body">
              <TextFieldInput label="Purjenumero" name="boatSailnumber" />
              <TextFieldInput label="Nimi" name="boatName" />
              <TextFieldInput label="Tasoitus" name="boatHandicap" />
              <TextFieldInput label="Venetyyppi" name="boatModel" />
              <TextFieldInput label="Kippari" name="boatSkipper" />
              <TextFieldInput label="Maaliintuloaika" name="endTime" />
            </div>
          </div>
          <button className="button is-primary">Lisää</button>
        </Form>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()

  switch (caught.status) {
    case 404: {
      return <div>Huh? What the heck is {params.clubId}?</div>
    }
    case 401: {
      return <div>Sorry, but {params.clubId} is not your joke.</div>
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`)
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { clubId } = useParams()

  console.log('Error', error)

  return (
    <div>{`There was an error loading club by the id ${clubId}. Sorry.`}</div>
  )
}

const getEndTime = (startTime: Date | null, endTime: string | undefined) => {
  if (!startTime || !endTime) return null

  const start = new Date(startTime)

  const [hours, minutes, seconds] = endTime.split(':')
  start.setHours(parseInt(hours))
  start.setMinutes(parseInt(minutes))
  start.setSeconds(parseInt(seconds))

  return start
}
