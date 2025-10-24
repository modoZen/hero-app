import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const heroApi = axios.create({
  baseURL: `${baseUrl}/api/heroes`,
});
