import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const TestsSearch = ({ onSearch }: { onSearch: (q: string) => void }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 280, md: 300 },
          borderRadius: 4,
          px: 1.5,
          py: 0.5,
          boxShadow: 2,
          background: theme => theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
          transition: "box-shadow 0.3s ease",
          "&:hover": { boxShadow: 4 },
          animation: "fadeIn 0.8s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.querySelector("input")?.value || "";
          onSearch(input);
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}
          placeholder="Testlarni qidirish..."
          inputProps={{ "aria-label": "qidiruv" }}
        />
        <IconButton type="submit" sx={{ p: 1 }} aria-label="search">
          <SearchIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default TestsSearch;