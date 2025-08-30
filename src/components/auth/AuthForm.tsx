import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
  } from "@mui/material";
  import { useForm } from "react-hook-form";
  import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
  import { useState } from "react";
  import { toast } from "react-toastify";
  import { auth, googleProvider } from "../../firebase";
  import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  
  type AuthFormProps = {
    mode: "login" | "signup";
  };
  
  const AuthForm = ({ mode }: AuthFormProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const [showPassword, setShowPassword] = useState(false);
  
    const onSubmit = async (data: any) => {
      const { email, password } = data;
      try {
        if (mode === "login") {
          await signInWithEmailAndPassword(auth, email, password);
          toast.success("Kirish muvaffaqiyatli!");
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          toast.success("Ro'yxatdan o'tish muvaffaqiyatli!");
        }
      } catch (err: any) {
        if (err.code === "auth/user-not-found") toast.error("Foydalanuvchi topilmadi");
        else if (err.code === "auth/wrong-password") toast.error("Noto‘g‘ri parol");
        else toast.error("Xatolik yuz berdi");
      }
    };
  
    const handleGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        toast.success("Google orqali kirildi!");
      } catch (err) {
        toast.error("Google bilan ulanishda xatolik");
      }
    };
  
    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Email"
            {...register("email", { required: "Email majburiy" })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            fullWidth
          />
          <TextField
            label="Parol"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Parol majburiy" })}
            error={!!errors.password}
            helperText={errors.password?.message as string}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth>
            {mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Google />}
            onClick={handleGoogle}
          >
            Google orqali {mode === "login" ? "kirish" : "ro'yxatdan o‘tish"}
          </Button>
        </Stack>
      </Box>
    );
  };
  
  export default AuthForm;
  