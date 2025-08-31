import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const tabs = ["Barchasi", "Listening", "Reading", "Writing", "Speaking"];

const TestTabs = ({ onChange }: { onChange: (tab: string) => void }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange(tabs[newValue]);
  };

  return (
    <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Test modullari"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          "& .MuiTab-root": {
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
            px: { xs: 1.5, sm: 2 },
            py: 1,
            minHeight: { xs: 36, sm: 40 },
            "&.Mui-selected": {
              background: theme =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #3333ff, #0066cc)"
                  : "linear-gradient(45deg, #e6e9ff, #f5f7ff)",
              color: theme => theme.palette.mode === "dark" ? "#fff" : "#333",
              fontWeight: 700,
            },
          },
          "& .MuiTabs-indicator": {
            height: 3,
            background: theme =>
              theme.palette.mode === "dark"
                ? "linear-gradient(45deg, #3333ff, #0066cc)"
                : "linear-gradient(45deg, #0066cc, #33ccff)",
          },
          animation: "fadeIn 0.8s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {tabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TestTabs;