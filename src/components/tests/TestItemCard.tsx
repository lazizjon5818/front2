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
        width: { xs: 280, sm: 300, md: 320 },
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #171b22 0%, #13161c 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f9faff 100%)",
        boxShadow: theme.palette.mode === "dark" ? 3 : 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px) scale(1.005)",
          boxShadow: theme.palette.mode === "dark" ? 8 : 4,
        },
        animation: "fadeInUp 0.8s ease-out",
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      })}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Avatar sx={{ bgcolor: `${accent}22`, color: accent, width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 } }}>
            <Icon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Avatar>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
            {module}
          </Typography>
        </Stack>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            mb: 1,
            fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: { xs: 40, sm: 48 }, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
        >
          {desc}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap">
          {level && <Chip size="small" label={level} sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }} />}
          {durationMin && <Chip size="small" label={`${durationMin} min`} sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }} />}
        </Stack>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onStart?.(id)}
          sx={{
            fontWeight: 700,
            bgcolor: accent,
            "&:hover": { bgcolor: `${accent}cc`, transform: "scale(1.02)" },
            boxShadow: `0 4px 12px ${accent}44`,
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
            py: { xs: 0.8, sm: 1 },
          }}
        >
          Start
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestItemCard;