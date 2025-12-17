import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosCatalog = axios.create({
  baseURL: `${API_URL}/api/catalogs`,
  withCredentials: true,
});

export default axiosCatalog;
