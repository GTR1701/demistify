import axios from "axios";

interface Data {
  login: string;
  password: string;
  email: string;
}

async function getCourseList() {
  const response = await fetch("http://demistify.pl/api/courses", {
    mode: "cors",
  });
  const courseList = await response.json();
  return courseList;
}

async function getChapterList() {
  const response = await fetch("http://demistify.pl/api/chapters", {
    mode: "cors",
  });
  const chapterList = await response.json();
  return chapterList;
}

async function getLessonList() {
  const response = await fetch("http://demistify.pl/api/lessons", {
    mode: "cors",
  });
  const lessonList = await response.json();
  return lessonList;
}

async function sendData({ login, password, email }: Data) {
  const res = await axios.post("http://demistify.pl/api/auth/register", {
    login,
    password,
    email,
  });
  return res;
}

export { getCourseList, getChapterList, getLessonList, sendData };
