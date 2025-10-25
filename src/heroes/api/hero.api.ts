import { baseUrl } from "@/global";
import axios from "axios";

export const heroApi = axios.create({
  baseURL: `${baseUrl}/api/heroes`,
});
