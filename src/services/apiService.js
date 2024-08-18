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
    // Handle network errors or JSON parsing errors
    console.error("Request failed:", error);
    throw error; // Re-throw the error after logging it
  }
};

// Fetch products with authentication
export const fetchProducts = async () => {
  const token = localStorage.getItem("authToken"); // Retrieve token from local storage
  if (!token) throw new Error("No authentication token found");
  return request("/api/products", "GET", null, {
    Authorization: `Bearer ${token}`,
  });
};

// Sign-up new user
export const signUpUser = async (email, password) => {
  return request("/auth/signup", "POST", { email, password });
};

// Log in user
export const loginUser = async (email, password) => {
  const data = await request("/auth/login", "POST", { email, password });
  localStorage.setItem("authToken", data.token); // Store token in local storage after login
  return data;
};

// Get user information
export const getUserInfo = async () => {
  const token = localStorage.getItem("authToken"); // Retrieve token from local storage
  if (!token) throw new Error("No authentication token found");
  return request("/api/me", "GET", null, { Authorization: `Bearer ${token}` });
};

// Fetch quotes
export const fetchQuotes = async () => {
  return request("/api/quote", "GET");
};
