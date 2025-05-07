import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import CourseProvider from "./context/courseContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <CourseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CourseProvider>
    </AuthProvider>
  </StrictMode>
);
