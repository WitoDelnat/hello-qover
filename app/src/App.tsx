import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";
import { CarQuotePage } from "./pages/insurance/Quote";
import { CarPlansPage } from "./pages/insurance/Plan";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/insurance/quote" element={<CarQuotePage />} />
      <Route path="/insurance/plans" element={<CarPlansPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
