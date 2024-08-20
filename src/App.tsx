import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import AddEmpolyeePage from "./pages/AddEmployee";
import EmployeesInfoPage from "./pages/InfoEmployees";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees/add" element={<AddEmpolyeePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/employees/:id" element={<EmployeesInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
