// src/layout/MainLayout.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollRestorer from "../components/common/ScrollRestorer";
import { ToastContainer } from "react-toastify";
import AnimatedRoutes from "../components/common/AnimatedRoutes"; // ✅ animatsiyali sahifa almashinuvi

const MainLayout = () => {
  return (
    <>
      {/* Scroll pozitsiyasini saqlovchi komponent */}
      <ScrollRestorer />

      {/* Navigatsiya paneli */}
      <Navbar />

      {/* Sahifalar orasida animatsiya bilan almashinuvi */}
      <main style={{ padding: 16 }}>
        <AnimatedRoutes />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast xabarlar */}
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
};

export default MainLayout;
