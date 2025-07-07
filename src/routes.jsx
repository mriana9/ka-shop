import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import {
  Cart,
  ForgotPassword,
  Home,
  Login,
  ProductDetails,
  Products,
  Register,
  SendCode,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default routes;
