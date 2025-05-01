import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import AdminPanel from "./pages/Admin";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
