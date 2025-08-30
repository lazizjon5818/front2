// src/components/about/AboutFeatures.tsx
import { Avatar, Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { School, Insights, TrendingUp } from "@mui/icons-material";
import SectionCard from "../common/SectionCard";

const features = [
  {
    title: "Samarali o‘qish",
    desc:
      "Listening, Reading, Writing, Speaking — real imtihon formatida mashqlar.",
    icon: <School />,
  },
  {
    title: "Progress kuzatuvi",
    desc: "Shaxsiy statistika paneli orqali taraqqiyotni nazorat qiling.",
    icon: <Insights />,
  },
  {
    title: "Natijaga yo‘naltirilgan",
    desc: "Minimal dizayn; faqat zarur bo‘limlar, aniq maqsad — natija.",
    icon: <TrendingUp />,
  },
];

const AboutFeatures = () => {
  const theme = useTheme();
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 1 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        <SectionCard>
          <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: 4 }}>
            Afzalliklar
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems="stretch"
            justifyContent="center"
          >
            {features.map((f) => (
              <Box
                key={f.title}
                sx={{
                  flex: 1,
                  borderRadius: 3,
                  p: 4,
                  textAlign: "center",
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.palette.mode === "dark" ? 4 : 1,
                  transition: "transform .25s ease, box-shadow .25s ease",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.01)",
                    boxShadow: theme.palette.mode === "dark" ? 10 : 4,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    color: "#fff",
                  }}
                >
                  {f.icon}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Box>
            ))}
          </Stack>
        </SectionCard>
      </Container>
    </Box>
  );
};

export default AboutFeatures;
