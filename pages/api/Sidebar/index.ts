import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const sidebar = await prisma.sidebar.findMany();
    let courses = [];
    let chapters = [];
    let lessons = [];

    for (let i = 0; i < sidebar.length; i++) {
        if (sidebar[i].type === "Course") {
            courses.push(sidebar[i]);
        } else if (sidebar[i].type === "Chapter") {
            chapters.push(sidebar[i]);
        } else if (sidebar[i].type === "Lesson") {
            lessons.push(sidebar[i]);
        }
    }

    const data = {
        courses: courses,
        chapters: chapters,
        lessons: lessons,
    }
    res.status(200).send(data);
}
