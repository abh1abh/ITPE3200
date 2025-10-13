import "./App.css";
import HomePage from "./home/HomePage";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import ItemListPage from "./items/ItemListPage";
import { Container } from "react-bootstrap";
import NavMenu from "./shared/NavMenu";

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
