// src/pages/Tests.tsx
import { useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import TestHero from "../components/tests/TestHero";
import TestTabs from "../components/tests/TestTabs";
import TestList from "../components/tests/TestList";
import TestFilter from "../components/tests/TestFilter";
const Tests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModule, setActiveModule] =
    useState<"Barchasi" | "Listening" | "Reading" | "Writing" | "Speaking">("Barchasi");

  const [filters, setFilters] = useState<{ level?: string; duration?: string }>({}); // qoladi

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ /* sizdagi style */ }}>
        <Stack spacing={{ xs: 4, md: 6 }}>
          <TestHero onSearch={setSearchQuery} />
          {/* Tabs + Filter bir qatorda */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ minWidth: 260, flex: 1, overflowX: "auto" }}>
              <TestTabs onChange={(tab) => setActiveModule(tab as any)} />
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <TestFilter onFilter={setFilters} />
            </Box>
          </Box>

          <TestList
            module={activeModule}
            searchQuery={searchQuery}
            filters={filters}              // ✅ endi TestList buni qabul qiladi
            onStartTest={(id) => console.log("Start test:", id)}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Tests;
