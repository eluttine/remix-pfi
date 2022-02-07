import { PrismaClient } from "@prisma/client";
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
    getStarts().map((start) => {
      return db.start.upsert({
        where: { id: start.id },
        update: {},
        create: start,
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
      id: "regatta-1",
      name: "Testi regatta 1",
      date: new Date(),
      clubId: "jvs",
    },
  ];
}

function getRaces() {
  return [
    {
      id: "race-1",
      name: "Test race 1",
      date: new Date(),
      regattaId: "regatta-1",
    },
  ];
}

function getStarts() {
  return [
    {
      id: "start-1",
      number: 1,
      start: new Date(),
      end: new Date(),
      raceId: "race-1",
    },
    // {
    //   id: "start-2",
    //   number: 2,
    //   start: new Date(),
    //   end: new Date(),
    //   raceId: "race-1",
    // },
  ];
}
