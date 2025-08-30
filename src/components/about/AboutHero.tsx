// src/components/about/AboutHero.tsx
import { Box, Typography, Container } from "@mui/material";
import SectionCard from "../common/SectionCard";

const AboutHero = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 1 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        <SectionCard>
          <Typography variant="h3" sx={{ fontWeight: 900, textAlign: "center", mb: 2 }}>
            Biz haqimizda
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 760, mx: "auto", textAlign: "center", lineHeight: 1.8 }}
          >
            TEST ENGLISH — onlayn tayyorgarlik platformasi. Listening, Reading, Writing va Speaking
            bo‘yicha real imtihon formatidagi sinovlar, tushunarli izohlar va taraqqiyotni kuzatish
            paneli. Minimal dizayn, aniq maqsad: natija.
          </Typography>
        </SectionCard>
      </Container>
    </Box>
  );
};

export default AboutHero;
