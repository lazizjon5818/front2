// src/components/about/AboutStats.tsx
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import SectionCard from "../common/SectionCard";

const stats = [
  { label: "faol foydalanuvchi", value: "1k+" },
  { label: "mock savollar to‘plami", value: "200+" },
  { label: "IELTS modullar", value: "4" },
];

const AboutStats = () => {
  const theme = useTheme();
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 1 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        <SectionCard>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 6 }}
            justifyContent="space-between"
            alignItems="center"
          >
            {stats.map((s) => (
              <Box key={s.label} sx={{ textAlign: "center", minWidth: 200 }}>
                <Typography variant="h3" sx={{ fontWeight: 900 }}>
                  {s.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </SectionCard>
      </Container>
    </Box>
  );
};

export default AboutStats;
