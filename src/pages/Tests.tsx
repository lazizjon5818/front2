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
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
      <Box
        sx={(theme) => ({
          borderRadius: 4,
          p: { xs: 2, sm: 3, md: 4 },
          border: `1px solid ${theme.palette.divider}`,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, rgba(15,17,21,0.95) 0%, rgba(10,13,20,0.7) 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%)",
          boxShadow: theme.palette.mode === "dark" ? 4 : 2,
          animation: "fadeIn 0.8s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        })}
      >
        <Stack spacing={{ xs: 3, sm: 4, md: 6 }}>
          <TestHero onSearch={setSearchQuery} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
              gap: { xs: 2, sm: 3 },
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                position: { xs: "static", md: "sticky" },
                top: { md: 80 },
                alignSelf: "start",
                display: { xs: "block", md: "block" },
              }}
            >
              <TestTabs onChange={(tab) => setActiveModule(tab as any)} />
              <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <TestsQuestionFilter
                  module={activeModule}
                  value={qFilter}
                  onChange={setQFilter}
                />
              </Box>
            </Box>
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