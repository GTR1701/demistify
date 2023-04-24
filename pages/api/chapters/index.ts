import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  chapterID: number;
  chapterName: string;
  courseID: number;
  route: string;
};

// chapterRouter.post('/all', async (req, res) => {
//     const value = await prisma.chapters.findMany();
//     res.json(value);
// });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const value = await prisma.chapters.findMany({
    include: {
      courses: true,
    },
  });
  res.status(200).json(value);

  // const value = await prisma.chapters.findMany({
  //     where: {
  //         courseID: req.params.slug
  //     },
  //     include: {
  //         courses: true
  //     }
  // });
  // res.json(value);
}
