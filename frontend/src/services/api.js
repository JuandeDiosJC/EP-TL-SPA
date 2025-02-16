import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Autenticación
export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  return data;
};

// Tareas
export const fetchTasks = async (token) => {
  const { data } = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createTask = async (taskData, token) => {
  const { data } = await axios.post(`${API_URL}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateTask = async (taskId, updateData, token) => {
  const { data } = await axios.put(`${API_URL}/tasks/${taskId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteTask = async (taskId, token) => {
  const { data } = await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Subtareas
export const createSubtask = async (taskId, subtaskData, token) => {
  const { data } = await axios.post(`${API_URL}/tasks/${taskId}/subtasks`, subtaskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateSubtask = async (taskId, subtaskId, updateData, token) => {
  const { data } = await axios.put(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteSubtask = async (taskId, subtaskId, token) => {
  const { data } = await axios.delete(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Comentarios
export const addComment = async (taskId, commentData, token) => {
  const { data } = await axios.post(
    `${API_URL}/tasks/${taskId}/comments`,
    commentData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const updateComment = async (taskId, commentId, updateData, token) => {
  const { data } = await axios.put(
    `${API_URL}/tasks/${taskId}/comments/${commentId}`,
    updateData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const deleteComment = async (taskId, commentId, token) => {
  const { data } = await axios.delete(
    `${API_URL}/tasks/${taskId}/comments/${commentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
