import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import {
  ForgotPassword,
  Home,
  Login,
  Products,
  Register,
  SendCode,
} from "./pages";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/send-code",
        element: <SendCode />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

export default routes;
