// // ProtectedRoute.jsx
// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { authcontext } from "../context/authContext";

// // This component protects routes based on login and role
// const ProtectedRoute = ({ allowedRoles,children }) => {
//   const { user } = useContext(authcontext);


//   if (!user) {
//     // If user not logged in, redirect to login
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // If logged in but not authorized
//     return <Navigate to="/" replace />;
//   }

  

//   return children ? children : <Outlet />;
// };

// export default ProtectedRoute;



// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { authcontext } from "../context/authContext";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const { user, authChecked } = useContext(authcontext);

//   if (!authChecked) return <div>Loading...</div>; // Wait for backend check

//   if (!user) return <Navigate to="/login" replace />;

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children ? children : <Outlet />;
// };

// export default ProtectedRoute;




// src/routes/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authcontext } from "../context/authContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, authChecked } = useContext(authcontext);

  if (!authChecked) return null; 

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to home or show unauthorized message
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
