import express from 'express';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

router.get('/:courseID', async (req, res) => {
    if (req.params.value == "all") {
        const value = await prisma.courses.findMany();
        res.json(value)
    } else {
        const value = await prisma.courses.findMany({
            where: {
                courseID: req.params.value
            }
        });
        res.json(value)
    }
});
export default router;