// src/components/common/SectionCard.tsx
import { Box, BoxProps, useTheme } from "@mui/material";

const SectionCard = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        p: { xs: 3, md: 5 },
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === "dark" ? 6 : 2,
        position: "relative",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0f1115 0%, #10131a 100%)"
            : "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
        transition: "transform 280ms ease, box-shadow 280ms ease",
        transform: "perspective(1200px) translateZ(0) scale(1)",
        "&:hover": {
          transform: "perspective(1200px) translateZ(20px) scale(1.0008)",
          boxShadow: theme.palette.mode === "dark" ? 12 : 6,
        },
        ...(props.sx || {}),
      }}
    />
  );
};

export default SectionCard;
