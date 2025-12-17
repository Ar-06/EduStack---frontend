import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosModerator = axios.create({
  baseURL: `${API_URL}/api/moderator`,
  withCredentials: true,
});

export default axiosModerator;
