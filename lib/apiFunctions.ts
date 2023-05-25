async function getCourseList() {
  const response = await fetch("http://localhost:8000/courses/", {
    mode: "cors",
  });
  const courseList = await response.json();
  return courseList;
}

async function getChapterList() {
  const response = await fetch("http://localhost:8000/chapters/");
  const chapterList = await response.json();
  return chapterList;
}

async function getLessonList() {
  const response = await fetch("http://localhost:8000/lessons/");
  const lessonList = await response.json();
  return lessonList;
}

export { getCourseList, getChapterList, getLessonList };
