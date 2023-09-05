import prisma from "./prisma";

export default async function searchUser() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

searchUser()
  .then((users) => console.log(users))
  .catch((e) => {
    throw e;
  });
