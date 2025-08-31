// src/pages/Tests.tsx
import { useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import TestHero from "../components/tests/TestHero";
import TestTabs from "../components/tests/TestTabs";
import TestList from "../components/tests/TestList";
import TestsQuestionFilter, { QFilterValue } from "../components/tests/TestsQuestionFilter";

const Tests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModule, setActiveModule] =
    useState<"Barchasi" | "Listening" | "Reading" | "Writing" | "Speaking">("Barchasi");

  const [qFilter, setQFilter] = useState<QFilterValue>({
    passages: [],
    parts: [],
    qtypes: [],
  });

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
          <TestHero onSearch={setSearchQuery} />

          {/* Grid layout: Chapda filter, o‘ngda testlar */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
              gap: 3,
              alignItems: "start",
            }}
          >
            {/* Chap panel: Filter */}
            <Box
              sx={{
                position: "sticky",
                top: 80, // header ostida turishi uchun
                alignSelf: "start",
              }}
            >
              <TestTabs onChange={(tab) => setActiveModule(tab as any)} />
              <Box sx={{ mt: 3 }}>
                <TestsQuestionFilter
                  module={activeModule}
                  value={qFilter}
                  onChange={setQFilter}
                />
              </Box>
            </Box>

            {/* O‘ng panel: Testlar ro‘yxati */}
            <TestList
              module={activeModule}
              searchQuery={searchQuery}
              qFilter={qFilter}
              onStartTest={(id) => console.log("Start test:", id)}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Tests;
