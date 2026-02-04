const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

const buildHeaders = (token, isJson = true) => {
  const headers = {}
  if (isJson) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

const parseResponse = async (response) => {
  const text = await response.text()
  const data = text ? JSON.parse(text) : {}
  if (!response.ok) {
    const message = data?.error || data?.message || 'Request failed'
    throw new Error(message)
  }
  return data
}

const request = async (path, { method = 'GET', token, body } = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: buildHeaders(token, Boolean(body)),
    body: body ? JSON.stringify(body) : undefined,
  })
  return parseResponse(response)
}

export const api = {
  signup: (payload) => request('/auth/signup', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  getProfile: (token) => request('/profile', { token }),
  updateProfile: (token, payload) => request('/profile', { method: 'PUT', token, body: payload }),
  getTasks: (token, query = '') => request(`/tasks${query}`, { token }),
  createTask: (token, payload) => request('/tasks', { method: 'POST', token, body: payload }),
  updateTask: (token, id, payload) => request(`/tasks/${id}`, { method: 'PUT', token, body: payload }),
  deleteTask: (token, id) => request(`/tasks/${id}`, { method: 'DELETE', token }),
}
