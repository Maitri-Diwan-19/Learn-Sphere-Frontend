import { Children, createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {toast} from 'react-toastify'
export const authcontext = createContext();
import axiosInstance from "../api/courseapi";
export const AuthProvider = ({children})=>{
  const [user,setUser]= useState(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        let res = await axiosInstance.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        // Attempt refresh only if the original request failed with 401
        if (err.response?.status === 401) {
          try {
            await axiosInstance.post("/auth/refreshtoken");
            const userRes = await axiosInstance.get("/auth/me");
            setUser(userRes.data.user);
            console.log("User after refresh:", userRes.data.user);
          } catch (refreshErr) {
            setUser(null);
            console.error("Refresh token failed:", refreshErr);
          }
        } else {
          setUser(null);
          console.error("User validation failed:", err);
        }
      }
    };
  
    validateUser();
  }, []);
  
  
    const registerUser = async (email, password, role, name) => {
        try {
          await axios.post('http://localhost:2000/api/auth/register', { email, password, role, name },
            { withCredentials: true }
          );
          toast.success('Registered successfully');
        } catch (err) {
          const message = err.response?.data?.message || "Registration failed. Please try again.";
          toast.error(message);
          throw err;
        }
      };

      const loginUser = async (email, password) => {
        try {
          const res = await axios.post(
            'http://localhost:2000/api/auth/login',
            { email, password },
            { withCredentials: true } 
          );
          const { user } = res.data;

          setUser(user);
          toast.success("Login successful!");
          return user;
        } catch {
          toast.error("Login failed. Please check your credentials.");
        }
      };
      

      const logoutUser = async () => {
        try {
          await axiosInstance.post("/auth/logout"); 
          setUser(null);
          toast.info("Logged out successfully.");
        } catch (err) {
          toast.error("Logout failed. Please try again.");
          console.error("Logout error:", err);
        }
      };
      
      return(
        <authcontext.Provider value={{registerUser,loginUser,logoutUser,user}}>
            {children}
        </authcontext.Provider>
      )
}