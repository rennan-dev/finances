import { createRoot } from "react-dom/client";
import { JSX, StrictMode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import LoginPage from "./screens/login";
import SignupPage from "./screens/signup";
import HomePage from "./screens/home";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("user"); //verifica se há um usuário logado
  return isAuthenticated ? children : <Navigate to="/login" />; 
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        {/* redireciona a raiz (/) para /login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);