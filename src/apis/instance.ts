import axios from "axios";

const instance = axios.create({
  baseURL: "",
  timeout: 1000,
});

export default instance;
