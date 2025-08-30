// src/pages/About.tsx
import { Box, Container, Stack } from "@mui/material";
import AboutHero from "../components/about/AboutHero";
import AboutStats from "../components/about/AboutStats";
import AboutFeatures from "../components/about/AboutFeatures";
import AboutTeam from "../components/about/AboutTeam";
import AboutCTA from "../components/about/AboutCTA";

const About = () => {
  return (
    <Container maxWidth="lg">
      {/* 🔹 Bu Box About sahifani umumiy ramka qilib turadi */}
      <Box
        sx={(theme) => ({
          borderRadius: 4,
          p: { xs: 2, md: 4 },
          border: `1px solid ${theme.palette.divider}`,
          // ⬇️ Shu joyda orqa fon rangini o‘zgartirasiz
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #0f1115 0%, #10131a 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        })}
      >
        <Stack spacing={{ xs: 6, md: 10 }}>
          <AboutHero />
          <AboutStats />
          <AboutFeatures />
          <AboutTeam />
          <AboutCTA />
        </Stack>
      </Box>
    </Container>
  );
};

export default About;
