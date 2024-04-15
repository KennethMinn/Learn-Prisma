import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //delete users
  await prisma.user.deleteMany();

  //create user
  const create_user = await prisma.user.create({
    data: {
      name: "kenneth",
      email: "mtk@gmail.com",
      isAdmin: false,
      //must add include or select to see this
      userPrefrence: {
        create: {
          emailUpdates: true,
        },
      },
    },
    //return the whole obj
    include: {
      userPrefrence: true, // will see userPrefrence
    },

    //return only specific fields
    // select: {
    // name: true,
    // userPrefrence: true,

    //or

    //userPrefrence: {
    // return the whole obj
    // include: {
    //   user: true,
    // },

    //return only specific fields
    // select: {
    //   id: true,
    //   user: true,
    // },
    //},
    //},
  });

  //create users - can't use include or select and can't add one to one fields
  const create_users = await prisma.user.createMany({
    data: [
      {
        name: "kenneth_new",
        email: "mtkk@gmail.com",
        isAdmin: false,
      },
      {
        name: "mtk",
        email: "mtk2@gmail.com",
        isAdmin: false,
      },
    ],
  });

  //get user
  const user = await prisma.user.findUnique({
    where: {
      email: "mtk@gmail.com",
    },
  });
  console.log(user);

  //get users
  const users = await prisma.user.findMany({
    where: {
      isAdmin: false,
    },
  });
  console.log(users);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
