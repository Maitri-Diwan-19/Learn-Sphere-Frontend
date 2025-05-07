import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/courseapi';
import { BarChart, Bar,XAxis,YAxis,Tooltip,CartesianGrid, ResponsiveContainer,PieChart,
  Pie,Cell,
Legend
} from 'recharts';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [completionData, setCompletionData] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingCompletion, setLoadingCompletion] = useState(true);
  const [error, setError] = useState(null);

  // colors for pie chart
  const COLORS = ['#6366F1', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];

  // Fetch instructor courses
  useEffect(() => {
    axiosInstance
      .get('course/my-instructor-courses')
      .then((response) => {
        setCourses(response.data);
        setLoadingCourses(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Failed to fetch courses');
        setLoadingCourses(false);
      });
  }, []);

  // Fetch course completion data
  useEffect(() => {
    axiosInstance
      .get('/student/complete-course')
      .then((res) => {
        const processed = res.data.map((c) => ({
          name: c.courseTitle,
          value: parseFloat(((c.studentsCompleted / c.totalEnrolled) * 100).toFixed(1)),
        }));
        setCompletionData(processed);
        setLoadingCompletion(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingCompletion(false);
      });
  }, []);

  const isLoading = loadingCourses || loadingCompletion;

  if (isLoading) return <div className="text-zinc-500">Loading data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const chartData = courses.map((course) => ({
    name: course.title,
    students: course.enrollments?.length || 0,
  }));

  return (
    <div className="p-6 text-zinc-800">
      <h2 className="text-3xl font-bold mb-6 text-zinc-900">My Courses</h2>

      {/* Bar Chart */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-zinc-800">Instructor Analytics</h3>
        <div className="bg-white rounded-lg shadow p-4 border border-zinc-200">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
              <XAxis dataKey="name" stroke="#52525B" />
              <YAxis allowDecimals={false} stroke="#52525B" />
              <Tooltip />
              <Bar dataKey="students" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-zinc-800">Enrollment Distribution</h3>
        <div className="bg-white rounded-lg shadow p-4 border border-zinc-200">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="students"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {courses.map((course) => (
          <div key={course.id} className="border border-zinc-200 p-6 rounded-lg shadow bg-white">
            <h3 className="text-xl font-semibold text-zinc-900">{course.title}</h3>
            <p className="text-zinc-700 mt-2">{course.description}</p>
            <p className="mt-2 text-sm text-zinc-500">
              Enrolled Students: {course.enrollments?.length || 0}
            </p>
            {course.enrollments?.length > 0 && (
              <ul className="mt-3 text-sm list-disc pl-5 text-zinc-600">
                {course.enrollments.map((enroll) => (
                  <li key={enroll.user.id}>
                    {enroll.user.name} - {enroll.user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
