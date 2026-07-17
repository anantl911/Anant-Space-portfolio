import { BackendApiClient } from "@/types/axios";
import axios from "axios";

const bApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api/v1',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


bApi.interceptors.response.use(
    (res) => res.data
);


export const backendApi: BackendApiClient = bApi;