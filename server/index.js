import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import courseRouter from "./courses/index.js";
import chapterRouter from "./chapters/index.js";
import lessonRouter from "./lessons/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use('/courses', courseRouter);
app.use('/chapters', chapterRouter);
app.use('/lessons', lessonRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});