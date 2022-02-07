import React from "react";
import { Route, Routes } from "react-router-dom";
import { CarQuotePage } from "./pages/insurance/Quote";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/insurance/quote" element={<CarQuotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
