// src/components/tests/TestsSearch.tsx
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const TestsSearch = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: 2,
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 300 },
          borderRadius: 4,
          px: 2,
          py: 0.5,
          boxShadow: 2,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          // 🔍 qidiruvni ishlatish: setSearchTerm(value)
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Testlarni qidirish..."
          inputProps={{ "aria-label": "qidiruv" }}
        />
        <IconButton type="submit" sx={{ p: 1 }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default TestsSearch;
