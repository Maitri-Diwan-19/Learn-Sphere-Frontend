import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/courseapi';
import { useNavigate } from 'react-router-dom';

const MyEnrollCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/student/my-enrollcourse')
      .then((res) => {
        setEnrolledCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch enrolled courses';
        setError(`Error: ${errorMessage}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-zinc-700 text-center mt-10">Loading your courses...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      <h2 className="text-3xl font-bold text-zinc-800 mb-6 text-center">My Enrolled Courses</h2>

      {enrolledCourses.length === 0 ? (
        <div className="text-zinc-600 text-center italic">You haven't enrolled in any course yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enroll) => (
            <div
              key={enroll.id}
              onClick={() => navigate(`/student-dashboard/course/${enroll.course.id}`)}
              className="bg-white rounded-2xl shadow-md border border-zinc-200 hover:shadow-lg hover:bg-zinc-50  hover:-translate-y-1 cursor-pointer transition duration-200 p-5"
            >
              <h3 className="text-xl font-semibold text-zinc-800 mb-2">
                {enroll.course?.title || "Untitled Course"}
              </h3>
              <p className="text-zinc-600 mb-3">
                {enroll.course?.description || "No description available."}
              </p>
              <div className="text-sm text-zinc-500">
                <p><span className="font-medium">Category:</span> {enroll.course?.category || "N/A"}</p>
                <p><span className="font-medium">Sessions:</span> {enroll.course?.sessions?.length || 0}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollCourses;
