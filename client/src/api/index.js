import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const getCards = () => API.get("/cards");
export const postCard = (data) => API.post("./cards", data);

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
