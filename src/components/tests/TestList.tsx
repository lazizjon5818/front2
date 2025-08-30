// src/components/test/TestList.tsx
import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import TestItemCard, { TestItem } from "./TestItemCard";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import MicIcon from "@mui/icons-material/Mic";

type Props = {
  module: "Barchasi" | "Listening" | "Reading" | "Writing" | "Speaking";
  searchQuery: string;
  filters?: { level?: string; duration?: string }; // ✅ qo‘shildi
  onStartTest?: (id: string) => void;
};

const allTests: TestItem[] = [
  { id: "ls-1", title: "Listening — Section 1", desc: "Oddiy suhbat asosida gaplarni to‘ldiring.", module: "Listening", Icon: HeadphonesIcon, accent: "#7C4DFF", level: "Beginner",    durationMin: 12 },
  { id: "rd-1", title: "Reading — Skimming",    desc: "Matndan tezkor ma’lumot ajratish bo‘yicha amaliyot.",       module: "Reading",  Icon: MenuBookIcon,  accent: "#00BFA6", level: "Intermediate", durationMin: 15 },
  { id: "wr-1", title: "Writing Task 1 — Charts", desc:"Grafik va jadvalni tasvirlab berish.",                    module: "Writing",  Icon: EditIcon,      accent: "#FF6D00", level: "Intermediate", durationMin: 20 },
  { id: "sp-1", title: "Speaking — Part 2",     desc: "Cue card bo‘yicha 1–2 daqiqa gapirish mashqi.",             module: "Speaking", Icon: MicIcon,       accent: "#2979FF", level: "Advanced",     durationMin: 14 },
];
const normalize = (s: string) => s.toLowerCase().trim();

const TestList = ({ module, searchQuery, filters, onStartTest }: Props) => {
  const q = normalize(searchQuery);

  const filtered = useMemo(() => {
    return allTests.filter((t) => {
      const matchesModule = module === "Barchasi" ? true : t.module === module;
      const matchesQuery = q
        ? [t.title, t.desc, t.module, t.level ?? ""].some((v) =>
            normalize(String(v)).includes(q)
          )
        : true;

      const matchesLevel = filters?.level ? t.level === filters.level : true;

      const matchesDuration = (() => {
        if (!filters?.duration) return true;
        const mins = t.durationMin ?? 0;
        if (filters.duration === "30+") return mins >= 30;
        const n = Number(filters.duration); // "10" | "20"
        return Number.isFinite(n) ? mins === n : true;
      })();

      return matchesModule && matchesQuery && matchesLevel && matchesDuration;
    });
  }, [module, q, filters?.level, filters?.duration]);

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}>
        Testlar ro‘yxati
      </Typography>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: "center", py: 6 }}>
          Hech narsa topilmadi. Qidiruvni yoki filtrlarni o‘zgartirib ko‘ring.
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