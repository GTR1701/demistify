import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.params.slug !== "all") {
  //     const value = await prisma.lessonnames.findMany({
  //       where: {
  //         chapterID: parseInt(req.params.slug),
  //       },
  //       include: {
  //         chapters: true,
  //         courses: true,
  //       },
  //     });
  //     res.json(value);
  //   } else {
  const value = await prisma.lessonnames.findMany({});
  res.status(200).send(value);
  //   }
}
