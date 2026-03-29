import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.router";
import { useAuth } from "../features/auth/hooks/useAuth";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
    // Run once on app boot to restore the logged-in user if a cookie exists.
  }, [handleGetMe]);

  return <RouterProvider router={router} />;
};

export default App;
