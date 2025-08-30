// src/components/home/TestimonialDialog.tsx
import {
    Avatar, Box, Dialog, DialogContent, IconButton, Stack,
    Typography, Button, Rating, // 👈 Rating qo‘shildi
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
  
  export type TestimonialData = {
    name: string;
    role: string;
    feedback: string;
    avatar: string;
    rating?: number; // 👈 ixtiyoriy rating (0–5)
  };
  
  type Props = {
    open: boolean;
    onClose: () => void;
    data: TestimonialData | null;
  };
  
  const TestimonialDialog = ({ open, onClose, data }: Props) => {
    if (!data) return null;
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: (theme) => ({
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(180deg, rgba(17,20,27,.85) 0%, rgba(15,17,23,.92) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,.85) 0%, rgba(250,250,250,.95) 100%)",
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.palette.mode === "dark"
              ? "0 20px 60px rgba(0,0,0,.6)"
              : "0 20px 60px rgba(0,0,0,.1)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              padding: "1px",
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(124,77,255,.35), rgba(0,191,166,.35))",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              pointerEvents: "none",
            },
          }),
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
            },
          },
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2.5, pb: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={data.avatar} alt={data.name} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                {data.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                {data.role}
              </Typography>
  
              {/* ⭐️ Rating (faqat ko‘rsatish, tahrir qilinmaydi) */}
              {typeof data.rating === "number" && (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Rating value={data.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {data.rating.toFixed(1)}
                  </Typography>
                </Stack>
              )}
            </Box>
  
            <IconButton onClick={onClose} sx={{ ml: "auto" }} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
  
        <DialogContent sx={{ pt: 2 }}>
          <FormatQuoteIcon
            sx={(theme) => ({
              position: "absolute",
              top: 12,
              right: 16,
              fontSize: 72,
              opacity: theme.palette.mode === "dark" ? 0.08 : 0.12,
            })}
          />
          <Typography variant="body1" sx={{ lineHeight: 1.9, fontSize: { xs: 16, md: 17 } }}>
            “{data.feedback}”
          </Typography>
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>
              Yopish
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default TestimonialDialog;
  