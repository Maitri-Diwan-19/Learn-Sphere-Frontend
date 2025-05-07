import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authcontext } from "../context/authContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, authChecked } = useContext(authcontext);

  if (!authChecked) return null; 

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
