// src/components/Navbar.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import { useThemeContext } from "../context/ThemeContext";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../assets/logo.png";

const Navbar = () => {
  const muiTheme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const bg = alpha(muiTheme.palette.primary.main, mode === "dark" ? 0.12 : 0.08);
  const border = alpha(muiTheme.palette.primary.main, mode === "dark" ? 0.25 : 0.3);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Tests", to: "/tests" },
    { label: "Subscription", to: "/subscription" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        mt: 2,
        mx: "auto",
        px: 2,
        py: 1,
        maxWidth: 1200,
        borderRadius: 5,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        backdropFilter: "blur(10px)",
        boxShadow:
          mode === "dark"
            ? "0 2px 14px rgba(0,0,0,0.35)"
            : "0 2px 14px rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: 64 }}>
        {/* 🔰 Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
            TEST{" "}
            <Box component="span" sx={{ color: "text.primary" }}>
              ENGLISH
            </Box>
          </Typography>
        </Box>

        {/* 📱 Mobil menyu */}
        {isMobile ? (
          <>
            <IconButton onClick={() => setOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
              <Box
                sx={{ width: 250, display: "flex", flexDirection: "column", p: 2, gap: 1 }}
                role="presentation"
                onClick={() => setOpen(false)}
              >
              {navLinks.map((link) => (
                <List key={link.to}>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={link.to}>
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}

                <Divider />
                {/* 🔐 Auth */}
                <Button
                  component={Link}
                  to="/signin"
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Sign Up
                </Button>

                {/* 🌗 Theme */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Switch checked={mode === "dark"} onChange={toggleTheme} color="primary" />
                  <Typography variant="body2">Dark Mode</Typography>
                </Box>
              </Box>
            </Drawer>
          </>
        ) : (
          /* 🖥 Desktop menyu */
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                color="inherit"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                {link.label}
              </Button>
            ))}
            <Switch checked={mode === "dark"} onChange={toggleTheme} color="primary" />
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
              color="primary"
              size="small"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="primary"
              size="small"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
