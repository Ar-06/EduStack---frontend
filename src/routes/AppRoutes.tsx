import { AuthProvider } from "@/context/auth/authProvider";
import { ThemeProvider } from "@/context/theme/theme-provider";
import { AdminPage } from "@/pages/admin/page";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { MaterialsPage } from "@/pages/materials/page";
import { ModeratorPage } from "@/pages/moderator/page";
import { ProfilePage } from "@/pages/profile/page";
import { ReadMaterialPage } from "@/pages/readMaterial/page";
import { UploadPage } from "@/pages/upload/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route
                path="/materials/material/:id"
                element={<ReadMaterialPage />}
              />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/moderator" element={<ModeratorPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
