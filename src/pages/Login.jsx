import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../context/authContext";

const Login = () => {
  const { loginUser } = useContext(authcontext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {register, handleSubmit,formState: { errors },} = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data.email, data.password);

      if (user.role === "INSTRUCTOR") {
        navigate("/instructor-dashboard");
      } else if (user.role === "STUDENT") {
        navigate("/student-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const googleLoginURL = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;

      const width = 500, height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        googleLoginURL,
        "GoogleLogin",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      const pollTimer = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(pollTimer);
          setLoading(false);
        }
      }, 500);

      window.addEventListener("message", (event) => {
        if (event.origin !== import.meta.env.VITE_BACKEND_URL) return;

        const { user } = event.data;
        if (user) {
          clearInterval(pollTimer);
          popup?.close();

          if (user.role === "INSTRUCTOR") {
            navigate("/instructor-dashboard");
          } else if (user.role === "STUDENT") {
            navigate("/student-dashboard");
          } else {
            navigate("/");
          }
        }
      }, { once: true });

    } catch (err) {
      console.error("Google login failed", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-zinc-800 mb-8">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-zinc-300 p-4 rounded-lg text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-zinc-300 p-4 rounded-lg text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-500 text-white p-4 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>

          <div className="flex items-center justify-center my-4">
            <div className="border-t border-zinc-300 w-1/4"></div>
            <span className="mx-2 text-zinc-400">OR</span>
            <div className="border-t border-zinc-300 w-1/4"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            {loading ? "Logging in..." : "Continue with Google"}
          </button>

          <div className="mt-6 text-zinc-700 text-center">
            <p
              className="hover:underline cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Sign up Here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
