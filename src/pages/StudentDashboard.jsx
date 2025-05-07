import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { authcontext } from '../context/authContext';

const StudentDashboard = () => {
  const { logoutUser } = useContext(authcontext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-zinc-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/" className="text-xl font-bold">Learn Sphere</Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/student-dashboard" className="hover:text-zinc-300">Dashboard</Link>
            <Link to="/student-dashboard/all-course" className="hover:text-zinc-300">All Courses</Link>
            <Link to="/student-dashboard/profile" className="hover:text-zinc-300">Profile</Link>

            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default StudentDashboard;
