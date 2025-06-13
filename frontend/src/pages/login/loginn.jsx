import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../../../assets/images/login.png"; 

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    console.log("Login data:", formData);

    navigate("/");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background image layer with dimmed effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
          filter: "brightness(0.4)", // Dim only the image
          zIndex: 0,
        }}
      ></div>

      {/* Form with higher z-index */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border-t-4 relative z-10"
        style={{ borderColor: "#DD1215" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#DD1215" }}>
          Login to Your Account
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-[#DD1215] text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-black-200 mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="text-[#DD1215] font-medium cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create one!
          </span>
        </p>
      </form>
    </div>
  );
}
