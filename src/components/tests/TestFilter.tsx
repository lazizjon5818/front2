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
    <Box sx={{ py: 2, mb: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
      >
        {/* Level Filter */}
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Daraja</InputLabel>
          <Select value={level} label="Daraja" onChange={handleLevelChange}>
            <MenuItem value="">Barchasi</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>

        {/* Duration Filter */}
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Davomiylik</InputLabel>
          <Select value={duration} label="Davomiylik" onChange={handleDurationChange}>
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
