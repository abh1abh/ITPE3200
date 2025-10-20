import "./App.css";
import HomePage from "./home/HomePage";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ItemListPage from "./items/ItemListPage";
import { Container } from "react-bootstrap";
import NavMenu from "./shared/NavMenu";
import React from "react";
import ItemCreatePage from "./items/ItemCreatePage";
import ItemUpdatePage from "./items/ItemUpdatePage";
import { AuthProvider } from "./auth/AuthContext";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ProtectedRoute from "./auth/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavMenu />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemListPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/itemcreate" element={<ItemCreatePage />} />
              <Route path="/items/update/:itemId" element={<ItemUpdatePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
