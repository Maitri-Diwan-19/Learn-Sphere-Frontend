import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { authcontext } from "../context/authContext";

const InstructorDashboard = () => {
  const location = useLocation();
  const { logoutUser } = useContext(authcontext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === `/dashboard/${path}`
      ? "border-zinc-700 text-zinc-800"
      : "border-transparent text-zinc-500 hover:border-zinc-400 hover:text-zinc-700";

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <nav className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
           
            <div className="flex items-center space-x-10">
              <div className="text-zinc-800 font-bold text-2xl tracking-tight">
                Learn Sphere
              </div>
              <Link
                to="create-course"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("create-course")}`}
              >
                Create Course
              </Link>
              <Link
                to="course-list"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("course-list")}`}
              >
                Course List
              </Link>
              <Link
                to="instructor-course"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("instructor-course")}`}
              >
                Profile
              </Link>
            </div>

            <button
              className="bg-zinc-700 hover:bg-zinc-800 text-white font-medium rounded px-4 py-2 transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-zinc-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorDashboard;
