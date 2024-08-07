import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //delete user
  // await prisma.user.delete({
  //   where: {
  //     email: "email@gmail.com", //must be unique field
  //   },
  // });

  //delete users
  await prisma.user.deleteMany();

  //create user
  // const create_user = await prisma.user.create({
  //   data: {
  //     name: "kenneth",
  //     email: "mtk@gmail.com",
  //     isAdmin: false,
  //     //must add include or select to see this
  //     userPrefrence: {
  //       create: {
  //         emailUpdates: true,
  //       },
  //     },
  //   },
  //   //return the whole obj
  //   include: {
  //     userPrefrence: true, // will see userPrefrence
  //   },

  //   //return only specific fields
  //   // select: {
  //   // name: true,
  //   // userPrefrence: true,

  //   //or

  //   //userPrefrence: {
  //   // return the whole obj
  //   // include: {
  //   //   user: true,
  //   // },

  //   //return only specific fields
  //   // select: {
  //   //   id: true,
  //   //   user: true,
  //   // },
  //   //},
  //   //},
  // });

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
      {
        name: "yma",
        email: "yma@gmail.com",
        isAdmin: false,
      },
    ],
  });

  //create usePreference(dependent) model
  const userPreference = await prisma.userPrefrence.create({
    data: {
      emailUpdates: false,
      userId: "d3fbca92-2d04-4c5e-b734-05ac4b623ffc", // must add - to connect relation with that one specific user
    },
  });

  //get user - can only filter unique fileds
  const user = await prisma.user.findUnique({
    where: {
      //normal
      email: "mtk@gmail.com",

      //uniqueness constraint - @@unique([name, email])
      name_email: {
        name: "kenneth",
        email: "mtk@gmail.com",
      },
    },
    include: {
      userPrefrence: true,
    },
  });

  //get users
  const users = await prisma.user.findMany({
    where: {
      isAdmin: false,
    },
    include: {
      userPrefrence: true,
    },

    //sorting
    orderBy: {
      email: "asc", // or 'desc'
    },

    //pagination
    //take: 1, // items per page
    //skip: 1, // skip the first item - [skip , take]
  });

  //update user
  const update_user = await prisma.user.update({
    where: {
      //email or id
      email: "mtkk@gmail.com", //must be unique field
    },
    data: {
      email: "min@gmail.com",

      //update one to one relation
      userPrefrence: {
        //upsert
        // upsert : {
        //   where : {
        //     id : "userPrefrenceId"
        //   },
        //   update : {
        //     emailUpdates : true //Data to update if the user is found
        //   },
        //   create : {
        //     emailUpdates : true // Data to create if the user is not found - must add all fields
        //   }
        // }

        //connect
        // connect: {
        //   id: "userPrefrenceId",
        // },

        //upsert
        //will try to connect to an existing record if it exists, and if it doesn't, it will create a new record
        connectOrCreate: {
          where: {
            id: "userPrefrenceId", //nothing will change, existing prefrence will connect with user
          },
          create: {
            emailUpdates: true, //will create a new preference and connect with user
          },
        },
      },
    },
    include: {
      userPrefrence: true,
    },
  });
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
