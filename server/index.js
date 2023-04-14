import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import router from "./api/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use(cors())
app.use(express.json());
app.use('/api', router);
