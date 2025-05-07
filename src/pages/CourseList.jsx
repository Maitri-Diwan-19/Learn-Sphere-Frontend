import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CourseContext } from '../context/courseContext'; 

const CourseList = () => {
  const { fetchCourses, loading, courses } = useContext(CourseContext);

  useEffect(() => {
    fetchCourses();
  }, []);
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-zinc-900">Your Courses</h2>
        <Link 
          to="/instructor-dashboard/create-course" 
          className="bg-zinc-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-zinc-900 transition-colors"
        >
          Create New Course
        </Link>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white border border-zinc-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-zinc-800">{course.title}</h3>
                <p className="text-sm text-zinc-500 mt-1">{course.category}</p>
              </div>
              <p className="text-sm text-zinc-600 px-4">
                Instructor: {course.instructor?.name || "Unknown"}
              </p>
              <div className="bg-zinc-50 p-4 flex justify-between items-center">
                <Link 
                  to={`/instructor-dashboard/course/${course.id}`} 
                  className="text-zinc-700 font-semibold hover:text-zinc-900 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
