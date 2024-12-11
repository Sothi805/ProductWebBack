import DashboardList from "@/features/dashboard/DashboardList";
import { Route, Routes } from "react-router-dom";


export default function Dashboard() {
  return (
    <Routes>
      {/* <Route index path='/' element={<DriverMasterPage />} />
      <Route path='/create' element={<DriverForm />} /> */}
      <Route>
        <Route index element={<DashboardList />} />
        {/* <Route path="/create" element={<DriverForm />} />
        <Route path={`:id`} element={<StudentDetailPages />} />
        <Route path={`:id/edit`} element={<DriverForm edit={true} />} /> */}
      </Route>
      {/* more route here */}
    </Routes>
  );
}
