import { Outlet, useLocation, Link } from "react-router";
import { Home, Upload, LayoutDashboard, MessageCircle, User, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isLanding = location.pathname === "/";

  if (isLanding) {
    return (
      <PageTransition>
        <Outlet />
      </PageTransition>
    );
  }

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/upload", icon: Upload, label: "Upload" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-vh-100 d-flex text-dark">
      <aside className="bg-white border-end d-flex flex-column align-items-center py-4 gap-4" style={{ width: "80px" }}>
        <Link to="/dashboard" className="text-decoration-none d-flex align-items-center justify-content-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <span className="text-white fs-5 fw-bold">SC</span>
          </motion.div>
        </Link>

        <nav className="d-flex flex-column gap-3 w-100 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-3 d-flex align-items-center justify-content-center text-decoration-none py-2 position-relative ${
                  isActive ? "bg-primary text-white shadow" : "text-secondary"
                }`}
                style={{ transition: "all 0.2s" }}
              >
                <item.icon size={24} />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="position-absolute start-0 top-0 bottom-0"
                    style={{ width: "3px", backgroundColor: "white" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="btn btn-light rounded-3 border-0 mt-auto"
          style={{ width: "40px", height: "40px" }}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
      </aside>

      <main className="flex-grow-1 overflow-auto bg-light">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}