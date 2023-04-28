import { prisma } from "@/prisma/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

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
  res.status(200).send(value);

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
