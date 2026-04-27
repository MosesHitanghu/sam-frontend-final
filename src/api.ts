import axios from "axios";

export const api = axios.create({
  baseURL: "https://sam-api-psi.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
