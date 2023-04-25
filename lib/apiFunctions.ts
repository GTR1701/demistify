async function getCourseList() {
  const response = await fetch("http://localhost:3000/api/courses");
  const courseList = await response.json();
  return courseList;
}

async function getChapterList() {
  const response = await fetch("http://localhost:3000/api/chapters");
  const chapterList = await response.json();
  return chapterList;
}

async function getLessonList() {
  const response = await fetch("http://localhost:3000/api/lessons");
  const lessonList = await response.json();
  return lessonList;
}

export { getCourseList, getChapterList, getLessonList };
