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
  CircularProgress,
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
  getSidebar,
} from "../lib/apiFunctions";
import { AccordionContext, UserContext } from "@/lib/context";
import Link from "next/link";
import { animated, useSpring } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import {
  ICustomDrawer,
  ICustomDrawerChapters,
  ICustomDrawerCourses,
} from "@/types/navbar";
import { IChapters, ICourses, ILessons, ISidebar } from "@/types/db";

export default function Navbar() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getSidebar,
  });

  const { accordionState, setAccordionState } = useContext(AccordionContext);

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  let myTheme = useContext(ThemeContext);
  const { uid, username, update } = useContext(UserContext);

  function handleDrawer(): void {
    setOpen(!open);
  }

  const darkThemeIconStyle = useSpring({
    opacity: theme.palette.mode === "dark" ? 1 : 0,
    y: theme.palette.mode === "dark" ? 0 : 0.5,
    rotate: theme.palette.mode === "dark" ? 0 : -45,
  });
  const lightThemeIconStyle = useSpring({
    opacity: theme.palette.mode !== "dark" ? 1 : 0,
    y: theme.palette.mode !== "dark" ? 0 : 0.5,
    rotate: theme.palette.mode === "dark" ? -45 : 0,
  });
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
                      <>
                        <animated.div style={darkThemeIconStyle}>
                          <DarkModeIcon
                            sx={{
                              paddingTop: "6px",
                              translate: "0 0.9rem",
                              scale: "1.1",
                            }}
                          />
                        </animated.div>
                        <animated.div style={lightThemeIconStyle}>
                          <LightModeIcon
                            sx={{
                              paddingTop: "6px",
                              translate: "0 -0.9rem",
                              scale: "1.1",
                            }}
                          />
                        </animated.div>
                      </>
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
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomDrawer
            courses={data?.data.courses}
            chapters={data?.data.chapters}
            lessons={data?.data.lessons}
          />
        )}
      </Drawer>
    </div>
  );
}

function CustomDrawer({
  courses,
  chapters,
  lessons,
}: ICustomDrawer<ISidebar[], ISidebar[], ISidebar[]>) {
  return (
    <List
      sx={{
        margin: "0",
        padding: "0",
        width: 250,
        color: "inherit",
      }}
    >
      {courses.map((course: ISidebar, index: number) => (
        <CourseAccordion
          index={index}
          course={course}
          chapters={chapters}
          lessons={lessons}
          key={course.id}
        />
      ))}
    </List>

    // <Divider />
    // <List></List>
  );
}

function CourseAccordion({
  index,
  course,
  chapters,
  lessons,
}: ICustomDrawerCourses<ISidebar, ISidebar[], ISidebar[]>) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const theme = useTheme();

  let bgColor: string;
  if (index % 2 == 1) {
    bgColor = theme.palette.primary.light;
  } else {
    bgColor = "ffffff";
  }

  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary onClick={() => setAccordionOpen(!accordionOpen)}>
        <Link
          href={`/${course.route}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography variant="h5">{course.name}</Typography>
        </Link>
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
          {chapters.map((chapter: any, index: number) => {
            if (chapter.childOf === course.name) {
              return (
                <ChapterAccordion
                  index={index}
                  course={course}
                  chapter={chapter}
                  lessons={lessons}
                  bgColor={bgColor}
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

function ChapterAccordion({
  index,
  course,
  chapter,
  lessons,
  bgColor,
}: ICustomDrawerChapters<ISidebar, ISidebar, ISidebar[]>) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const router = useRouter();

  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary onClick={() => setAccordionOpen(!accordionOpen)}>
        <Link
          href={`/${course.route}/${chapter.route}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography variant="h5">{chapter.name}</Typography>
        </Link>
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
              chapter.childOf === course.name &&
              lesson.childOf === chapter.name
            ) {
              return (
                <ListItemButton
                  key={lesson.id}
                  onClick={() =>
                    router.push(
                      `/${course.route}/${chapter.route}/${lesson.route}`
                    )
                  }
                >
                  <Typography>{lesson.name}</Typography>
                </ListItemButton>
              );
            }
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
