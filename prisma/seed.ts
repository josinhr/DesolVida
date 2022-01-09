import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getOldPeople().map((oldPerson) => {
      return db.oldPerson.create({ data: oldPerson });
    })
  );
}

seed();

function getOldPeople() {
  return [
    {
      name: "Isabelle Row",
      address: "84462",
      photo: 1,
    },
    {
      name: "Jessica Milles",
      address: "84462",
      photo: 2,
    },
    {
      name: "Kathryn Mcguire",
      address: "84462",
      photo: 3,
    },
    {
      name: "Nicole Fontana",
      address: "84462",
      photo: 4,
    },
  ];
}
