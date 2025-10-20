import "./App.css";
import HomePage from "./home/HomePage";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ItemListPage from "./items/ItemListPage";
import { Container } from "react-bootstrap";
import NavMenu from "./shared/NavMenu";
import React from "react";
import ItemCreatePage from "./items/ItemCreatePage";
import ItemUpdatePage from "./items/ItemUpdatePage";

const App: React.FC = () => {
  return (
    <Router>
      <NavMenu />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemListPage />} />
          <Route path="/itemcreate" element={<ItemCreatePage />} />
          <Route path="/items/update/:itemId" element={<ItemUpdatePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
