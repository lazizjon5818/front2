// src/components/home/InfoSection.tsx
import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const InfoSection = () => {
  // 🔹 Hover holati
  const [hovered, setHovered] = useState(false);
  // 🔹 Kirish animatsiyasi uchun state
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Komponent yuklanganda animatsiyani boshlash
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    // 🔹 Tashqi o'rama: karta ko'rinishi
    <Box
      component="section"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={(theme) => ({
        py: { xs: 8, md: 12 },
        borderRadius: 6,
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(30,35,45,0.95) 0%, rgba(20,25,35,0.7) 60%, rgba(15,20,30,0) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,255,0.8) 60%, rgba(240,240,255,0) 100%)",
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: hovered
          ? theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0,0,0,0.5)"
            : "0 8px 32px rgba(0,0,0,0.15)"
          : theme.palette.mode === "dark"
          ? "0 4px 16px rgba(0,0,0,0.3)"
          : "0 4px 16px rgba(0,0,0,0.1)",
        transform: hovered
          ? "perspective(1400px) translateZ(10px) scale(1.01)"
          : "perspective(1400px) translateZ(0px) scale(1)",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        cursor: "default",
        // 🔹 Kirish animatsiyasi
        animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      })}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 5, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 🔹 Matn bloki */}
          <Box sx={{ flex: 1, maxWidth: 640 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
                mb: 3,
                background: theme =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(45deg, #ffffff, #a0a0ff)"
                    : "linear-gradient(45deg, #3333ff, #0066cc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                // 🔹 Kirish animatsiyasi
                animation: isVisible ? "fadeIn 1s ease-out" : "none",
                "@keyframes fadeIn": {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            >
              TEST ENGLISH — onlayn tayyorgarlik platformasi
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.7,
                fontSize: { xs: "1rem", md: "1.1rem" },
                animation: isVisible ? "fadeIn 1.2s ease-out" : "none",
                "@keyframes fadeIn": {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            >
              Listening, Reading, Writing va Speaking bo‘yicha real imtihon
              formatidagi sinovlar, tushunarli izohlar va taraqqiyotni kuzatish
              paneli. Minimal dizayn, aniq maqsad: natija.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
              <Button
                component={Link}
                to="/tests"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background: theme =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(45deg, #3333ff, #0066cc)"
                      : "linear-gradient(45deg, #0066cc, #33ccff)",
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                  "&:hover": {
                    transform: "scale(1.05) translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,102,204,0.4)",
                  },
                  animation: isVisible ? "fadeInUp 1s ease-out 0.2s" : "none",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                Start Tests
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: theme => theme.palette.primary.main,
                  color: theme => theme.palette.primary.main,
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                  "&:hover": {
                    transform: "scale(1.05) translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,102,204,0.3)",
                    background: theme =>
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,102,204,0.05)",
                  },
                  animation: isVisible ? "fadeInUp 1s ease-out 0.3s" : "none",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>

            {/* 🔹 Statistikalar qatori */}
            <Stack direction="row" spacing={4} sx={{ mt: 5 }}>
              {[
                { value: "1k+", label: "faol foydalanuvchi" },
                { value: "200+", label: "mock savollar to‘plami" },
                { value: "4 modul", label: "IELTS yo‘nalishlari" },
              ].map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    transform: hovered ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)",
                    transition: "transform 300ms ease",
                    animation: isVisible ? `fadeInUp 1s ease-out ${0.4 + index * 0.1}s` : "none",
                    "@keyframes fadeInUp": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      background: theme =>
                        theme.palette.mode === "dark"
                          ? "linear-gradient(45deg, #ffffff, #a0a0ff)"
                          : "linear-gradient(45deg, #0066cc, #33ccff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* 🔹 Vizual karta */}
          <Box
            sx={(theme) => ({
              flex: 1,
              width: "100%",
              borderRadius: 4,
              p: 4,
              minHeight: 240,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: hovered
                ? theme.palette.mode === "dark"
                  ? "0 8px 24px rgba(0,0,0,0.4)"
                  : "0 8px 24px rgba(0,0,0,0.15)"
                : theme.palette.mode === "dark"
                ? "0 4px 12px rgba(0,0,0,0.2)"
                : "0 4px 12px rgba(0,0,0,0.1)",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #222733 0%, #1a1f2b 100%)"
                  : "linear-gradient(135deg, #f8f9ff 0%, #ececff 100%)",
              transition: "box-shadow 300ms ease, transform 300ms ease",
              // 🔹 Pulsatsiya animatsiyasi
              animation: isVisible ? "pulse 2s ease-in-out infinite" : "none",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.02)" },
                "100%": { transform: "scale(1)" },
              },
            })}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: theme =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(45deg, #ffffff, #a0a0ff)"
                    : "linear-gradient(45deg, #0066cc, #33ccff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Nega TEST ENGLISH?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.8,
                animation: isVisible ? "fadeIn 1.2s ease-out" : "none",
                "@keyframes fadeIn": {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            >
              • Real imtihon formatidagi topshiriqlar
              <br />• Har savolga tushunarli izohlar
              <br />• Shaxsiy progress ko‘rsatkichlari
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default InfoSection;