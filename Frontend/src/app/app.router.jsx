import { createBrowserRouter } from "react-router";
import Home from "../features/website/pages/Home";
import About from "../features/website/pages/About";
import Contact from "../features/website/pages/Contact";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/website/component/Protected";
import Dashboard from "../features/chat/pages/Dashboard";
import Chatbot from "../features/chat/pages/Chatbot";
import DoctorDashboard from "../features/doctor/DoctorDashboard";
import SuperAdminDashboard from "../features/superAdmin/SuperAdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
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
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/chatbot",
    element: (
      <Protected>
        <Chatbot />
      </Protected>
    ),
  },
  {
    path: "/doctor",
    element: (
      <Protected>
        <DoctorDashboard />
      </Protected>
    ),
  },
  {
    path: "/super-admin",
    element: (
      <Protected>
        <SuperAdminDashboard />
      </Protected>
    ),
  },
]);
