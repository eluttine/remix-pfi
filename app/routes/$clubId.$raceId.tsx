import { LoaderFunction, useLoaderData, useParams, useCatch } from "remix";

import RaceComponent from "~/components/RaceComponent";
import Breadcrumb from "~/components/Breadcrumb";
import Navbar from "~/components/Navbar";

import type { Club, Race } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { club: Club; race: Race };

export let loader: LoaderFunction = async ({ params }) => {
  const club = await db.club.findUnique({
    where: { slug: params.clubId },
  });

  const race = await db.race.findUnique({
    where: {
      id: params.raceId,
    },
  });

  if (!club || !race) {
    throw new Response("Sivua ei löytynyt.", {
      status: 404,
    });
  }

  return { club, race };
};

export default function ClubIdRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <Navbar />
      <Breadcrumb club={data.club} race={data.race} />
      <RaceComponent race={data.race} />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 404: {
      return <div>Huh? What the heck is {params.clubId}?</div>;
    }
    case 401: {
      return <div>Sorry, but {params.clubId} is not your joke.</div>;
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { clubId } = useParams();

  console.log("Error", error);

  return (
    <div>{`There was an error loading club by the id ${clubId}. Sorry.`}</div>
  );
}
