import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/RegisterPage";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import StaffLayout from "./Layout/StaffLayout";
import StaffRoutes from "./Routes/StaffRoutes";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Home from "./Pages/Home/Home";
import Verification from "./Pages/Auth/Verification";
import ManagerRoute from "./Routes/ManagerRoute";
import ManagerLayout from "./Layout/ManagerLayout";

function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/account/verification', element: <Verification /> },
    {
      element: <StaffLayout />,
      children: StaffRoutes,
    },
     {
      element: <ManagerLayout />,
      children: ManagerRoute,
    }
  ])
  return <RouterProvider router={router} />;
}

export default App
