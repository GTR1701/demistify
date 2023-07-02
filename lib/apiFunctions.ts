import axios from "axios";

interface LoginData {
  login: string;
  password: string;
}

interface Data extends LoginData {
  email: string;
}

export async function getCourseList() {
  const response = await fetch("http://demistify.pl/api/courses", {
    mode: "cors",
  });
  const courseList = await response.json();
  return courseList;
}

export async function getChapterList() {
  const response = await fetch("http://demistify.pl/api/chapters", {
    mode: "cors",
  });
  const chapterList = await response.json();
  return chapterList;
}

export async function getLessonList() {
  const response = await fetch("http://demistify.pl/api/lessons", {
    mode: "cors",
  });
  const lessonList = await response.json();
  return lessonList;
}

export async function callRegisterUser({ login, password, email }: Data) {
  const res = await axios.post("http://demistify.pl/api/auth/register", {
    login,
    password,
    email,
  });
  return res;
}

export async function callLoginUser({ login, password }: LoginData) {
  console.log(login, password);
  const res = await axios.post("http://demistify.pl/api/auth/login", {
    login,
    password,
  });
  return res;
}

export async function fetchLessonData(
  coursePath: string,
  chapterPath: string,
  lessonPath: string
) {
  const res = await axios.post("http://localhost:3000/api/lessons/data", {
    coursePath,
    chapterPath,
    lessonPath,
  });
  return res;
}
