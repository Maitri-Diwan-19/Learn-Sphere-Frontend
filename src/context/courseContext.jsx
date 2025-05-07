import axiosInstance from "../api/courseapi";
import { toast } from "react-toastify";
import { useState, useEffect, createContext } from "react";

export const CourseContext = createContext();

const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/course/getallcourse");
      setCourses(res.data); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new course
  const handleCreateCourse = async (data) => {
    try {
      await axiosInstance.post("/course/createCourse", data); 
      toast.success("Course created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course");
    }
  };

  // Update a course
  const handleUpdateCourse = async (id, data) => {
    try {
      await axiosInstance.put(`/course/${id}`, data); 
      toast.success("Course updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update course");
    }
  };

  // Delete a course
  const handleDeleteCourse = async (id) => {
    try {
      await axiosInstance.delete(`/course/${id}`); // 
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    }
  };
  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      const profileResponse = await axiosInstance.get('/student/profile');
      // Check if there are enrolled courses that need updated progress
      if (profileResponse.data.enrolledCourses && profileResponse.data.enrolledCourses.length > 0) {

     
        const updatedEnrolledCourses = await Promise.all(
          profileResponse.data.enrolledCourses.map(async (course) => {
            try {
              // Fetch the latest progress data for this course
              const progressResponse = await axiosInstance.get(`student/progress/${course.id}`);
              console.log(`Progress for course ${course.id}:`, progressResponse.data);     
              return { ...course, progress: progressResponse.data.progress || 0 };
            } catch (err) {
              console.error(`Failed to fetch progress for course ${course.id}:`, err);
              return course; // Return original course data if progress fetch fails
            }
          })
        );
        // Update the profile with fresh course progress data
        const updatedProfile = {
          ...profileResponse.data,
          enrolledCourses: updatedEnrolledCourses
        };
        setProfile(updatedProfile);
      } else {
        // No enrolled courses show as it is
        setProfile(profileResponse.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };
   useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <CourseContext.Provider
      value={{courses,loading,profile,fetchCourses,fetchProfile,handleCreateCourse,handleUpdateCourse,handleDeleteCourse}}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
