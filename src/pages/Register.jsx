import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../context/authContext";

const Register = () => {
  const { registerUser } = useContext(authcontext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
    
      await registerUser(data.email, data.password, data.role, data.name);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-zinc-300 rounded-2xl p-8 bg-white shadow-xl">
        <h1 className="text-2xl font-bold text-center text-zinc-800 mb-6">
          Register
        </h1>

        {Object.keys(errors).length > 0 && (
          <p className="text-red-500 mb-4 text-center">
            Please fill out all required fields correctly.
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="text-zinc-800 text-sm font-medium mb-2 block"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="text-zinc-800 bg-white border border-zinc-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-zinc-800 text-sm font-medium mb-2 block"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="text-zinc-800 bg-white border border-zinc-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-zinc-800 text-sm font-medium mb-2 block"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="text-zinc-800 bg-white border border-zinc-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="text-zinc-800 text-sm font-medium mb-2 block"
            >
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="text-zinc-800 bg-white border border-zinc-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create an Account
            </button>
          </div>
        </form>

        <div className="text-zinc-800 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-zinc-600 font-medium hover:underline ml-1 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
