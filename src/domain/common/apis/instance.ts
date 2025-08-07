import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not set. Please check your .env file.");
}

const API_TIMEOUT = 5000;

const instance = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
  withCredentials: true,
});

export default instance;
