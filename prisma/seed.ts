import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertSteps() {
  const components = [
    { name: "signUp", step: 1 },
    { name: "aboutMe", step: 2 },
    { name: "address", step: 3 },
    { name: "birthdate", step: 3 },
  ];

  for (const c of components) {
    const exisitingComponent = await prisma.component.findMany({
      where: { name: c.name },
    });
    const { name, step } = c;
    if (exisitingComponent.length === 0) {
      await prisma.component.create({ data: { name, step } });
    }
  }
  console.log("Database seeded with components!");
}

insertSteps().catch((e) => {
  console.error(e, "Error inserting component steps");
});
