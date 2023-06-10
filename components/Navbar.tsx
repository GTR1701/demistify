//MUI responsive navbar in nextjs13 with typescript and mui
import { ThemeContext } from "@/lib/context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  ListItemButton,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import FormGroup from "@mui/material/FormGroup";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  getChapterList,
  getCourseList,
  getLessonList,
} from "../lib/apiFunctions";
import { AccordionContext, UserContext } from "@/lib/context";

type Drawer = {
  courses: any[];
  chapters: any[];
  lessons: any[];
};

type HomeProps = {
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Navbar(props: HomeProps) {
  const { accordionState, setAccordionState } = useContext(AccordionContext);

  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  let myTheme = useContext(ThemeContext);
  const { uid, username, update } = useContext(UserContext);

  function handleDrawer(): void {
    setOpen(!open);
  }

  useEffect(() => {
    (async () => {
      setCourses(await getCourseList());
      setChapters(await getChapterList());
      setLessons(await getLessonList());
    })();
  }, [uid, username]);

  const [darkMode, setDarkMode] = useState(true);

  const label = { inputProps: { "aria-label": "Dark mode" } };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
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
                        color="default"
                      />
                    }
                    label={
                      theme.palette.mode === "dark" ? (
                        <DarkModeIcon sx={{ paddingTop: "6px" }} />
                      ) : (
                        <LightModeIcon sx={{ paddingTop: "6px" }} />
                      )
                    }
                    labelPlacement="start"
                  />
                </FormGroup>
                {!uid ? (
                  <Button color="inherit" onClick={() => router.push("/login")}>
                    <LoginIcon />
                    <Typography sx={{ marginLeft: "0.5rem" }}>
                      Zaloguj
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    onClick={() => {
                      localStorage.removeItem("uid");
                      localStorage.removeItem("username");
                      update("", "");
                    }}
                  >
                    <LoginIcon />
                    <Typography sx={{ marginLeft: "0.5rem" }}>
                      Wyloguj
                    </Typography>
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <>
              <Accordion
                sx={{
                  backgroundColor: "inherit",
                  width: "90%",
                  border: "none",
                  boxShadow: "none",
                  color: "inherit",
                }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  onClick={() => setAccordionState(!accordionState)}
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  {!accordionState ? (
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
                            onChange={() => {
                              myTheme.toggleColorMode();
                            }}
                            color={darkMode ? "default" : "secondary"}
                          />
                        }
                        label={
                          theme.palette.mode === "dark" ? (
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
                    {!uid ? (
                      <Button
                        color="inherit"
                        onClick={() => router.push("/login")}
                      >
                        <LoginIcon />
                        <Typography sx={{ marginLeft: "0.5rem" }}>
                          Zaloguj
                        </Typography>
                      </Button>
                    ) : (
                      <Button
                        color="inherit"
                        onClick={() => {
                          localStorage.removeItem("uid");
                          localStorage.removeItem("username");
                          update("", "");
                        }}
                      >
                        <LoginIcon />
                        <Typography sx={{ marginLeft: "0.5rem" }}>
                          Wyloguj
                        </Typography>
                      </Button>
                    )}
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
            if (chapter.courseID == course.ID) {
              return (
                <ChapterAccordion
                  course={course}
                  chapter={chapter}
                  lessons={lessons}
                  bgcolor={bgColor}
                  key={chapter.ID}
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
              lesson.courseID === course.ID &&
              lesson.chapterID === chapter.ID
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
