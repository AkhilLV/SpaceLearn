import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const getCards = () => API.get("/cards");
export const getCard = (cardId) => API.get(`/cards/${cardId}`);

export const postCard = (data) => API.post("/cards", data);

export const addTask = (cardId, data) => API.post(`/cards/${cardId}/tasks`, data);
export const crossTask = (cardId, taskId, cardDateId, data) => API.patch(`/cards/${cardId}/tasks/${taskId}/${cardDateId}`, data);

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
