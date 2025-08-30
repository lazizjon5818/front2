// src/components/test/TestTabs.tsx
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
    <Box sx={{ mb: 4 }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Test modullari"
        textColor="primary"
        indicatorColor="primary"
      >
        {tabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TestTabs;
