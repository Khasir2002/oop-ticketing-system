import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/signUp";
import CustomerDashboard from "./dashboards/CustomerDashboard";
import VendorDashboard from "./dashboards/VendorDashboard";
import AppTheme from "./theme/AppTheme";

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const user = getUser();

  if (!user || user.role !== role) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Role-Based Protected Routes */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
              <AppTheme>
              <CustomerDashboard />
              </AppTheme>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute role="VENDOR">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
