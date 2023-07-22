import { prisma } from "@/prisma/prisma";
import { LessonNames, Lessons } from "@/types/db";
import { LessonObject } from "@/types/lessons";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonID = req.body;
  console.log(lessonID);
  const lessonData = await prisma.lessons.findUnique({
    where: {
      lessonID: lessonID.lessonID,
    },
    include: {
      lessonnames: true,
    },
  });
  console.log(lessonData);
  res.status(200).send(lessonData);
}
