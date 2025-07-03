import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Toaster } from "sonner";

import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login.tsx";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/auth/Register.tsx";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword.tsx";
import { VerifyEmail } from "./pages/VerifyEmail";
import { DashboardHome } from "./pages/DashboardHome.tsx";
import { Chats } from "./pages/Chats.tsx";
// import { DevChats } from "./pages/DevChats";
import { Layout } from "./layout";
import { DevChats } from "./pages/DevChats.tsx";
import Events from "./pages/Events.tsx";
import ClassSchedule from "./components/ClassSchedule.tsx";
import CampusMap from "./pages/CampusMap.tsx";
import Documents from "./pages/Documents.tsx";
import Clubs from "./components/Clubs.tsx";
import Support from "./pages/Support.tsx";
import FAQ from "./pages/FAQ.tsx";

export const App = () => {
  return (
    <Router>
      <Toaster richColors />
      <Routes>
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/chats"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/chats/dev"
            element={
              <ProtectedRoute>
                <DevChats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class-schedule"
            element={
              <ProtectedRoute>
                <ClassSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <CampusMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQ />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
