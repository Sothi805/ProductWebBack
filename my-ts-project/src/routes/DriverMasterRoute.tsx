import { Route, Routes } from "react-router-dom";

import DriverMasterPage from "@/features/driver/pages/ProductMasterPages";
import DriverForm from "@/features/driver/pages/ProductrForm";
import DriverDetailPages from "@/features/driver/pages/ProductDetailPages";
import StudentDetailPages from "@/features/driver/pages/ProductDetailPages";
import DashboardList from "@/features/driver/Dashboard";

export default function DriverMasterRoute() {
  return (
    <Routes>
      <Route index element={<DashboardList />} />
      <Route path="/product">
        <Route index element={<DriverMasterPage />} />
        <Route path=":id" element={<StudentDetailPages />} />
        <Route path="create" element={<DriverForm />} />
        <Route path=":id/edit" element={<DriverForm edit={true} />} />
      </Route>
      {/* more route here */}
    </Routes>
  );
}
