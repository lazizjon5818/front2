// src/components/common/CustomButton.tsx
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// ➕ "to?" ni qo'shdik (RouterLink uchun), ixtiyoriy "href?" ham bo'lsin
export interface CustomButtonProps extends ButtonProps {
  accent?: string;
  to?: string;
  href?: string;
}

const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "accent",
})<CustomButtonProps>(({ accent }) => ({
  background: accent || "#fbca1f",
  fontFamily: "inherit",
  padding: "0.6em 1.3em",
  fontWeight: 900,
  fontSize: "18px",
  border: "3px solid black",
  borderRadius: "0.4em",
  boxShadow: "0.1em 0.1em",
  textTransform: "none",
  color: "black",
  transition: "transform 0.1s ease, box-shadow 0.1s ease",
  "&:hover": {
    background: accent || "#fbca1f",
    transform: "translate(-0.05em, -0.05em)",
    boxShadow: "0.15em 0.15em",
  },
  "&:active": {
    transform: "translate(0.05em, 0.05em)",
    boxShadow: "0.05em 0.05em",
  },
}));

export default CustomButton;
