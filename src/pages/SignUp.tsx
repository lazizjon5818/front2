import * as React from "react";
import { Link } from "react-router-dom";
import {
  Box, Card, CardContent, Typography, TextField, InputAdornment,
  IconButton, Button, Divider, Stack, FormControlLabel, Checkbox
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Ranglar — o'zingniki bilan almashtir
const GRADIENT_FROM = "#6a5cff";
const GRADIENT_TO   = "#7bd3ff";

// Firebase importlarini o'zingdagi yo'lga mosla:
import { auth, googleProvider, githubProvider } from "../firebase";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
// agar e-mail tasdiqlash ishlatmoqchi bo'lsang:
// import { sendEmailVerification } from "firebase/auth";

export default function SignUp() {
  const [showPwd, setShowPwd] = React.useState(false);
  const [showPwd2, setShowPwd2] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [agree, setAgree] = React.useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    if (!email || !password) return toast.error("Email va parolni kiriting");
    if (password !== confirm) return toast.error("Parollar mos emas");
    if (!agree) return toast.info("Davom etish uchun shartlarni qabul qiling");

    try {
      setLoading(true);
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      // ixtiyoriy: e-mail tasdiqlash yuborish
      // await sendEmailVerification(cred.user);
      toast.success("Ro'yxatdan o'tdingiz! 🎉");
      // navigate("/"); // kerak bo'lsa yo'naltirish
    } catch (err: any) {
      const code = err?.code || "";
      let msg = "Ro'yxatdan o'tishda xatolik";
      if (code === "auth/email-already-in-use") msg = "Bu email allaqachon ro'yxatdan o'tgan";
      else if (code === "auth/invalid-email") msg = "Email noto‘g‘ri formatda";
      else if (code === "auth/weak-password") msg = "Parol juda qisqa yoki zaif (kamida 6 belgi)";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const sso = async (provider: "google" | "github") => {
    try {
      setLoading(true);
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      await signInWithPopup(auth, provider === "google" ? googleProvider : githubProvider);
      toast.success(`${provider === "google" ? "Google" : "GitHub"} bilan ro'yxatdan o'tdingiz 🎉`);
    } catch (e) {
      toast.error("SSO orqali kirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        // background:
        // theme.palette.mode === "dark"
        //   ? "linear-gradient(180deg, #0f1115 0%, #10131a 100%)"
        //   : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        // p: 2,
      }}
    >
      <Card
        elevation={12}
        sx={{
          width: 460,
          borderRadius: 4,
          backdropFilter: "blur(8px)",
          bgcolor: (t) =>
          t.palette.mode === "dark" ? "rgba(18,18,18,.6)" : "rgba(255,255,255,.74)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center" }}>
            Create Account
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: .5, mb: 3 }}
          >
            Join us to continue
          </Typography>

          <Box component="form" onSubmit={onSubmit}>
            <TextField name="name" label="Full name" fullWidth sx={{ mb: 2 }} />
            <TextField name="email" label="Email Address" type="email" fullWidth sx={{ mb: 2 }} />

            <TextField
              name="password"
              label="Password"
              fullWidth
              type={showPwd ? "text" : "password"}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPwd(v => !v)} edge="end" aria-label="toggle password">
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="confirm"
              label="Confirm password"
              fullWidth
              type={showPwd2 ? "text" : "password"}
              sx={{ mb: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPwd2(v => !v)} edge="end" aria-label="toggle confirm">
                      {showPwd2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} size="small" />
                }
                label="Remember me"
              />
              <FormControlLabel
                control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} size="small" />}
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to Terms & Privacy
                  </Typography>
                }
              />
            </Stack>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.2,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                background: `linear-gradient(90deg, ${GRADIENT_FROM}, ${GRADIENT_TO})`,
                color: "#fff",
                "&:hover": {
                  opacity: .95,
                  background: `linear-gradient(90deg, ${GRADIENT_FROM}, ${GRADIENT_TO})`,
                },
              }}
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </Box>

          <Divider sx={{ my: 2.5 }}>or continue with</Divider>

          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => sso("google")}
              fullWidth
              variant="outlined"
              sx={{ py: 1, borderRadius: 2, textTransform: "none" }}
              startIcon={
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.26-1.66 3.7-5.5 3.7-3.31 0-6-2.74-6-6.1s2.69-6.1 6-6.1c1.89 0 3.16.8 3.88 1.49l2.64-2.56C16.89 3.1 14.63 2 12 2 6.99 2 3 6.03 3 11s3.99 9 9 9c5.19 0 8.6-3.64 8.6-8.78 0-.59-.06-1.04-.14-1.5H12z"/>
                </svg>
              }
            >
              Google
            </Button>
            <Button
              onClick={() => sso("github")}
              fullWidth
              variant="outlined"
              sx={{ py: 1, borderRadius: 2, textTransform: "none" }}
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ mt: 2.5, textAlign: "center" }}>
            Already have an account?{" "}
            <Button size="small" component={Link} to='/signin' variant="text" sx={{ textTransform: "none", px: .5 }}>
              Sign up
            </Button>
          </Typography>
        </CardContent>
      </Card>

      {/* Agar ToastContainer allaqachon App da bo'lsa, buni olib tashlashing mumkin */}
      <ToastContainer position="top-right" />
    </Box>
  );
}
