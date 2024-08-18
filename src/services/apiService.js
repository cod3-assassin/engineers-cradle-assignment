const API_BASE_URL = "https://intern-task-api.bravo68web.workers.dev";

// Generic request handler
const request = async (endpoint, method = "GET", body = null, headers = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

// Fetch products with authentication
export const fetchProducts = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No authentication token found");
  return request("/api/products", "GET", null, {
    Authorization: `Bearer ${token}`,
  });
};

// Sign-up new user
export const signUpUser = async (email, password) => {
  return request("/auth/signup", "POST", { email, password });
};

export const loginUser = async (email, password) => {
  try {
    const data = await request("/auth/login", "POST", { email, password });
    if (!data || !data.token) {
      throw new Error("Token not found in the response");
    }
    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    return {};
  }
};

// Fetch user information with authentication
export const getUserInfo = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No authentication token found");
  return request("/api/me", "GET", null, { Authorization: `Bearer ${token}` });
};
