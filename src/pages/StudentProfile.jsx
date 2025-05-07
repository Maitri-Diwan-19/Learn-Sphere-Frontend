import React, { useContext, useEffect } from 'react';
import { CourseContext } from '../context/courseContext';
import axiosInstance from '../api/courseapi';

const StudentProfile = () => {
  const [completingCourseId, setCompletingCourseId] = React.useState(null);
  const { fetchProfile, loading, profile } = useContext(CourseContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCompleteCourse = async (courseId) => {
    try {
      setCompletingCourseId(courseId);
      await axiosInstance.post('/student/complete-course', { courseId });
      await fetchProfile();
    } catch (err) {
      console.error('Failed to mark course as completed', err);
    } finally {
      setCompletingCourseId(null);
    }
  };

  if (loading) return <div className="p-6 text-zinc-600">Loading profile...</div>;
  if (!profile) return <div className="p-6 text-zinc-600">No profile data found.</div>;

  const enrolledNotCompletedCourses = profile.enrolledCourses?.filter(course => !course.completed) || [];

  return (
    <div className="p-6 max-w-3xl mx-auto text-zinc-800">
      <h2 className="text-3xl font-semibold mb-6 text-zinc-900">Student Profile</h2>

      {/* Profile Info */}
      <div className="bg-zinc-100 p-5 rounded-xl shadow mb-6">
        <p className="mb-2"><span className="font-semibold">Name:</span> {profile.name}</p>
        <p><span className="font-semibold">Email:</span> {profile.email}</p>
      </div>

      {/* Enrolled Courses */}
      <div className="bg-zinc-100 p-5 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4 text-zinc-800">
          Enrolled Courses ({enrolledNotCompletedCourses.length})
        </h3>
        {enrolledNotCompletedCourses.length > 0 ? (
          <ul className="list-disc pl-6 space-y-4">
            {enrolledNotCompletedCourses.map((course, idx) => (
              <li key={idx}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{course.title}</p>
                   
                  </div>
                  {course.progress === 100 && !course.completed && (
                    <button
                      onClick={() => handleCompleteCourse(course.id)}
                      className="px-4 py-1.5 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
                      disabled={completingCourseId === course.id}
                    >
                      {completingCourseId === course.id ? "Completing..." : "Mark as Completed"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-600">No current enrollments.</p>
        )}
      </div>

      {/* Completed Courses */}
      <div className="bg-zinc-100 p-5 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-zinc-800">
          Completed Courses ({profile.completedCoursesCount || (profile.completedCourses?.length || 0)})
        </h3>
        {profile.completedCourses && profile.completedCourses.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2 text-zinc-700">
            {profile.completedCourses.map((course, idx) => (
              <li key={idx}>
                {typeof course === 'string' ? course : course.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-600">No completed courses.</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
