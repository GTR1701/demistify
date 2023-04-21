import axios from "axios";

async function getCourseList() {
  const courseList = await (
    await axios.get("http://localhost:4000/courses/all")
  ).data;
  console.log(courseList);
  return courseList;
}

async function getChapterList() {
  const chapterList = await (
    await axios.get("http://localhost:4000/chapters/1")
  ).data;
  console.log(chapterList);
  return chapterList;
}

async function getLessonList() {
  const lessonList = await (
    await axios.get("http://localhost:4000/lessons/all")
  ).data;
  console.log(lessonList);
  return lessonList;
}

export { getCourseList, getChapterList, getLessonList };
