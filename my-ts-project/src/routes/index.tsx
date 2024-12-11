import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/features/home/HomePage";
import LoginPage from "@/features/auth/page/LoginPage";
import DriverMasterRoute from "./DriverMasterRoute";
import { useCookies } from "react-cookie";
import Dashboard from "./Dashboard";



const Router = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {!cookies.token && <Route path="*" element={<LoginPage />} />}
          <Route
            path="/"
            element={cookies.token ? <HomePage /> : <LoginPage />}
          >
            {cookies.token && (
              <>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/products/*" element={<DriverMasterRoute />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
};

export default Router;

const NotFoundPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className="font-extrabold text-2xl">
        {" "}
        404 - Oop Page Not Found !
      </span>
    </div>
  );
};
