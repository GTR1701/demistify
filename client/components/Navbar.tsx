//create a MUI responsive navbar in nextjs13 with typescript and mui
import React from "react";
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
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function handleDrawer(): void {
    setOpen(!open);
  }

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nextjs13 MUI
          </Typography>
          <Button color="inherit" onClick={() => router.push("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push("/about")}>
            About
          </Button>
          <Button color="inherit" onClick={() => router.push("/contact")}>
            Contact
          </Button>
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => router.push("/register")}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawer}>
        <CustomDrawer handleDrawer={() => handleDrawer()} />
      </Drawer>
    </div>
  );
}

function CustomDrawer({ handleDrawer }) {
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
            <img src="/home.svg" alt="home" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton key="About" onClick={() => router.push("/about")}>
          <ListItemIcon>
            <img src="/about.svg" alt="about" />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton key="Contact" onClick={() => router.push("/contact")}>
          <ListItemIcon>
            <img src="/contact.svg" alt="contact" />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton key="Login" onClick={() => router.push("/login")}>
          <ListItemIcon>
            <img src="/login.svg" alt="login" />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItemButton>
        <ListItemButton key="Register" onClick={() => router.push("/register")}>
          <ListItemIcon>
            <img src="/register.svg" alt="register" />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItemButton>
      </List>
    </Box>
  );
}
