import axios from "axios";

// ⭐ Updated: Simplified axios instance configuration
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// ⭐ Updated: Added better error handling and response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle unauthorized access
//     if (error.response?.status === 401) {
//       window.location.href = "/login";
//     }
    
//     // Handle network errors
//     if (!error.response) {
//       console.error("Network Error:", error);
//       return Promise.reject(new Error("Network error occurred"));
//     }
    
//     // Handle other errors
//     const message = error.response?.data?.message || "An error occurred";
//     console.error("API Error:", message);
//     return Promise.reject(error);
//   }
// );