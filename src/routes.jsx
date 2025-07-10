import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import {
  Cart,
  Checkout,
  Confirmed,
  Favorites,
  ForgotPassword,
  Home,
  Login,
  ProductDetails,
  Products,
  Profile,
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
        path: "/profile/:subpage?",
        element: <Profile />,
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
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/confirmed",
        element: <Confirmed />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/categories/:id/products",
        element: <Products />,
      },
    ],
  },
]);

export default routes;
