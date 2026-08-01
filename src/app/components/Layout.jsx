import { Outlet, useLocation, Link } from "react-router";
import { Home, Upload, LayoutDashboard, MessageCircle, User } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) {
    return <Outlet />;
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
          <div className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
            <span className="text-white fs-5 fw-bold">SC</span>
          </div>
        </Link>

        <nav className="d-flex flex-column gap-3 w-100 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-3 d-flex align-items-center justify-content-center text-decoration-none py-2 ${
                location.pathname.startsWith(item.path)
                  ? "bg-primary text-white shadow"
                  : "text-secondary"
              }`}
              style={{ transition: "all 0.2s" }}
            >
              <item.icon size={24} />
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-grow-1 overflow-auto bg-light">
        <Outlet />
      </main>
    </div>
  );
}
