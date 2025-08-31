import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import TestItemCard, { TestItem } from "./TestItemCard";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import MicIcon from "@mui/icons-material/Mic";
import { QFilterValue } from "./TestsQuestionFilter";

type Props = {
  module: "Barchasi" | "Listening" | "Reading" | "Writing" | "Speaking";
  searchQuery: string;
  qFilter?: QFilterValue;
  onStartTest?: (id: string) => void;
};

type TestItemExtended = TestItem & {
  passage?: "Passage 1" | "Passage 2" | "Passage 3";
  part?: "Part 1" | "Part 2" | "Part 3" | "Part 4";
  qtype?: string;
};

const allTests: TestItemExtended[] = [
  {
    id: "rd-1",
    title: "Reading — Matching Headings",
    desc: "Passage 1 matn bo‘yicha sarlavhalarni moslang.",
    module: "Reading",
    Icon: MenuBookIcon,
    accent: "#00BFA6",
    level: "Intermediate",
    durationMin: 15,
    passage: "Passage 1",
    qtype: "Matching Headings",
  },
  {
    id: "rd-2",
    title: "Reading — Multiple Choice (One Answer)",
    desc: "Passage 2 savollari uchun to‘g‘ri javobni tanlang.",
    module: "Reading",
    Icon: MenuBookIcon,
    accent: "#00BFA6",
    level: "Beginner",
    durationMin: 12,
    passage: "Passage 2",
    qtype: "Multiple Choice (One Answer)",
  },
  {
    id: "rd-3",
    title: "Reading — Gap Filling",
    desc: "Passage 3 bo‘yicha bo‘sh joylarni to‘ldiring.",
    module: "Reading",
    Icon: MenuBookIcon,
    accent: "#00BFA6",
    level: "Advanced",
    durationMin: 18,
    passage: "Passage 3",
    qtype: "Gap Filling",
  },
  {
    id: "ls-1",
    title: "Listening — Map",
    desc: "Part 2 bo‘yicha xaritani to‘ldiring.",
    module: "Listening",
    Icon: HeadphonesIcon,
    accent: "#7C4DFF",
    level: "Intermediate",
    durationMin: 10,
    part: "Part 2",
    qtype: "Map",
  },
  {
    id: "ls-2",
    title: "Listening — Multiple Choice (Many Answers)",
    desc: "Part 3 bo‘yicha bir nechta to‘g‘ri javobni tanlang.",
    module: "Listening",
    Icon: HeadphonesIcon,
    accent: "#7C4DFF",
    level: "Advanced",
    durationMin: 14,
    part: "Part 3",
    qtype: "Multiple Choice (Many Answers)",
  },
  {
    id: "wr-1",
    title: "Writing Task 1 — Charts",
    desc: "Grafik va jadvalni tasvirlab berish.",
    module: "Writing",
    Icon: EditIcon,
    accent: "#FF6D00",
    level: "Intermediate",
    durationMin: 20,
  },
  {
    id: "sp-1",
    title: "Speaking — Cue Card",
    desc: "Part 2 bo‘yicha 1–2 daqiqa gapirish mashqi.",
    module: "Speaking",
    Icon: MicIcon,
    accent: "#2979FF",
    level: "Beginner",
    durationMin: 14,
  },
];

const normalize = (s: string) => s.toLowerCase().trim();

const TestList = ({ module, searchQuery, qFilter, onStartTest }: Props) => {
  const q = normalize(searchQuery);

  const filtered = useMemo(() => {
    return allTests.filter((t) => {
      const matchesModule = module === "Barchasi" ? true : t.module === module;
      const matchesQuery = q
        ? [t.title, t.desc, t.module, t.level ?? "", t.qtype ?? "", t.passage ?? "", t.part ?? ""]
            .some((v) => normalize(String(v)).includes(q))
        : true;
      let matchesRorL = true;
      if (module === "Reading") {
        const passOk =
          (qFilter?.passages?.length ?? 0) === 0 ||
          (qFilter?.passages?.includes(t.passage ?? "") ?? false);
        const typeOk =
          (qFilter?.qtypes?.length ?? 0) === 0 ||
          (qFilter?.qtypes?.includes(t.qtype ?? "") ?? false);
        matchesRorL = passOk && typeOk;
      } else if (module === "Listening") {
        const partOk =
          (qFilter?.parts?.length ?? 0) === 0 ||
          (qFilter?.parts?.includes(t.part ?? "") ?? false);
        const typeOk =
          (qFilter?.qtypes?.length ?? 0) === 0 ||
          (qFilter?.qtypes?.includes(t.qtype ?? "") ?? false);
        matchesRorL = partOk && typeOk;
      }
      return matchesModule && matchesQuery && matchesRorL;
    });
  }, [module, q, qFilter?.passages, qFilter?.parts, qFilter?.qtypes]);

  return (
    <Box sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          mb: 3,
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
          background: theme =>
            theme.palette.mode === "dark"
              ? "linear-gradient(45deg, #ffffff, #a0a0ff)"
              : "linear-gradient(45deg, #3333ff, #0066cc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Testlar ro‘yxati
      </Typography>
      {filtered.length === 0 ? (
        <Typography
          color="text.secondary"
          sx={{
            textAlign: "center",
            py: 6,
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Hech narsa topilmadi. Qidiruvni yoki filtrlarni o‘zgartiring.
        </Typography>
      ) : (
        <Stack
          direction="row"
          spacing={{ xs: 2, sm: 3 }}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
        >
          {filtered.map((t, index) => (
            <Box
              key={t.id}
              sx={{
                animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.1}s`,
                "@keyframes fadeInUp": {
                  "0%": { opacity: 0, transform: "translateY(20px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <TestItemCard {...t} onStart={onStartTest} />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TestList;