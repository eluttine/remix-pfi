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
      start: new Date("2021-06-21T13:00"),
      raceId: "kokkokarnevaali-race",
    },
  ];
}

function getRaceLines() {
  const startTime = new Date("2021-06-21T13:00:00+03:00");
  const endTime = new Date("2021-06-21T14:57:15+03:00");
  const handicap = 0.9227;

  const sailingDuration = endTime.getTime() - startTime.getTime();
  console.log("sailingDuration :", sailingDuration);
  const handicapDuration = Math.round(sailingDuration * handicap);
  console.log("handicapDuration :", handicapDuration);

  return [
    {
      id: "raceline-1",
      position: 1,
      boatSailnumber: "FIN-5591",
      boatName: "Accelerando",
      boatHandicap: handicap,
      boatModel: "Still 900",
      boatSkipper: "Markku Pöyhönen",
      startTime: startTime,
      endTime: endTime,
      sailingDuration: sailingDuration,
      handicapDuration: handicapDuration,
      raceStartId: "kokkokarnevaali-start",
    },
  ];
}
