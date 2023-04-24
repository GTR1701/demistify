import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.params.slug !== "all") {
  //     const value = await prisma.courses.findMany({
  //       where: {
  //         courseName: req.params.slug,
  //       },
  //     });
  //     res.json(value);
  //   } else {
  const value = await prisma.courses.findMany();
  res.status(200).json(value);
  //   }
}
