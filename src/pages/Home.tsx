// src/pages/Home.tsx
import { Stack } from "@mui/material";
import InfoSection from "../components/home/InfoSection";
import TestsSection from "../components/home/TestsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <Stack
      spacing={{ xs: 6, md: 10 }}  // 🔹 sectionlar oralig'i
      sx={{ pb: { xs: 6, md: 10 } }} // pastdan ham ozroq joy qoldiramiz
    >
      <InfoSection />
      <TestsSection />
      <TestimonialsSection />
      <CTASection />
    </Stack>
  );
};

export default Home;
