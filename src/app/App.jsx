import { RouterProvider } from "react-router";
<<<<<<< HEAD
import { router } from "../routes";
import { AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "../contexts/ThemeContext";
import { DataProvider } from "../contexts/DataContext"; // ← إضافة

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider> {/* ← لف التطبيق بـ DataProvider */}
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand={false}
          theme="light"
          toastOptions={{
            style: { direction: 'rtl', fontFamily: 'Cairo, sans-serif' },
            duration: 4000,
          }}
        />
      </DataProvider>
    </ThemeProvider>
  );
}
=======
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
>>>>>>> daead558115fb78bcc50c82564787e2487d9a705
