import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const getCards = () => API.get("/cards");
export const getCard = (cardId) => API.get(`/cards/${cardId}`);
export const deleteCard = (cardId) => API.delete(`/cards/${cardId}`);
export const postCard = (data) => API.post("/cards", data);

export const editCard = (cardId, data) => API.patch(`/cards/${cardId}`, data);

export const addTask = (cardId, data) =>
  API.post(`/cards/${cardId}/tasks`, data);
export const crossTask = (cardId, taskId, cardDateId, data) =>
  API.patch(`/cards/${cardId}/tasks/${taskId}/${cardDateId}`, data);
export const deleteTask = (cardId, taskId) =>
  API.delete(`/cards/${cardId}/tasks/${taskId}`);
export const editTask = (cardId, taskId, data) =>
  API.put(`/cards/${cardId}/tasks/${taskId}`, data);

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const reset = (data) => API.post("/auth/reset", data);
export const logout = () => API.post("/auth/logout");
