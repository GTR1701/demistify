async function getCourseList() {
  const response = await fetch("http://demistify.pl/api/courses/", {
    mode: "cors",
  });
  const courseList = await response.json();
  return courseList;
}

async function getChapterList() {
  const response = await fetch("http://demistify.pl/api/chapters/", {
    mode: "cors",
  });
  const chapterList = await response.json();
  return chapterList;
}

async function getLessonList() {
  const response = await fetch("http://demistify.pl/api/lessons/", {
    mode: "cors",
  });
  const lessonList = await response.json();
  return lessonList;
}

export { getCourseList, getChapterList, getLessonList };
