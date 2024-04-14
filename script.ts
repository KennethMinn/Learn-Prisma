import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //delete users
  await prisma.user.deleteMany();

  //create user
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Kenneth",
  //   },
  // });

  //get users
  // const users = await prisma.user.findMany();
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
