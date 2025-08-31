// src/components/tests/TestList.tsx
import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import TestItemCard, { TestItem } from "./TestItemCard"; // siz avval yaratgan kartangiz
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
  // Reading uchun:
  passage?: "Passage 1" | "Passage 2" | "Passage 3";
  // Listening uchun:
  part?: "Part 1" | "Part 2" | "Part 3" | "Part 4";
  // Umumiy:
  qtype?: string;
};

const allTests: TestItemExtended[] = [
  // Reading namunalar
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

  // Listening namunalar
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

  // Boshqa modullar (ko‘rsatish uchun)
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
      // Modul bo‘yicha
      const matchesModule = module === "Barchasi" ? true : t.module === module;

      // Matn bo‘yicha qidiruv
      const matchesQuery = q
        ? [t.title, t.desc, t.module, t.level ?? "", t.qtype ?? "", t.passage ?? "", t.part ?? ""]
            .some((v) => normalize(String(v)).includes(q))
        : true;

      // Reading / Listening uchun maxsus
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
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}>
        Testlar ro‘yxati
      </Typography>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: "center", py: 6 }}>
          Hech narsa topilmadi. Qidiruvni yoki filtrlarni o‘zgartiring.
        </Typography>
      ) : (
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" justifyContent="center">
          {filtered.map((t) => (
            <TestItemCard key={t.id} {...t} onStart={onStartTest} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TestList;
