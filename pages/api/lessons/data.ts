import { prisma } from "@/prisma/prisma";
import { LessonNames, Lessons } from "@/types/db";
import { LessonObject } from "@/types/lessons";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(data);
  const value: Lessons | null = await prisma.lessons.findUnique({
    where: {
      lessonID: data.lessonID,
    },
  });
  const lessonName: LessonNames | null = await prisma.lessonnames.findUnique({
    where: {
      lessonNameID: data.lessonID,
    },
  });
  let responseData: LessonObject;
  value
    ? (responseData = {
        lessonID: value?.lessonID,
        lessonName: lessonName?.lessonName,
        lessonMD: value?.lessonMD,
        lessonCodeDefault: value?.lessonCodeDefault,
        lessonCodeSolution: value?.lessonCodeSolution,
      })
    : (responseData = {
        lessonID: null,
        lessonName: null,
        lessonMD: null,
        lessonCodeDefault: null,
        lessonCodeSolution: null,
      });

  res.status(200).send(responseData);
}
