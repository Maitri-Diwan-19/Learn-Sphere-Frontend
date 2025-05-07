import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CourseContext } from "../context/courseContext";
import axiosInstance from "../api/courseapi";
import ReactPlayer from "react-player";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleDeleteCourse, handleUpdateCourse } = useContext(CourseContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/course/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await handleDeleteCourse(id);
      navigate("/instructor-dashboard/course-list");
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const handleUpdate = () => {
    if (!course) return;

    navigate("/instructor-dashboard/create-course", { state: { id, course } });
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!course) return <div className="p-6 text-center">Course not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
      <p className="text-gray-700 mb-2">{course.category}</p>
      <p className="mb-4">{course.description}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">Sessions</h3>
      <div className="space-y-4">
        {course.sessions?.length > 0 ? (
          course.sessions.map((session) => (
            <div key={session.id} className="border p-4 rounded">
              <h4 className="text-lg font-bold">{session.title}</h4>
              <ReactPlayer
                url={session.videoUrl}
                controls
                width="100%"
                height="200px"
                className="mt-2"
              />
              <div className="mt-1">
                {parse(DOMPurify.sanitize(session.content))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No sessions available.</p>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
