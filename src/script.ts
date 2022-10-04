// PrismaClient constructor from the @prisma/client node module.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Instantiate PrismaClien

async function main() { // Define an async function called main to send queries to the database
  const newLink = await prisma.link.create({
    data: {
      description: "Fullstack tutorial for GraphQL",
      url: "www.howtographql.com"
    }
  })
  const allLinks = await prisma.link.findMany();
  console.log(allLinks) // return all the link records that exist in the database.
}

main()
  .catch((e) => {
    throw e;
  })
  // Close the database connections when the script terminate
  .finally(async () => {
    await prisma.$disconnect();
  })