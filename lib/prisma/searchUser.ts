import prisma from "./prisma";

export default async function searchUser(searchQuery:string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: searchQuery, // Use 'contains' for partial string matching
        },
      },
    });

    return users;
  } catch (error:any) {
    console.error(`Error fetching users by name: ${error.message}`);
    throw error;
  }
}


