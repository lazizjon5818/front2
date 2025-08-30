// src/components/home/TestimonialsSection.tsx
import {
    Avatar, Box, Card, CardContent, Container, Stack,
    Typography, useTheme, CardActionArea, Rating,
  } from "@mui/material";
  import { useMemo, useState } from "react";
  import TestimonialDialog, { TestimonialData } from "../common/TestimonialDialog";
  
  const testimonials: TestimonialData[] = [
    {
      name: "Aziza",
      role: "Talaba",
      feedback:
        "Listening testlari menga imtihon oldidan juda yordam berdi. Real formatda bo‘lgani uchun o‘zimni IELTS zalida his qildim. Savollar xilma-xil va darajalar aniq ajratilgan. Ayniqsa, vaqt boshqarish amaliyotlari juda foydali bo‘ldi.",
      avatar: "https://i.pravatar.cc/100?img=47",
      rating: 4.5,
    },
    {
      name: "Javlon",
      role: "IELTS Instructor",
      feedback:
        "Platforma juda qulay va minimal. O‘quvchilarim testlardan mustaqil foydalanib, o‘zini baholash imkoniyatiga ega bo‘lishdi. Izohlar tushunarli, statistik panel esa murabbiy uchun ham qulay.",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 5,
    },
    {
      name: "Madina",
      role: "Foydalanuvchi",
      feedback:
        "Progress tracking funksiyasi menga juda yoqdi. Qayerda xato qilganimni ko‘rib, kuchsiz tomonlarim ustida ishlashim osonlashdi. Writing uchun AI mulohazalari ancha foydali bo‘lyapti.",
      avatar: "https://i.pravatar.cc/100?img=5",
      rating: 4,
    },
  ];
  
  const TestimonialsSection = () => {
    const theme = useTheme();
  
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<TestimonialData | null>(null);
  
    const handleOpen = (t: TestimonialData) => { setSelected(t); setOpen(true); };
    const handleClose = () => { setOpen(false); setSelected(null); };
  
    const keyframes = useMemo(() => ({
      "@keyframes dropIn": {
        "0%": { opacity: 0, transform: "translateY(-24px) scale(0.98)" },
        "60%": { opacity: 1, transform: "translateY(4px) scale(1.005)" },
        "100%": { opacity: 1, transform: "translateY(0px) scale(1)" },
      },
      "@keyframes gentleFloat": {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(4px)" },
        "100%": { transform: "translateY(0px)" },
      },
    }), []);
  
    return (
      <Box component="section" sx={{ py: { xs: 6, md: 4 }, px: { xs: 2, md: 0 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              p: { xs: 3, md: 5 },
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.palette.mode === "dark" ? 6 : 2,
              position: "relative",
  
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(180deg, #0f1115 0%, #10131a 100%)"
                  : "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
  
              // 🔹 Hamma joyda bir xil effekt: section konteyneri hover’da oldinga “chiqadi”
              transition: "transform 280ms ease, box-shadow 280ms ease",
              transform: "perspective(1200px) translateZ(0) scale(1)",
              "&:hover": {
                transform: "perspective(1200px) translateZ(20px) scale(1.0008)",
                boxShadow: theme.palette.mode === "dark" ? 12 : 6,
              },
  
              ...keyframes,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: 6 }}>
              Foydalanuvchilar fikri
            </Typography>
  
            <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="stretch" justifyContent="center">
              {testimonials.map((t, idx) => (
                <Card
                  key={t.name}
                  sx={{
                    flex: 1,
                    borderRadius: 3,
                    boxShadow: theme.palette.mode === "dark" ? 4 : 2,
                    border: `1px solid ${theme.palette.divider}`,
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #171b22 0%, #13161c 100%)"
                        : "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                    animation: `dropIn 520ms ease ${120 * idx}ms both, gentleFloat 5s ease-in-out ${600 + 200 * idx}ms infinite`,
                    transition: "transform .25s ease, box-shadow .25s ease",
                    "&:hover": { transform: "translateY(-6px) scale(1.01)", boxShadow: theme.palette.mode === "dark" ? 10 : 6 },
                  }}
                >
                  <CardActionArea onClick={() => handleOpen(t)} sx={{ height: "100%" }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        <Avatar src={t.avatar} alt={t.name} />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {t.name}
                          </Typography>
                          <Typography component="div" variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                            {t.role}
                          </Typography>
                          {typeof t.rating === "number" && (
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                              <Rating value={t.rating} precision={0.5} readOnly size="small" />
                              <Typography variant="caption" color="text.secondary">
                                {t.rating.toFixed(1)}
                              </Typography>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
  
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.6,
                        }}
                      >
                        “{t.feedback}”
                      </Typography>
  
                      <Typography variant="caption" color="primary" sx={{ display: "block", mt: 2, fontWeight: 700 }}>
                        To‘liq o‘qish →
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </Box>
        </Container>
  
        {/* Modal */}
        <TestimonialDialog open={open} onClose={handleClose} data={selected} />
      </Box>
    );
  };
  
  export default TestimonialsSection;
  