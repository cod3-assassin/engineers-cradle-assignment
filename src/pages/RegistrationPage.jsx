import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/apiService";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(email, password);
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
          Hello!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Create a new account to get started.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-600 hover:underline transition duration-300"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
