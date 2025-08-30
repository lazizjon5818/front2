import { Box, Typography, InputBase, IconButton} from "@mui/material";
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
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      {/* Chap taraf matn */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          Testlar Bo‘limi
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 18, color: "text.secondary" }}>
          Listening, Reading, Writing va boshqa modullardan testlarni topshiring. 
          O‘z bilim darajangizni aniqlang!
        </Typography>
      </Box>

      {/* O‘ng taraf qidiruv */}
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
          py: 1,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <InputBase
          placeholder="Test qidirish..."
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ fontSize: 16 }}
        />
        <IconButton type="submit" color="primary">
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TestHero;
