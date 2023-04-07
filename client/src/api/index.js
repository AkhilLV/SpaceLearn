import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// CRUD for CARDS
export const getCards = () => API.get("/cards");
export const getCard = (cardId) => API.get(`/cards/${cardId}`);
export const deleteCard = (cardId) => API.delete(`/cards/${cardId}`);
export const postCard = (data) => API.post("/cards", data);

export const editCard = (cardId, data) => API.patch(`/cards/${cardId}`, data);

// GET CARDS by DATE
export const getCardTasksByDate = (cardId, date) =>
  API.get(`/cards/${cardId}/tasks/?date=${date}`);

export const getAllTasksByDate = (date) => API.get(`/cards?date=${date}`);
export const getTasksBetweenDates = (startDate, endDate) =>
  API.get(`/cards?startDate=${startDate}&endDate=${endDate}`);

// CRUD for TASKS
export const addTask = (cardId, data) =>
  API.post(`/cards/${cardId}/tasks`, data);
export const crossTask = (cardId, taskId, taskDateId, taskDone) =>
  API.put(
    `/cards/${cardId}/tasks/${taskId}/${taskDateId}?taskDone=${taskDone}`
  );
export const deleteTask = (cardId, taskId) =>
  API.delete(`/cards/${cardId}/tasks/${taskId}`);
export const editTask = (cardId, taskId, data) =>
  API.patch(`/cards/${cardId}/tasks/${taskId}`, data);

// CRUD for AUTh

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const reset = (data) => API.post("/auth/reset", data);
export const logout = () => API.post("/auth/logout");
