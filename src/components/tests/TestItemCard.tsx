// src/components/test/TestItemCard.tsx
import { Card, CardContent, Typography, Stack, Avatar, Button, Chip } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export type TestItem = {
  id: string;
  title: string;
  desc: string;
  module: "Listening" | "Reading" | "Writing" | "Speaking";
  Icon: SvgIconComponent;
  accent: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  durationMin?: number;
};

type Props = TestItem & {
  onStart?: (id: string) => void;
};

const TestItemCard = ({ id, title, desc, module, Icon, accent, level, durationMin, onStart }: Props) => {
  return (
    <Card
      sx={(theme) => ({
        width: 320,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #171b22 0%, #13161c 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        boxShadow: theme.palette.mode === "dark" ? 4 : 2,
        transition: "transform .25s ease, box-shadow .25s ease",
        "&:hover": { transform: "translateY(-6px) scale(1.01)", boxShadow: theme.palette.mode === "dark" ? 10 : 6 },
      })}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Avatar sx={{ bgcolor: `${accent}22`, color: accent }}>
            <Icon />
          </Avatar>
          <Typography variant="subtitle2" color="text.secondary">{module}</Typography>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48 }}>
          {desc}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap">
          {level && <Chip size="small" label={level} />}
          {durationMin ? <Chip size="small" label={`${durationMin} min`} /> : null}
        </Stack>

        <Button
          fullWidth
          variant="contained"
          onClick={() => onStart?.(id)}
          sx={{
            fontWeight: 700,
            bgcolor: accent,
            "&:hover": { bgcolor: accent },
            boxShadow: `0 6px 16px ${accent}44`,
          }}
        >
          Start
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestItemCard;
