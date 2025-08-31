import { Box, Typography, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const TestHero = ({ onSearch }: { onSearch: (q: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: 4 },
        background: theme =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(20,25,35,0.9) 0%, rgba(15,20,30,0.7) 100%)"
            : "linear-gradient(135deg, #e6e9ff 0%, #f5f7ff 100%)",
        borderRadius: 3,
        animation: "fadeIn 0.8s ease-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box sx={{ flex: 1, maxWidth: { xs: "100%", sm: 600 } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            background: theme =>
              theme.palette.mode === "dark"
                ? "linear-gradient(45deg, #ffffff, #a0a0ff)"
                : "linear-gradient(45deg, #3333ff, #0066cc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Testlar Bo‘limi
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          Listening, Reading, Writing va boshqa modullardan testlarni topshiring. 
          O‘z bilim darajangizni aniqlang!
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          px: 2,
          py: 0.8,
          maxWidth: { xs: "100%", sm: 350 },
          width: "100%",
          background: theme => theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
          boxShadow: 2,
        }}
      >
        <InputBase
          placeholder="Test qidirish..."
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        />
        <IconButton type="submit" color="primary">
          <SearchIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TestHero;