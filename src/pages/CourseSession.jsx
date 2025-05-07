import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../context/courseContext";
import axiosInstance from "../api/courseapi";
import ReactPlayer from "react-player";
import { useForm } from "react-hook-form";
import { FaStar, FaRegStar } from "react-icons/fa";

const CourseSessions = () => {
  const { courseId } = useParams();
  const { fetchProfile } = useContext(CourseContext);
  const [sessions, setSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [completingCourseId, setCompletingCourseId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const getSessions = async () => {
    try {
      setLoading(true);
      const sessionsResponse = await axiosInstance.get(`student/course/${courseId}/sessions`);
      setSessions(sessionsResponse.data);

      const progressResponse = await axiosInstance.get(`student/progress/${courseId}`);
      setCompletedSessions(progressResponse.data.completedSessionIds || []);
      setProgress(progressResponse.data.progress || 0);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching sessions or progress", error);
      setLoading(false);
    }
  };

  const getReviews = async () => {
    try {
      const res = await axiosInstance.get(`/course/${courseId}/getreviews`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    getSessions();
    getReviews();
  }, [courseId, reviewSubmitted]);

  const markSessionComplete = async (sessionId) => {
    try {
      await axiosInstance.patch(`student/session/${sessionId}/complete`);
      setCompletedSessions(prev => (prev.includes(sessionId) ? prev : [...prev, sessionId]));
      const updatedProgress = await axiosInstance.get(`student/progress/${courseId}`);
      setProgress(updatedProgress.data.progress || 0);
      await fetchProfile();
      await getSessions();
    } catch (error) {
      console.error("Failed to mark session as complete:", error);
      alert("Something went wrong.");
    }
  };

  const handleCompleteCourse = async () => {
    try {
      setCompletingCourseId(courseId);
      await axiosInstance.post('/student/complete-course', { courseId });
      const updatedProgress = await axiosInstance.get(`student/progress/${courseId}`);
      await fetchProfile();
      navigate('/student-dashboard/profile');
    } catch (err) {
      console.error("Failed to mark course as completed", err);
    } finally {
      setCompletingCourseId(null);
    }
  };

  const onSubmitReview = async (data) => {
    // e.preventDefault();
    try {
      await axiosInstance.post(`/course/${courseId}/reviews`, {
        rating,
        comment: data.comment,
      });
      setRating(0);
      reset();
      setReviewSubmitted(prev => !prev);
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit review.");
    }
  };

  const renderStars = (selectedRating, setFunc) => {
    return (
      <div className="text-2xl space-x-1 cursor-pointer flex">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setFunc(num)}
            className="hover:scale-110 transition-transform"
          >
            {selectedRating >= num ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-400" />
            )}
          </span>
        ))}
      </div>
    );
  };

  if (loading) return <div className="p-5">Loading sessions...</div>;
  if (!sessions.length) return <div className="p-5">No sessions available for this course.</div>;

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Course Sessions</h2>
  
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Sessions for Course ID: {courseId}
        </h3>
  
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">Progress: {progress}% complete</p>
        </div>
  
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div key={session.id} className="bg-gray-100 p-3 rounded shadow">
              <h4 className="font-medium text-xl">{session.title}</h4>
              <p>{session.description}</p>
  
              <ReactPlayer
                url={session.videoUrl}
                controls
                width="100%"
                height="auto"
                playing={index === currentSessionIndex}
              />
  
              <div className="mt-2 flex justify-between items-center">
                <button
                  className={`px-3 py-1 text-sm ${
                    completedSessions.includes(session.id) ? 'bg-gray-500' : 'bg-blue-600'
                  } text-white rounded hover:bg-blue-700`}
                  onClick={() => markSessionComplete(session.id)}
                  disabled={completedSessions.includes(session.id)}
                >
                  {completedSessions.includes(session.id) ? "Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>
          ))}
        </div>
  
        <button
          onClick={handleCompleteCourse}
          disabled={completingCourseId === courseId}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {completingCourseId === courseId ? "Completing Course..." : "Complete Course"}
        </button>
      </div>
  
      {progress === 100 && (
        <>
          {/* Review Form */}
          <div className="bg-white p-4 mt-8 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
            <form onSubmit={handleSubmit(onSubmitReview)}>
              <label className="block mb-2">Your Rating:</label>
              {renderStars(rating, setRating)}
  
              <label className="block mt-4 mb-2">Your Review:</label>
              <textarea
                {...register("comment", { required: true })}
                rows="4"
                className="w-full border p-2 rounded"
                placeholder="Write your Review..."
              ></textarea>
  
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit Review
              </button>
            </form>
          </div>
  
          {/* Display Reviews */}
          <div className="bg-white p-4 mt-8 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Course Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="border-b py-3">
                  <p className="font-medium text-gray-700">{rev.student.name}</p>
                  <div className="text-green-500 flex items-center text-xl">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">
                      ({rev.rating}/5)
                    </span>
                  </div>
                  <p className="text-gray-800">{rev.comment}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(rev.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
  
};

export default CourseSessions;
