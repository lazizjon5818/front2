// src/components/about/AboutTeam.tsx
import {
    Avatar,
    Box,
    Container,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import SectionCard from "../common/SectionCard";
  import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
  import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
  import { useRef, useState } from "react";
  
  const team = [
    { name: "Dilshod", role: "Founder & IELTS Instructor", avatar: "https://i.pravatar.cc/150?img=11" },
    { name: "Aziza",   role: "Academic Coordinator",        avatar: "https://i.pravatar.cc/150?img=47" },
    { name: "Javlon",  role: "Software Engineer",           avatar: "https://i.pravatar.cc/150?img=15" },
    { name: "Madina",  role: "Content Creator",             avatar: "https://i.pravatar.cc/150?img=5"  },
    // xohlasang yana qo‘shaverasan
  ];
  
  const AboutTeam = () => {
    const theme = useTheme();
    // nechta karta bir vaqtda ko‘rinsin?
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));  // ≥600px
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));  // ≥900px
    const perView = isMdUp ? 3 : isSmUp ? 2 : 1;
  
    const [index, setIndex] = useState(0);
    const maxIndex = Math.max(0, team.length - perView);
  
    const startX = useRef<number | null>(null);
  
    const prev = () => setIndex((i) => Math.max(0, i - 1));
    const next = () => setIndex((i) => Math.min(maxIndex, i + 1));
  
    const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
    const onTouchEnd = (e: React.TouchEvent) => {
      if (startX.current == null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (dx > 40) prev();
      if (dx < -40) next();
      startX.current = null;
    };
  
    return (
      <Box component="section" sx={{ py: { xs: 2, md: 2 }, px: { xs: 2, md: 0 } }}>
        <Container maxWidth="lg">
          {/* SectionCard – avvalgi dizayn saqlanadi */}
          <SectionCard>
            <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: 5 }}>
              Bizning Jamoa
            </Typography>
  
            {/* KARUSEL WRAPPER */}
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 3,
                // ⬇️ Orqa fonni shu yerda o‘zgartirasiz (faqat carousel izi)
                // background: theme.palette.mode === "dark" ? "#0f1117" : "#fff",
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Slaydlar trek'i */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  // index bo‘yicha shift – har bosishda kartalar chapga siljiydi
                  transform: `translateX(calc(${-(index) * (100 / perView)}% - ${index > 0 ? index * 16 : 0}px))`,
                  transition: "transform 320ms ease",
                  willChange: "transform",
                }}
              >
                {team.map((m) => (
                <Box
                key={m.name}
                sx={{
                    position: "relative",     // zIndex ishlashi uchun
                    zIndex: 0,
                    flex: `0 0 ${100 / perView}%`,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.palette.mode === "dark" ? 4 : 1,
                    p: 3,
                    textAlign: "center",
                    background:
                    theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #171b22 0%, #13161c 100%)"
                        : "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                    transition: "transform .25s ease, box-shadow .25s ease",
                    "&:hover": {
                    zIndex: 10,                            // <<— MUHIM
                    transform: "translateY(-6px) scale(1.02)",
                    boxShadow: theme.palette.mode === "dark" ? 10 : 4,
                    },
                }}
                >

                    <Avatar src={m.avatar} alt={m.name} sx={{ width: 96, height: 96, mx: "auto", mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{m.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{m.role}</Typography>
                  </Box>
                ))}
              </Box>
  
              {/* Chap/o‘ng tugmalar */}
              <IconButton
                onClick={prev}
                disabled={index === 0}
                aria-label="Oldingi"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 8,
                  transform: "translateY(-50%)",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { bgcolor: "background.paper" },
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={next}
                disabled={index === maxIndex}
                aria-label="Keyingi"
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 8,
                  transform: "translateY(-50%)",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { bgcolor: "background.paper" },
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
  
              {/* Nuqtalar (indicator) */}
              <Stack direction="row" spacing={1} sx={{ justifyContent: "center", mt: 2 }}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setIndex(i)}
                    sx={(t) => ({
                      width: i === index ? 22 : 10,
                      height: 10,
                      borderRadius: 999,
                      cursor: "pointer",
                      transition: "all 200ms",
                      bgcolor: i === index ? t.palette.primary.main : t.palette.divider,
                    })}
                  />
                ))}
              </Stack>
            </Box>
          </SectionCard>
        </Container>
      </Box>
    );
  };
  
  export default AboutTeam;
  