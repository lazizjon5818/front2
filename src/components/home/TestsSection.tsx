// src/components/home/TestsSection.tsx
import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import TestCard from "../common/TestCard";

const tests = [
  {
    title: "Listening Test",
    desc: "Audio topshiriqlar orqali tinglab tushunish ko‘nikmangizni rivojlantiring.",
    Icon: HeadphonesIcon,
    accent: "#7C4DFF",
  },
  {
    title: "Reading Test",
    desc: "Matn asosida savollarga javob berib, o‘qish tezligini oshiring.",
    Icon: MenuBookIcon,
    accent: "#00BFA6",
  },
  {
    title: "Writing Test",
    desc: "Insho va topshiriqlar orqali yozish ko‘nikmangizni mustahkamlang.",
    Icon: EditIcon,
    accent: "#FF6D00",
  },
];

const TestsSection = () => {
  const theme = useTheme();
  const [hoverAccent, setHoverAccent] = useState<string | null>(null);

  return (
<Box
  component="section"
  sx={{
    py: { xs: 6, md: 10 },
    px: { xs: 2, md: 0 },
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`,
    overflow: "hidden",

    // 🔹 animatsiyalar
    transition: "transform 280ms ease, background 0.4s ease",
    transform: "perspective(1200px) translateZ(0) scale(1)",

    // 🔹 SECTION hoverida 3D “chiqish” effekti
    "&:hover": {
      transform: "perspective(1200px) translateZ(20px) scale(1.0008)",
    },

    // 🔹 fon: karta ustida bo‘lsang — o‘sha kartaning rangi; bo‘lmasa default
    background: hoverAccent
      ? `${hoverAccent}22`
      : theme.palette.mode === "dark"
      ? "#0f1115"
      : "#f9fafb",
  }}
>

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, textAlign: "center", mb: 6, letterSpacing: 0.2 }}
        >
          Bepul Sinov Testlari
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="stretch"
          justifyContent="center"
        >
          {tests.map((test, idx) => (
            <TestCard key={idx} {...test} onHover={setHoverAccent} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default TestsSection;
