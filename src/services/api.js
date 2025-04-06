const BASE_URL = import.meta.env?.VITE_API_BASE_URL;
const API_KEY = import.meta.env?.VITE_API_KEY;

// Helper to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

// Helper to set auth header
const getHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};


export const googleUser = async(google_code) => {
  const response = await fetch(`${BASE_URL}/users/google_login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ code: google_code.code })
  });

  return handleResponse(response);
};

export const deleteUser = async (token) => {
  const response = await fetch(`${BASE_URL}/users/delete`, {
    method: 'DELETE',
    headers: getHeaders(token)
  });

  return handleResponse(response);
};

// Function to verify token and get user identity
export const verifyToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/verify`, {
    headers: getHeaders(token),
  });

  const data = await handleResponse(response);
  return data.user;
};

export const getCategories = async (token) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    headers: getHeaders(token)
  });

  return handleResponse(response);
};

export const getUserSubscriptions = async (token) => {
  const response = await fetch(`${BASE_URL}/feed/subscriptions`, {
    headers: getHeaders(token)
  });

  return handleResponse(response);
};

export const subscribeToCategory = async (token, categoryId) => {
  const response = await fetch(`${BASE_URL}/feed/subscribe`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ category_id: categoryId })
  });

  return handleResponse(response);
};

export const unsubscribeFromCategory = async (token, categoryId) => {
  const response = await fetch(`${BASE_URL}/feed/unsubscribe`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ category_id: categoryId })
  });

  return handleResponse(response);
};


export const getNewsByCategory = async (categoryId, token = null) => {
  const response = await fetch(`${BASE_URL}/news/${categoryId}`, {
    headers: getHeaders(token)
  });

  return handleResponse(response);
};

export const getNotifications = async (token) => {
  const response = await fetch(`${BASE_URL}/notifications`, {
    headers: getHeaders(token)
  });

  return handleResponse(response);
};

export const markNotificationAsRead = async (token, notificationId) => {
  const response = await fetch(`${BASE_URL}/notifications/mark_as_read/${notificationId}`, {
    method: 'POST',
    headers: getHeaders(token)
  });

  return handleResponse(response);
};