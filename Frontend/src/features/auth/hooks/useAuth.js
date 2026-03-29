import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register, getMe, logout } from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";

const getApiErrorMessage = (error, fallbackMessage) => {
  const validationErrors = error.response?.data?.errors;

  if (Array.isArray(validationErrors) && validationErrors.length > 0) {
    return validationErrors[0].msg || fallbackMessage;
  }

  return error.response?.data?.message || fallbackMessage;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleRegister = useCallback(async ({ username, phone, email, password }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      await register({ username, phone, email, password });
      return true;
    } catch (error) {
      dispatch(setError(getApiErrorMessage(error, "Registration failed")));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      return true;
    } catch (error) {
      dispatch(setError(getApiErrorMessage(error, "Login failed")));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleGetMe = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      await logout();
    } catch (error) {
      dispatch(setError(getApiErrorMessage(error, "Logout failed")));
    } finally {
      dispatch(setUser(null));
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return { ...auth, handleLogin, handleRegister, handleGetMe, handleLogout };
};
