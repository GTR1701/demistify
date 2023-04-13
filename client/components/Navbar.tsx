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
  styled,
  FormControlLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import FormGroup from "@mui/material/FormGroup";

type handleDrawer = {
  handleDrawer: () => void;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  function handleDrawer(): void {
    setOpen(!open);
  }

  //implement a dark mode toggle
  const [darkMode, setDarkMode] = useState(true);
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      theme.palette.mode = "dark";
    } else {
      theme.palette.mode = "light";
    }
  };

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
              <Box sx={{ marginLeft: "auto", display: "flex" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        {...label}
                        onChange={() => handleThemeChange()}
                        color={darkMode ? "default" : "secondary"}
                      />
                    }
                    label={
                      <Typography>
                        {darkMode ? "Toggle light mode" : "Toggle dark mode"}
                      </Typography>
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
                            onChange={() => handleThemeChange()}
                            color={darkMode ? "default" : "secondary"}
                          />
                        }
                        label={
                          <Typography>
                            {darkMode
                              ? "Toggle light mode"
                              : "Toggle dark mode"}
                          </Typography>
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
        <CustomDrawer handleDrawer={() => handleDrawer()} />
      </Drawer>
    </div>
  );
}

function CustomDrawer({ handleDrawer }: handleDrawer) {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "white",
        color: "black",
      }}
      role="presentation"
      onClick={handleDrawer}
      onKeyDown={handleDrawer}
    >
      <List>
        <ListItemButton key="Home" onClick={() => router.push("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton key="About" onClick={() => router.push("/about")}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton key="Contact" onClick={() => router.push("/contact")}>
          <ListItemIcon>
            <AlternateEmailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton key="Login" onClick={() => router.push("/login")}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItemButton>
      </List>
    </Box>
  );
}
