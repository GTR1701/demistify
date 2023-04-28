//MUI responsive navbar in nextjs13 with typescript and mui
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  ListItemButton,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  createTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import FormGroup from "@mui/material/FormGroup";
import {
  getChapterList,
  getCourseList,
  getLessonList,
} from "../lib/apiFunctions";
import { ThemeContext } from "@/lib/context";

type Drawer = {
  courses: any[];
  chapters: any[];
  lessons: any[];
};

type HomeProps = {
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Navbar(props: HomeProps) {
  const [open, setOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  let myTheme = useContext(ThemeContext);

  function handleDrawer(): void {
    setOpen(!open);
  }

  useEffect(() => {
    (async () => {
      setCourses(await getCourseList());
      setChapters(await getChapterList());
      setLessons(await getLessonList());
    })();
  }, []);

  const [darkMode, setDarkMode] = useState(true);
  // const handleThemeChange = () => {
  //   setDarkMode(!darkMode);
  //   if (darkMode) {
  //     theme.palette.mode = "dark";
  //     currentTheme.mode = theme.palette.mode;
  //   } else {
  //     theme.palette.mode = "light";
  //     currentTheme.switchTheme();
  //   }
  // };

  const label = { inputProps: { "aria-label": "Dark mode" } };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          {isMobile ? (
            <>
              <Box sx={{ marginLeft: "1rem" }}>
                <Button color="inherit" onClick={() => router.push("/")}>
                  Home
                </Button>
                <Button color="inherit" onClick={() => router.push("/about")}>
                  About
                </Button>
                <Button color="inherit" onClick={() => router.push("/contact")}>
                  Contact
                </Button>
              </Box>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        {...label}
                        onChange={() => myTheme.toggleColorMode()}
                        color={darkMode ? "default" : "secondary"}
                      />
                    }
                    label={
                      darkMode ? (
                        <DarkModeIcon sx={{ paddingTop: "6px" }} />
                      ) : (
                        <LightModeIcon sx={{ paddingTop: "6px" }} />
                      )
                    }
                    labelPlacement="start"
                  />
                </FormGroup>
                <Button
                  color="inherit"
                  sx={{ marginLeft: "auto" }}
                  onClick={() => router.push("/login")}
                >
                  <LoginIcon />
                  <Typography sx={{ marginLeft: "0.5rem" }}>Login</Typography>
                </Button>
              </Box>
            </>
          ) : (
            //mui accordion menu
            <>
              <Accordion
                sx={{
                  backgroundColor: "inherit",
                  width: "90%",
                  border: "none",
                  boxShadow: "none",
                  color: "inherit",
                }}
                onClick={() => setAccordionOpen(!accordionOpen)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  {!accordionOpen ? (
                    <ExpandMoreIcon sx={{ margin: "auto" }} />
                  ) : (
                    <ExpandMoreIcon
                      sx={{ margin: "auto", transform: "rotate(180deg)" }}
                    />
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormGroup sx={{ margin: "auto" }}>
                      <FormControlLabel
                        control={
                          <Switch
                            {...label}
                            onChange={() => myTheme.toggleColorMode()}
                            color={darkMode ? "default" : "secondary"}
                          />
                        }
                        label={
                          darkMode ? (
                            <DarkModeIcon sx={{ paddingTop: "6px" }} />
                          ) : (
                            <LightModeIcon sx={{ paddingTop: "6px" }} />
                          )
                        }
                        labelPlacement="start"
                      />
                    </FormGroup>
                    <Button color="inherit" onClick={() => router.push("/")}>
                      Home
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => router.push("/about")}
                    >
                      About
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => router.push("/contact")}
                    >
                      Contact
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => router.push("/login")}
                    >
                      <LoginIcon />
                      <Typography sx={{ marginLeft: "0.5rem" }}>
                        Login
                      </Typography>
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawer}>
        <CustomDrawer courses={courses} chapters={chapters} lessons={lessons} />
      </Drawer>
    </div>
  );
}

function CustomDrawer({ courses, chapters, lessons }: Drawer) {
  return (
    <List
      sx={{
        margin: "0",
        padding: "0",
        width: 250,
        color: "inherit",
      }}
    >
      {courses.map((course: any) => (
        <CourseAccordion
          course={course}
          chapters={chapters}
          lessons={lessons}
          key={course.courseID}
        />
      ))}
    </List>

    // <Divider />
    // <List></List>
  );
}

function CourseAccordion({ course, chapters, lessons }: any) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const theme = useTheme();

  let bgColor: string;
  if (course.courseID % 2 == 1) {
    bgColor = theme.palette.primary.light;
  } else {
    bgColor = "ffffff";
  }

  return (
    <Accordion
      sx={{ boxShadow: "none" }}
      onClick={() => setAccordionOpen(!accordionOpen)}
    >
      <AccordionSummary>
        <Typography variant="h5">{course.courseName}</Typography>
        {!accordionOpen ? (
          <ExpandMoreIcon
            sx={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
            }}
          />
        ) : (
          <ExpandMoreIcon
            sx={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
              transform: "rotate(180deg)",
            }}
          />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {chapters.map((chapter: any) => {
            if (chapter.courseID == course.courseID) {
              return (
                <ChapterAccordion
                  course={course}
                  chapter={chapter}
                  lessons={lessons}
                  bgcolor={bgColor}
                  key={chapter.chapterID}
                />
              );
            }
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function ChapterAccordion({ course, chapter, lessons, bgcolor }: any) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const router = useRouter();

  return (
    <Accordion
      sx={{ boxShadow: "none" }}
      onClick={() => setAccordionOpen(!accordionOpen)}
    >
      <AccordionSummary>
        <Typography variant="h6">{chapter.chapterName}</Typography>
        {!accordionOpen ? (
          <ExpandMoreIcon
            sx={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
            }}
          />
        ) : (
          <ExpandMoreIcon
            sx={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
              transform: "rotate(180deg)",
            }}
          />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {lessons.map((lesson: any) => {
            if (
              lesson.courseID === course.courseID &&
              lesson.chapterID === chapter.chapterID
            ) {
              return (
                <ListItemButton
                  key={lesson.lessonNameID}
                  onClick={() =>
                    router.push(
                      `${course.route}${chapter.route}${lesson.route}`
                    )
                  }
                >
                  <Typography>{lesson.lessonName}</Typography>
                </ListItemButton>
              );
            }
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
