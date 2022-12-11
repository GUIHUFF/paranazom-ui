import axios, {AxiosRequestConfig} from "axios";

const api = axios.create({
  // Localhost
  baseURL: "http://localhost:8080"

});

export default api;