import { useContext, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import MyEditor from "./MyEditor";
import axiosInstance from "../api/courseapi";
import { CourseContext } from "../context/courseContext";

const CourseForm = () => {
  const location = useLocation();
  const { course: existingCourse, id: courseId } = location.state || {};
  const { handleCreateCourse, handleUpdateCourse } = useContext(CourseContext);

  const {register, control, handleSubmit, reset,watch,  formState: { errors },} = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      sessions: [{ title: "", videoUrl: "", content: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "sessions",
  });

  const watchedSessions = watch("sessions");

  useEffect(() => {
    if (existingCourse) {
      reset({
        title: existingCourse.title,
        description: existingCourse.description,
        category: existingCourse.category,
        sessions:
          existingCourse.sessions.length > 0
            ? existingCourse.sessions
            : [{ title: "", videoUrl: "", content: "" }],
      });
    }
  }, [location, existingCourse, reset]);

  const handleFormSubmit = async (data) => {
    try {
      if (existingCourse && courseId) {
        await handleUpdateCourse(courseId, data);
      } else {
        await handleCreateCourse(data);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form
      className="space-y-6 p-8 max-w-3xl mx-auto"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h1 className="text-3xl font-semibold text-zinc-800 mb-4">
        {existingCourse ? "Edit Course" : "Create A New Course"}
      </h1>

      <input
        type="text"
        placeholder="Course Title"
        {...register("title", { required: true })}
        className="border border-zinc-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 p-3 w-full rounded-lg shadow-sm"
      />
      {errors.title && (
        <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
      )}

      <input
        type="text"
        placeholder="Course Category"
        {...register("category", { required: true })}
        className="border border-zinc-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 p-3 w-full rounded-lg shadow-sm"
      />
      {errors.category && (
        <p className="text-red-500 text-sm mb-2">{errors.category.message}</p>
      )}
      <textarea
        placeholder="Course Description"
        {...register("description", { required: true })}
        className="border border-zinc-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 p-3 w-full rounded-lg shadow-sm h-32 resize-none"
      />
      {errors.description && (
        <p className="text-red-500 text-sm mb-2">
          {errors.description.message}
        </p>
      )}
      <div>
        <h2 className="font-semibold text-xl text-zinc-700 mb-3">Sessions</h2>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-zinc-200 p-6 rounded-lg shadow-md mb-4 bg-white"
          >
            <input
              type="text"
              placeholder="Session Title"
              {...register(`sessions.${index}.title`, { required: true })}
              className="border border-zinc-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 p-3 w-full rounded-lg mb-4 shadow-sm"
            />
            {errors.sessions?.[index]?.title && (
              <p className="text-red-500 text-sm mb-2">
                {errors.sessions[index].title.message}
              </p>
            )}
            <input
              type="url"
              placeholder="YouTube Video URL"
              {...register(`sessions.${index}.videoUrl`, { required: true })}
              className="border border-zinc-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 p-3 w-full rounded-lg mb-4 shadow-sm"
            />
            {errors.sessions?.[index]?.videoUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sessions[index].videoUrl.message}
              </p>
            )}

            {watchedSessions[index]?.videoUrl &&
              ReactPlayer.canPlay(watchedSessions[index].videoUrl) && (
                <div className="mb-6">
                  <ReactPlayer
                    url={watchedSessions[index].videoUrl}
                    controls
                    width="100%"
                    height="200px"
                  />
                </div>
              )}

             <Controller
              control={control}
              name={`sessions.${index}.content`}
              defaultValue={field.content || ""}
              render={({ field: { value, onChange } }) => (
                <div className="border border-zinc-300 rounded-lg p-4 bg-white">
                  <MyEditor content={value} setContent={onChange} />
                </div>
              )}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ title: "", videoUrl: "", content: "" })}
          className="text-white bg-zinc-700 hover:bg-zinc-800 px-6 py-2 rounded-lg shadow-md mt-4 transition duration-300"
        >
          Add Another Session
        </button>
      </div>

      <button
        type="submit"
        className="bg-zinc-700 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-zinc-800 transition duration-300 w-full"
      >
        {existingCourse ? "Update Course" : "Create Course"}
      </button>
    </form>
  );
};

export default CourseForm;
