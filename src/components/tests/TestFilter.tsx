import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useState } from "react";

type Props = {
  onFilter: (filters: { level?: string; duration?: string }) => void;
};

const TestFilter = ({ onFilter }: Props) => {
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");

  const handleLevelChange = (e: any) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
    onFilter({ level: newLevel, duration });
  };

  const handleDurationChange = (e: any) => {
    const newDuration = e.target.value;
    setDuration(newDuration);
    onFilter({ level, duration: newDuration });
  };

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mb: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        justifyContent="center"
      >
        <FormControl sx={{ minWidth: { xs: 140, sm: 160 } }}>
          <InputLabel sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Daraja
          </InputLabel>
          <Select
            value={level}
            label="Daraja"
            onChange={handleLevelChange}
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, height: { xs: 40, sm: 48 } }}
          >
            <MenuItem value="">Barchasi</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: { xs: 140, sm: 160 } }}>
          <InputLabel sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Davomiylik
          </InputLabel>
          <Select
            value={duration}
            label="Davomiylik"
            onChange={handleDurationChange}
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, height: { xs: 40, sm: 48 } }}
          >
            <MenuItem value="">Barchasi</MenuItem>
            <MenuItem value="10">10 min</MenuItem>
            <MenuItem value="20">20 min</MenuItem>
            <MenuItem value="30+">30+ min</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default TestFilter;