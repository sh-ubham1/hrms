import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-10nh.onrender.com/api"
});

export default api;