import axios from "axios";

interface LoginData {
  login: string;
  password: string;
}

interface Data extends LoginData {
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

async function callRegisterUser({ login, password, email }: Data) {
  const res = await axios.post("http://demistify.pl/api/auth/register", {
    login,
    password,
    email,
  });
  return res;
}

async function callLoginUser({ login, password }: LoginData) {
  const res = await axios.post("http://demistify.pl/api/auth/login", {
    login,
    password,
  });
  return res;
}

export {
  getCourseList,
  getChapterList,
  getLessonList,
  callRegisterUser,
  callLoginUser,
};
