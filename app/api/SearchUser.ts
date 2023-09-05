import { NextResponse } from "next/server";
import prisma from "../../lib/prisma/prisma";

export async function POST(request: Request) {
  const searchData = await request.json();
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: searchData.name,
      },
    },
  });
  return NextResponse.json(users);
}
