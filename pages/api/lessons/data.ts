import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(data);
  const value = await prisma.lessons.findUnique({
    where: {},
  });

  res.status(200).send(value);
}
