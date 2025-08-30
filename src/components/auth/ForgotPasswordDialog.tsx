import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import { toast } from "react-toastify";
import { auth } from "../../firebase"; // yo'lni loyihangga mosla
import { sendPasswordResetEmail } from "firebase/auth";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ForgotPasswordDialog({ open, onClose }: Props) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSend = async () => {
    if (!email) return toast.info("Email kiriting");
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Parolni tiklash havolasi emailingizga yuborildi ✅");
      onClose();
      setEmail("");
    } catch (err: any) {
      const code = err?.code || "";
      let msg = "Xatolik yuz berdi";
      if (code === "auth/user-not-found") msg = "Bunday email topilmadi";
      else if (code === "auth/invalid-email") msg = "Email formati noto‘g‘ri";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Forgot password?</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button onClick={handleSend} variant="contained" disabled={loading}>
          {loading ? "Yuborilmoqda..." : "Reset link yuborish"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
