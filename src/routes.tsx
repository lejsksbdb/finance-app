import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import  MonthlyClose from "./pages/MonthlyClose";                      
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/monthly" element={<MonthlyClose />} />
    </Routes>
  );
}
