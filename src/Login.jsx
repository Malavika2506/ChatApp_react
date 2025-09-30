import React, { useState } from "react";
import logo from "./assets/Images/logochatapp.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "malavika@gmail.com" && password === "hello123") {
      localStorage.setItem("auth", true);
      localStorage.setItem("email", email);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-cyan-100 via-indigo-400 to-purple-600 flex flex-col md:flex-row">
      {/* Left: Logo + Text */}
      {/* Left: Logo + Text */}
<div className="md:flex-[0.5] flex items-center justify-center p-6">
  <div className="flex flex-col items-center text-center px-4">
    <img
      src={logo}
      alt="Chat App Logo"
      className="w-24 md:w-40 h-auto mb-4"
    />
    <h3 className="text-lg md:text-2xl font-semibold text-gray-800 leading-snug text-center">
      Share your smile with this <br /> world and Find Friends
    </h3>
  </div>
</div>


      {/* Right: Login Form */}
      <div className="md:flex-[0.5] flex items-center justify-center p-6">
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-10 w-full max-w-md border border-white/40 flex flex-col items-center gap-4 transition duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Login Here
          </h3>

          {error && (
            <div className="mb-2 text-center text-red-600 font-medium text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 w-full">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-900 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full bg-white/60 backdrop-blur-sm placeholder-gray-500 transition duration-300 focus:ring-2 focus:ring-indigo-400 hover:ring-2 hover:ring-indigo-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-900 font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full bg-white/60 backdrop-blur-sm placeholder-gray-500 transition duration-300 focus:ring-2 focus:ring-indigo-600 hover:ring-2 hover:ring-indigo-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-4 text-center">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
