import { prisma } from "@/prisma/prisma";
import { LessonNames, Lessons } from "@/types/db";
import { LessonObject } from "@/types/lessons";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let lessonID = parseInt(req.body.lessonID);
  console.log(lessonID);
  const lessonData = await prisma.lessons.findUnique({
    where: {
      lessonID: lessonID,
    },
  });
  let lessonName = await prisma.lessonnames.findUnique({
    where: {
      lessonNameID: lessonID,
    },
  });
  console.log(lessonData);
  let response: LessonObject = {
    lessonID: lessonData.lessonID,
    lessonName: lessonName.lessonName,
    lessonMD: lessonData.lessonMD,
    lessonCodeDefault: lessonData.lessonCodeDefault,
    lessonCodeSolution: lessonData.lessonCodeSolution,
  };
  res.status(200).send(response);
}
