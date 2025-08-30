// src/pages/Tests.tsx
import { useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import TestHero from "../components/tests/TestHero";
import TestTabs from "../components/tests/TestTabs";
import TestList from "../components/tests/TestList";

const Tests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModule, setActiveModule] = useState<
    "Barchasi" | "Listening" | "Reading" | "Writing" | "Speaking"
  >("Barchasi");

  const handleSearch = (q: string) => setSearchQuery(q);
  const handleModuleChange = (tab: string) => setActiveModule(tab as any);
  const handleStart = (id: string) => {
    // TODO: navigate(`/tests/${id}`) yoki modal ochish
    console.log("Start test:", id);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={(theme) => ({
          borderRadius: 4,
          p: { xs: 2, md: 4 },
          border: `1px solid ${theme.palette.divider}`,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #0f1115 0%, #10131a 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        })}
      >
        <Stack spacing={{ xs: 4, md: 6 }}>
          <TestHero onSearch={handleSearch} />
          <TestTabs onChange={handleModuleChange} />
          <TestList
            module={activeModule}
            searchQuery={searchQuery}
            onStartTest={handleStart}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Tests;
