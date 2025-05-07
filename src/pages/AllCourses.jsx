import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/courseapi';
import { toast } from 'react-toastify';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const predefinedCategories = [ "Web Development","Data Science", "Machine Learning","Artificial Intelligence",
     "Programming","Design","Marketing","Finance","Other"];

  useEffect(() => {
    axiosInstance
      .get('/student/getcourse')
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch courses');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await axiosInstance.post(`/student/enroll/${courseId}`);
      toast.success('Enrolled successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed');
    }
  };

  // Merge and duplicate categories
  const uniqueBackendCategories = [...new Set(courses.map(course => course.category).filter(Boolean))];
  const allCategories = ['All', ...new Set([...predefinedCategories, ...uniqueBackendCategories])];

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter(course => course.category === selectedCategory);

  if (loading) return <div className="text-zinc-700 text-center mt-10">Loading courses...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="p-6 bg-zinc-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-zinc-800 mb-6 text-center">All Courses</h2>

    
      <div className="mb-6 flex justify-center">
        <label htmlFor="category" className="mr-3 font-medium text-zinc-700">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-zinc-300 rounded-lg px-4 py-2 text-zinc-800"
        >
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category || 'Unknown'}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white border border-zinc-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="p-6">
              <h3 className="font-semibold text-xl text-zinc-800 mb-3">{course.title}</h3>
              <p className="text-sm text-zinc-600 mb-2">
                <strong>Category:</strong> <span className="font-medium">{course.category || 'N/A'}</span>
              </p>
              <p className="text-zinc-700 mb-4">{course.description?.slice(0, 120)}...</p>
              <button
                onClick={() => handleEnroll(course.id)}
                className="mt-4 px-5 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition duration-200"
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
