// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Tests from "../pages/Tests";
import Subscription from "../pages/Subscription"; 
import SignIn from "../pages/Login"; 
import SignUp from "../pages/SignUp"; 

export const router = createBrowserRouter([
  {
    path: "/",
    
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "tests", element: <Tests /> },
      { path: "subscription", element: <Subscription /> }, 
      { path: "signIn", element: <SignIn /> }, 
      { path: "signUp", element: <SignUp /> }, 
    ],
    
    
  },
]);
