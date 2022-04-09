import { PrismaClient, RaceLine } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getClubs().map((club) => {
      return db.club.upsert({
        where: { id: club.id },
        update: {},
        create: club,
      });
    })
  );

  await Promise.all(
    getRegattas().map((regatta) => {
      return db.regatta.upsert({
        where: { id: regatta.id },
        update: {},
        create: regatta,
      });
    })
  );

  await Promise.all(
    getRaces().map((race) => {
      return db.race.upsert({
        where: { id: race.id },
        update: {},
        create: race,
      });
    })
  );

  await Promise.all(
    getRaceStarts().map((raceStart) => {
      return db.raceStart.upsert({
        where: { id: raceStart.id },
        update: {},
        create: raceStart,
      });
    })
  );

  await Promise.all(
    getRaceLines().map((raceLine) => {
      return db.raceLine.upsert({
        where: { id: raceLine.id },
        update: {},
        create: raceLine,
      });
    })
  );
}

seed();

function getClubs() {
  return [
    {
      id: "jvs",
      name: "Jyväskylän veneseura",
      abbreviation: "JVS",
      slug: "jvs",
    },
    {
      id: "teps",
      name: "Tehin pursiseura",
      abbreviation: "TePS",
      slug: "teps",
    },
  ];
}

function getRegattas() {
  return [
    {
      id: "kokkokarnevaali",
      name: "Kokkokarnevaali 2021",
      date: new Date("2021-06-21"),
      clubId: "jvs",
    },
  ];
}

function getRaces() {
  return [
    {
      id: "kokkokarnevaali-race",
      date: new Date("2021-06-21"),
      name: "Kokkokarnevaali 2021",
      regattaId: "kokkokarnevaali",
    },
  ];
}

function getRaceStarts() {
  return [
    {
      id: "kokkokarnevaali-start",
      number: 1,
      startTime: new Date("2021-06-21T13:00"),
      raceId: "kokkokarnevaali-race",
    },
  ];
}

function getRaceLines() {
  const racelines = [];

  const start = new Date("2021-06-21T13:00:00+03:00");
  let end = new Date("2021-06-21T14:57:15+03:00");
  let handicap = 0.9227;
  let durations = getDurations(start, end, handicap);
  racelines.push({
    id: "raceline-1",
    position: 1,
    boatSailnumber: "FIN-5591",
    boatName: "Accelerando",
    boatHandicap: handicap,
    boatModel: "Still 900",
    boatSkipper: "Markku Pöyhönen",
    // startTime: start,
    endTime: end,
    sailingDuration: durations.sailingDuration,
    handicapDuration: durations.handicapDuration,
    raceStartId: "kokkokarnevaali-start",
  });

  // start = new Date("2021-06-21T13:00:00+03:00");
  end = new Date("2021-06-21T15:00:30+03:00");
  handicap = 0.9025;
  durations = getDurations(start, end, handicap);
  racelines.push({
    id: "raceline-2",
    position: 2,
    boatSailnumber: "FIN-8845",
    boatName: "Shango",
    boatHandicap: handicap,
    boatModel: "X-79",
    boatSkipper: "Heikki Nurmi",
    // startTime: start,
    endTime: end,
    sailingDuration: durations.sailingDuration,
    handicapDuration: durations.handicapDuration,
    raceStartId: "kokkokarnevaali-start",
  });

  return racelines;
}

function getDurations(startTime: Date, endTime: Date, handicap: number) {
  const sailingDuration = endTime.getTime() - startTime.getTime();
  const handicapDuration = Math.round(sailingDuration * handicap);
  return {
    sailingDuration,
    handicapDuration,
  };
}
