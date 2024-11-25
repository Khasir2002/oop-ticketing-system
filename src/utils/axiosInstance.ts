import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
