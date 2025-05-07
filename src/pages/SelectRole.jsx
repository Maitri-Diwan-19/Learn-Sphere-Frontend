import React from "react";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
   
    console.log("Selected Role:", role);
    navigate(`/${role.toLowerCase()}`); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
        <button
          onClick={() => handleRoleSelect("Student")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 w-full transition"
        >
          Student
        </button>
        <button
          onClick={() => handleRoleSelect("Instructor")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition"
        >
          Instructor
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
