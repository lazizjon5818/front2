// src/components/home/CTASection.tsx
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import CustomButton from "../common/CustomButton";

/**
 * 4-qism: CTA (ro'yxatdan o'tish / boshlashga undash)
 * - Orqa fon: gradient + glass his, borderRadius + shadow (kartaga o'xshash)
 * - Minimal tipografiya
 * - 2 ta tugma: Start Now (accent), Pricing (oq)
 */
const CTASection = () => {
  const theme = useTheme();

  return (
    
    <Box component="section" sx={{ py: { xs: 8, md: 2 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        {/* Wrap — orqa fon + radius + soyalar */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 4,                // 🔹 yumaloq burchaklar
            overflow: "hidden",             // gradient chetga chiqmasin
            px: { xs: 3, md: 8 },
            py: { xs: 6, md: 8 },
            boxShadow: theme.palette.mode === "dark" ? 10 : 4, // yumshoq soya
            border: `1px solid ${theme.palette.divider}`,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(23,27,34,.85) 0%, rgba(19,22,28,.95) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,.85) 0%, rgba(250,250,252,.95) 100%)",

            // Dekor — yengil “blob”lar (pastel) creative lekin minimal
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                theme.palette.mode === "dark"
                  ? "radial-gradient(60rem 60rem at -10% -20%, rgba(124,77,255,.10), transparent 55%), radial-gradient(50rem 50rem at 120% 10%, rgba(0,191,166,.10), transparent 55%)"
                  : "radial-gradient(60rem 60rem at -10% -20%, rgba(124,77,255,.08), transparent 55%), radial-gradient(50rem 50rem at 120% 10%, rgba(0,191,166,.08), transparent 55%)",
              pointerEvents: "none",
            },
          }}
        >
          <Stack spacing={3} alignItems="center" textAlign="center">
            {/* Sarlavha */}
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, letterSpacing: 0.2, lineHeight: 1.15 }}
            >
              IELTS safaringizni bugunoq boshlang
            </Typography>

            {/* Sub matn */}
            <Typography
              color="text.secondary"
              sx={{ maxWidth: 760, lineHeight: 1.7 }}
            >
              Real formatdagi sinovlar, tushunarli izohlar va progress kuzatuvi — barchasi bitta platformada.
              Istalgan payt rejangizni o‘zgartirishingiz mumkin.
            </Typography>

            {/* Tugmalar — CustomButton bilan */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
              {/* Asosiy action: Tests sahifasiga */}
                <CustomButton
                component={RouterLink}
                to="/tests"
                accent="#7C4DFF"
                sx={{ minWidth: 200, textAlign: "center" }}
                >
                Start Now
                </CustomButton>

              {/* Ikkinchi action: Pricing sahifasi – oq/fonli ko‘rinish */}
                <CustomButton
                component={RouterLink}
                to="/subscription"
                accent="#ffffff"
                sx={{ minWidth: 200, textAlign: "center", background: "#fff", color: "#000" }}
                >
                View Pricing
                </CustomButton>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
