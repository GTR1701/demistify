import express from 'express';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const courseRouter = express.Router();

// courseRouter.post('/all', async (req, res) => {
//     const value = await prisma.courses.findMany();
//     res.json(value);
//     console.log(value);
// });

courseRouter.get('/:slug', async (req, res) => {
    if (req.params.slug !== 'all') {
        const value = await prisma.courses.findMany({
            where: {
                courseName: req.params.slug
            }
        });
        res.json(value);
    } else {
        const value = await prisma.courses.findMany();
        res.json(value);
    }
});
export default courseRouter;