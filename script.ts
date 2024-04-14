import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //create user
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Kenneth",
  //   },
  // });

  //get users
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
