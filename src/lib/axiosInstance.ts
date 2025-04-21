// api/axiosInstance.js
import { ENV } from "@/config/env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: ENV.BACKEND_URL,
  withCredentials: true, // if you're using cookies for tokens
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error)
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "JWT has expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // try to refresh token
        await axiosInstance.get("/auth/refresh"); // or use another Axios instance if you want

        // retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Redirect if refresh also fails
        window.location.href = "auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
