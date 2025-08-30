// src/components/about/AboutCTA.tsx
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import SectionCard from "../common/SectionCard";

const AboutCTA = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 1 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        <SectionCard sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
            IELTS safaringizni bugunoq boshlang
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680, mx: "auto", mb: 3 }}>
            Real testlar, izohlar, progress — barchasi bitta platformada.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <CustomButton component={RouterLink} to="/tests" accent="#7C4DFF" sx={{ minWidth: 200 }}>
              Start Tests
            </CustomButton>
            <CustomButton component={RouterLink} to="/pricing" accent="#ffffff" sx={{ minWidth: 200, background: "#fff", color: "#000" }}>
              View Pricing
            </CustomButton>
          </Stack>
        </SectionCard>
      </Container>
    </Box>
  );
};

export default AboutCTA;
