// src/services/api.js
const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

// Función helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error en la petición' }));
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};

// Función helper para hacer peticiones con autenticación
const fetchWithAuth = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Si el token expiró, redirigir al login
  if (response.status === 401) {
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  return response;
};

// AUTH
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
};

// SEDES
export const sedesAPI = {
  getAll: async () => {
    const response = await fetchWithAuth(`${API_URL}/sedes`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetchWithAuth(`${API_URL}/sedes/${id}`);
    return handleResponse(response);
  },

  create: async (sedeData) => {
    const response = await fetchWithAuth(`${API_URL}/sedes`, {
      method: 'POST',
      body: JSON.stringify(sedeData),
    });
    return handleResponse(response);
  },
};

// TIPO USUARIOS
export const tipoUsuariosAPI = {
  getAll: async () => {
    const response = await fetchWithAuth(`${API_URL}/tipo-usuarios`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetchWithAuth(`${API_URL}/tipo-usuarios/${id}`);
    return handleResponse(response);
  },

  create: async (tipoData) => {
    const response = await fetchWithAuth(`${API_URL}/tipo-usuarios`, {
      method: 'POST',
      body: JSON.stringify(tipoData),
    });
    return handleResponse(response);
  },
};

// SERVICIOS
export const serviciosAPI = {
  getAll: async () => {
    const response = await fetchWithAuth(`${API_URL}/servicios`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetchWithAuth(`${API_URL}/servicios/${id}`);
    return handleResponse(response);
  },

  create: async (servicioData) => {
    const response = await fetchWithAuth(`${API_URL}/servicios`, {
      method: 'POST',
      body: JSON.stringify(servicioData),
    });
    return handleResponse(response);
  },
};

// VALES
export const valesAPI = {
  getAll: async () => {
    const response = await fetchWithAuth(`${API_URL}/vales`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetchWithAuth(`${API_URL}/vales/${id}`);
    return handleResponse(response);
  },

  create: async (valeData) => {
    const response = await fetchWithAuth(`${API_URL}/vales`, {
      method: 'POST',
      body: JSON.stringify(valeData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetchWithAuth(`${API_URL}/vales/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};