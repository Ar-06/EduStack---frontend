import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosMaterial = axios.create({
  baseURL: `${API_URL}/api/materials`,
  withCredentials: true,
});

export default axiosMaterial;
