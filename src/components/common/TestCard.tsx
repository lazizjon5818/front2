// src/components/home/TestCard.tsx
import { Card, CardContent, Typography, Avatar, useTheme } from "@mui/material";
import CustomButton from "../common/CustomButton";

type TestCardProps = {
  title: string;
  desc: string;
  Icon: React.ElementType;
  accent: string;
  onHover ? : (accent: string | null) => void;
};

const TestCard = ({ title, desc, Icon, accent, onHover }: TestCardProps) => {
  const theme = useTheme();

  return (
    <Card
      onMouseEnter={() => onHover?.(accent)}
      onMouseLeave={() => onHover?.(null)}
      sx={{
        flex: 1,
        borderRadius: 3,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          background: `linear-gradient(90deg, ${accent}, ${accent}55)`,
        },
        boxShadow: theme.palette.mode === "dark" ? 4 : 2,
        transition: "transform .28s ease, box-shadow .28s ease",
        transform: "perspective(1200px) translateZ(0) rotateZ(0deg)",
        "&:hover": {
          transform:
            "perspective(1200px) translateZ(14px) translateY(-6px) rotateZ(-0.4deg)",
          boxShadow: theme.palette.mode === "dark" ? 10 : 6,
        },
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #171b22 0%, #13161c 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            mb: 2,
            bgcolor: `${accent}1A`,
            color: theme.palette.mode === "dark" ? "#fff" : accent,
            boxShadow: `0 6px 16px ${accent}33`,
          }}
        >
          <Icon />
        </Avatar>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {desc}
        </Typography>

        <CustomButton fullWidth accent={accent}>
          Start {title}
        </CustomButton>
      </CardContent>
    </Card>
  );
};

export default TestCard;
