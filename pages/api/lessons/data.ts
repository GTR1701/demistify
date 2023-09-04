//@ts-nocheck
import { prisma } from "@/prisma/prisma";
import { Lessons } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonRoute = req.body.lessonRoute
  const chapterRoute = req.body.chapterRoute
  const courseRoute = req.body.courseRoute

  const courses = await prisma.courses.findMany({
    where: {
      route: courseRoute,
    },
  });
  const chapters = await prisma.chapters.findMany({
    where: {
      route: chapterRoute,
    },
  });

  let correctChapter = null;

  courses.map((course) => {
    chapters.map((chapter) => {
    if(course.courseName === chapter.course){
      correctChapter = chapter
    }
    })
  });
  
  const lesson = await prisma.lessons.findMany<Lessons>({
    where: {
      AND:[
        {route: lessonRoute},
        {chapter: correctChapter.chapterName}
      ]
    },
  });

  res.status(200).send(lesson);
}
