import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import { getUserInfo } from "./services/apiService";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userInfo = await getUserInfo(token);
          setUser(userInfo.email);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          localStorage.removeItem("token"); // Clear token on failure
          setUser(null);
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header userEmail={user} />
        <main className="flex-grow">
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={setUser} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/"
                element={
                  user ? (
                    <>
                      <HomePage />
                      <Footer />
                    </>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
};

export default App;
