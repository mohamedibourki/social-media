import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface User {
  id: number;
  email: string;
  name: string;
  username: string;
}

interface AuthState {
  student: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export default function useAuth() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    student: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/check", {
        withCredentials: true,
      });
      console.log("Auth check response:", response.data);

      setAuthState({
        student: response.data.student,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Auth check error:", error);
      setAuthState({
        student: null,
        isAuthenticated: false,
        isLoading: false,
      });
      Cookies.remove("accessToken");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      setAuthState({
        student: response.data.student,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success("Logged in successfully");
      navigate("/home");

      return true;
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("Invalid email or password");
            break;
          case 429:
            toast.error("Too many login attempts. Please try again later.");
            break;
          default:
            toast.error(error.response.data?.message || "Failed to login");
        }
      } else {
        toast.error("Connection error. Please check your internet connection.");
      }
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setAuthState({
      student: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return {
    student: authState.student,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    checkAuth,
  };
}
