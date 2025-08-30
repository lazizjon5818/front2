// src/components/home/InfoSection.tsx
import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const InfoSection = () => {
  // 🔹 Hover holatini ushlab turamiz (faqat animatsiya uchun)
  const [hovered, setHovered] = useState(false);

  return (
    // 🔹 Tashqi o'rama: "karta" ko'rinishi uchun radius + shadow + overflow
    <Box
      component="section"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={(theme) => ({
        // Ichki/yuqori-pastki bo'shliq
        py: { xs: 6, md: 10 },

        // 1) ORQA FON + BORDER RADIUS:
        //    - linear-gradient fon
        //    - radius: katta yumaloqlik
        //    - overflow: hidden (gradient radiusdan tashqariga chiqmasligi uchun)
        borderRadius: 4,
        overflow: "hidden",

        // Fon rangini temaga mos qilib olamiz (light/dark)
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(19,22,28,0.9) 0%, rgba(19,22,28,0.6) 60%, rgba(19,22,28,0) 100%)"
            : "linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(250,250,250,0.7) 60%, rgba(250,250,250,0) 100%)",

        // Border/ajratish istasang (ixtiyoriy):
        border: `1px solid ${theme.palette.divider}`,

        // Engil soyali karta ko‘rinishi
        boxShadow: theme.palette.mode === "dark" ? 4 : 2,

        // 2) HOVER EFFEKTI:
        //   - “oldinga chiqish” (scale + translateZ)
        //   - chap tomonni pastga “og‘dirish” (rotateZ: musbat qiymat soat strelkasi bo‘yicha – chap pastga tushadi)
        //   - perspective 3D chuqurlik beradi
        transform: hovered
          ? "perspective(1200px) translateZ(20px) scale(1.0008) "
          : "perspective(1200px) translateZ(0px) scale(1)",
        transition: "transform 280ms ease",

        // Kursor kirganda “interaktiv” sezilsin
        cursor: "default",
      })}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 🔹 Matn bloki */}
          <Box sx={{ flex: 1, maxWidth: 620 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, letterSpacing: 0.2, mb: 2 }}
            >
              TEST ENGLISH — onlayn tayyorgarlik platformasi
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Listening, Reading, Writing va Speaking bo‘yicha real imtihon
              formatidagi sinovlar, tushunarli izohlar va taraqqiyotni kuzatish
              paneli. Minimal dizayn, aniq maqsad: natija.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
              <Button component={Link} to="/tests" variant="contained" size="large">
                Start Tests
              </Button>
              <Button component={Link} to="/about" variant="text" size="large">
                Learn More
              </Button>
            </Stack>

            {/* 🔹 Kichik statlar qatori */}
            <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  1k+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  faol foydalanuvchi
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  200+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  mock savollar to‘plami
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  4 modul
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  IELTS yo‘nalishlari
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* 🔹 Vizual plashka (ixtiyoriy) */}
          <Box
            sx={(theme) => ({
              flex: 1,
              width: "100%",
              borderRadius: 3,
              p: 3,
              minHeight: 220,

              // Ichki karta uchun chekka va soyalar
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.palette.mode === "dark" ? 4 : 1,

              // Ichki fonni ham temaga mos gradient bilan berdik
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #1b1f27 0%, #151921 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
            })}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Nega TEST ENGLISH?
            </Typography>
            <Typography variant="body2" color="text.secondary">
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
