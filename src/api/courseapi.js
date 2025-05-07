import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

  
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const refreshResponse = await axiosInstance.post("/auth/refreshtoken");
 

        // Retry the original request with the new token
        // originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.token}`;

        // Retry the request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);


        return Promise.reject(refreshError);
      }
    }


    return Promise.reject(error);
  }
);

export default axiosInstance;
