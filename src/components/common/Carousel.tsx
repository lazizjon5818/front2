// src/components/common/Carousel.tsx
import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

type CarouselProps = {
  slides: ReactNode[];
  startIndex?: number;
  autoPlay?: boolean;
  interval?: number; // ms
  sx?: any;          // wrapper sx override
};

const Carousel = ({
  slides,
  startIndex = 0,
  autoPlay = false,
  interval = 7000,
  sx,
}: CarouselProps) => {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, next]);

  // klaviatura (chap/o‘ng)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // touch-swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) prev();
    if (dx < -40) next();
    touchStartX.current = null;
  };

  return (
    <Box
      // 🔳 Wrapper — About sahifa “ramkasi”
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        p: { xs: 2, md: 4 },
        border: `1px solid ${theme.palette.divider}`,
        // ⬇️ Orqa fonni shu yerda o‘zgartirasiz (faqat About blokiga ta’sir qiladi)
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0f1115 0%, #10131a 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        ...sx,
      })}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slaydlar – faqat aktivini ko‘rsatamiz (auto-height uchun) */}
      <Box sx={{ position: "relative" }}>
        {slides.map((slide, i) => (
          <Box
            key={i}
            sx={{
              transition: "opacity 320ms ease, transform 320ms ease",
              opacity: i === index ? 1 : 0,
              transform: i === index ? "translateX(0)" : "translateX(8px)",
              position: i === index ? "relative" : "absolute",
              inset: 0,
              pointerEvents: i === index ? "auto" : "none",
            }}
          >
            {slide}
          </Box>
        ))}
      </Box>

      {/* Chap/o‘ng tugmalar */}
      <IconButton
        aria-label="Previous"
        onClick={prev}
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
        aria-label="Next"
        onClick={next}
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

      {/* Pastki nuqtalar */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ position: "absolute", bottom: 10, left: 0, right: 0, justifyContent: "center" }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={(theme) => ({
              width: i === index ? 22 : 10,
              height: 10,
              borderRadius: 999,
              cursor: "pointer",
              transition: "all 200ms",
              bgcolor: i === index ? theme.palette.primary.main : theme.palette.divider,
            })}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Carousel;
