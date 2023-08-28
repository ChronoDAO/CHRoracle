import prisma from "./prisma";

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany()

return categories

    } catch (error) {
      console.error("Error:", error);
    } finally {
      await prisma.$disconnect();
    }
  }