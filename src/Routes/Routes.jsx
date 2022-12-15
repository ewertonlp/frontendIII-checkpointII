import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthProvider, { AuthContext } from "../providers/AuthContext";
import ThemeProvider from "../providers/ThemeProvider";
import DentistProvider from "../contexts/DentistContext";
import Home from "../pages/home/Home";
import Detail from "../pages/detail/Detail";
import Login from "../pages/login/Login";

const PrivateRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  return userData.token ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <ThemeProvider>
        <AuthProvider>
      <DentistProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/detail/:id"
              element={
                <PrivateRoute>
                  <Detail />
                </PrivateRoute>
              }
            />
          </Routes>
      </DentistProvider>
        </AuthProvider>
    </ThemeProvider>
  );
};

export default AppRoutes;
