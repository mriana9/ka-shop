import { Outlet, useLocation } from "react-router-dom";
import { Footer, Navbar } from "../components";

export default function MainLayout() {
  const location = useLocation();
  const hiddenRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/send-code",
  ];
  const hiddenLayout = hiddenRoutes.includes(location.pathname);
  return (
    <>
      {!hiddenLayout && <Navbar />}
      <Outlet />
      {!hiddenLayout && <Footer />}
    </>
  );
}
