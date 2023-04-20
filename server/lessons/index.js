import express from 'express';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const lessonRouter = express.Router();

// courseRouter.post('/all', async (req, res) => {
//     const value = await prisma.courses.findMany();
//     res.json(value);
//     console.log(value);
// });

lessonRouter.get('/:slug', async (req, res) => {
    if (req.params.slug !== 'all') {
        const value = await prisma.lessonnames.findMany({
            where: {
                chapterID: parseInt(req.params.slug)
            },
            include: {
                chapters: true,
                courses: true,
            }
        });
        res.json(value);
    } else {
        const value = await prisma.lessons.findMany();
        res.json(value);
    }
});
export default lessonRouter;