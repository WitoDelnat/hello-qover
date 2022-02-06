import React from "react";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/Index";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<IndexPage />} />
      <Route path="/404" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
