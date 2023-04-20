import express from 'express';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const chapterRouter = express.Router();

// chapterRouter.post('/all', async (req, res) => {
//     const value = await prisma.chapters.findMany();
//     res.json(value);
// });

chapterRouter.get('/:slug', async (req, res) => {
    const value = await prisma.chapters.findMany({
        where: {
            courseID: parseInt(req.params.slug)
        },
        include: {
            courses: true
        }
    });
    res.json(value);

    // const value = await prisma.chapters.findMany({
    //     where: {
    //         courseID: req.params.slug
    //     },
    //     include: {
    //         courses: true
    //     }
    // });
    // res.json(value);

});
export default chapterRouter;