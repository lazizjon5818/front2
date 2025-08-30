// src/components/Navbar.tsx
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Switch,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  import { useTheme, alpha } from "@mui/material/styles";
  import { useThemeContext } from "../context/ThemeContext";
  import logo from "../assets/logo.png";
  
  const Navbar = () => {
    const muiTheme = useTheme();
    const { mode, toggleTheme } = useThemeContext();
  
    const bg = alpha(
      muiTheme.palette.primary.main,
      mode === "dark" ? 0.12 : 0.08
    );
    const border = alpha(
      muiTheme.palette.primary.main,
      mode === "dark" ? 0.25 : 0.3
    );
  
    return (
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          mt: 2,
          mx: "auto",
          px: 3,
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
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", minHeight: 64 }}
        >
          {/* 🔰 Logo va nomi */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.1)" },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              TEST{" "}
              <Box component="span" sx={{ color: "text.primary" }}>
                ENGLISH
              </Box>
            </Typography>
          </Box>
  
          {/* 📂 Navigatsiya tugmalari */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/about"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/tests"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Tests
            </Button>
            <Button
              component={Link}
              to="/subscription"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Subscription
            </Button>
          </Box>
  
          {/* 🔐 Auth va Theme Toggle */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Theme switcher */}
            <Switch checked={mode === "dark"} onChange={toggleTheme} color="primary" />
  
            {/* 👉 Auth buttons */}
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
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Navbar;
  