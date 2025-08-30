// src/components/layout/Footer.tsx
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Telegram,
  LinkedIn,
  ArrowUpward,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

/**
 * 10+ FUNKSIYA:
 * 1) Logo + about   2) Main nav   3) Services   4) Contact info
 * 5) Social icons   6) Language select   7) Newsletter
 * 8) Back to top    9) Legal links       10) Copyright
 */

const Footer = () => {
  const theme = useTheme(); // 🔹 App theme’dan foydalanamiz
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState<"en" | "uz" | "ru">("en");

  const handleSubscribe = () => {
    // TODO: backendga yuborish yoki snackbar
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 8, md: 12 },
        pt: 8,
        pb: 4,
        borderTop: `1px solid ${theme.palette.divider}`,
        // App theme mode’iga mos gradient fon
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #10131a, #0f1115)"
            : "linear-gradient(180deg, #fafafa, #ffffff)",
      }}
    >
      <Container maxWidth="lg">
        {/* Ustki qism: 4 bo‘lim — faqat Stack/Box */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* 1) Logo + about */}
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, mb: 1, color: theme.palette.primary.main }}
            >
              TEST ENGLISH
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Onlayn IELTS tayyorgarlik platformasi: sinovlar, izohlar va progress
              kuzatuvi.
            </Typography>
          </Box>

          {/* 2) Main navigation */}
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5 }}>
              Navigatsiya
            </Typography>
            <Stack spacing={1.2}>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/tests">Tests</Link>
              <Link to="/subscription">Pricing</Link>
              <Link to="/contact">Contact</Link>
            </Stack>
          </Box>

          {/* 3) Services */}
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5 }}>
              Xizmatlar
            </Typography>
            <Stack spacing={1.2}>
              <Link to="/listening">Listening</Link>
              <Link to="/reading">Reading</Link>
              <Link to="/writing">Writing</Link>
              <Link to="/speaking">Speaking</Link>
              <Link to="/progress">Progress Tracker</Link>
            </Stack>
          </Box>

          {/* 4) Contact + 6) Language + 7) Newsletter */}
          <Box sx={{ flex: 1.2, minWidth: 260 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5 }}>
              Bog‘lanish
            </Typography>
            <Stack spacing={0.6} sx={{ mb: 2 }}>
              <Typography variant="body2">📍 Toshkent, O‘zbekiston</Typography>
              <Typography variant="body2">📞 +998 90 123 45 67</Typography>
              <Typography variant="body2">✉ info@ieltszone.com</Typography>
            </Stack>

            {/* 6) Language */}
            <FormControl size="small" sx={{ minWidth: 150, mb: 2 }}>
              <InputLabel id="lang-label">Language</InputLabel>
              <Select
                labelId="lang-label"
                value={lang}
                label="Language"
                onChange={(e) => setLang(e.target.value as any)}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="uz">O‘zbekcha</MenuItem>
                <MenuItem value="ru">Русский</MenuItem>
              </Select>
            </FormControl>

            {/* 7) Newsletter */}
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                placeholder="Emailingiz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleSubscribe}>
                Jo‘natish
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* 5) Social + 8) Back to top */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Facebook" size="small">
              <Facebook />
            </IconButton>
            <IconButton aria-label="Instagram" size="small">
              <Instagram />
            </IconButton>
            <IconButton aria-label="Telegram" size="small">
              <Telegram />
            </IconButton>
            <IconButton aria-label="LinkedIn" size="small">
              <LinkedIn />
            </IconButton>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<ArrowUpward />}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ borderWidth: 2, textTransform: "none", fontWeight: 800 }}
          >
            Back to Top
          </Button>
        </Stack>

        {/* 9) Legal + 10) Copyright */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 3 }}
          spacing={1}
        >
          <Stack direction="row" spacing={2}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TEST ENGLISH All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
