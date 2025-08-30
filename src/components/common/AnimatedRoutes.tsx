// src/components/common/AnimatedRoutes.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Tests from "../../pages/Tests";
import Subscription from "../../pages/Subscription";
import Login from "../../pages/Login";
import Signup from "../../pages/SignUp";

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.3 },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", element: <Home /> },
          { path: "/about", element: <About /> },
          { path: "/tests", element: <Tests /> },
          { path: "/subscription", element: <Subscription /> },
          { path: "/signin", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ].map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div {...pageTransition}>
                {element}
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
