import prisma from "./prisma";

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany()
    return tags
  } catch (error) {
    console.error("Error:", error);
  }
}