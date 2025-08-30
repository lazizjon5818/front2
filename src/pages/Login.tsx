import * as React from "react";
import ForgotPasswordDialog from "../components/auth/ForgotPasswordDialog";
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Stack,
  Container,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// === Colors
const GRADIENT_FROM = "#6a5cff";
const GRADIENT_TO = "#7bd3ff";

// Firebase import
import {
  auth,
  googleProvider,
  githubProvider,
} from "../firebase";

import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const [showPwd, setShowPwd] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [fpOpen, setFpOpen] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    if (!email || !password) {
      toast.error("Email va parolni kiriting");
      return;
    }
    try {
      setLoading(true);
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Muvaffaqiyatli kirdingiz 🎉");
    } catch (err: any) {
      const code = err?.code || "";
      let msg = "Kirishda xatolik";
      if (code === "auth/user-not-found") msg = "Foydalanuvchi topilmadi";
      else if (
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      )
        msg = "Parol yoki email noto‘g‘ri";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithPopup(auth, googleProvider);
      toast.success("Google bilan kirdingiz 🎉");
    } catch (e) {
      toast.error("Google orqali kirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      setLoading(true);
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithPopup(auth, githubProvider);
      toast.success("GitHub bilan kirdingiz 🎉");
    } catch (e) {
      toast.error("GitHub orqali kirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          borderRadius: 4,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Card
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            backdropFilter: "blur(8px)",
            bgcolor: (t) =>
              t.palette.mode === "dark"
                ? "rgba(18,18,18,.6)"
                : "rgba(255,255,255,.7)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, textAlign: "center" }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 0.5, mb: 3 }}
            >
              Sign in to your account
            </Typography>

            <Box component="form" onSubmit={onSubmit}>
              <TextField
                name="email"
                label="Email Address"
                fullWidth
                type="email"
                sx={{ mb: 2 }}
              />

              <TextField
                name="password"
                label="Password"
                fullWidth
                type={showPwd ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd((v) => !v)}
                        edge="end"
                        aria-label="toggle password"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Remember me"
                />
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setFpOpen(true)}
                >
                  Forgot password?
                </Button>
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
                    opacity: 0.95,
                    background: `linear-gradient(90deg, ${GRADIENT_FROM}, ${GRADIENT_TO})`,
                  },
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Box>

            <Divider sx={{ my: 2.5 }}>or continue with</Divider>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <Button
                onClick={signInWithGoogle}
                fullWidth
                variant="outlined"
                sx={{ py: 1, borderRadius: 2, textTransform: "none" }}
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.9h5.5c-.24 1.26-1.66 3.7-5.5 3.7-3.31 0-6-2.74-6-6.1s2.69-6.1 6-6.1c1.89 0 3.16.8 3.88 1.49l2.64-2.56C16.89 3.1 14.63 2 12 2 6.99 2 3 6.03 3 11s3.99 9 9 9c5.19 0 8.6-3.64 8.6-8.78 0-.59-.06-1.04-.14-1.5H12z"
                    />
                  </svg>
                }
              >
                Google
              </Button>
              <Button
                onClick={signInWithGithub}
                fullWidth
                variant="outlined"
                sx={{ py: 1, borderRadius: 2, textTransform: "none" }}
                startIcon={<GitHubIcon />}
              >
                GitHub
              </Button>
            </Stack>

            <Typography variant="body2" sx={{ mt: 2.5, textAlign: "center" }}>
              Don’t have an account?{" "}
              <Button
                size="small"
                component={Link}
                to="/signup"
                variant="text"
                sx={{ textTransform: "none", px: 0.5 }}
              >
                Sign up
              </Button>
            </Typography>
          </CardContent>
        </Card>

        {/* Forgot password modal */}
        <ForgotPasswordDialog open={fpOpen} onClose={() => setFpOpen(false)} />
        <ToastContainer position="top-right" />
      </Box>
    </Container>
  );
}
