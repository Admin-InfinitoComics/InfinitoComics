import React, { useState } from 'react';
import LoginBackground from '../../../assets/Images/LoginBackground.jpg';
import Bullet from '../../../assets/Images/Bullet.png';
import Riza from '../../../assets/Images/Riza Jose.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-0 flex flex-col">
        {/* Top 70% - Image with Gradient */}
        <div className="h-[70%] w-full relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${LoginBackground})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #310303, #000000)',
              opacity: 0.7,
            }}
          />
        </div>

        {/* Bottom 30% - Secondary Gradient */}
        <div
          className="h-[30%] w-full"
          style={{
            background: 'linear-gradient(to bottom, #111111, #663939)',
          }}
        />
      </div>

      {/* Characters - Bullet (left) and Riza (right) */}
      <img
        src={Bullet}
        alt="Bullet"
        className="absolute  left-56 bottom-8 h-[700px] z-50 object-contain pointer-events-none"
      />
      <img
        src={Riza}
        alt="Riza"
        className="absolute right-48 bottom-8 h-[700px] z-50 object-contain pointer-events-none"
      />

      {/* Foreground Form */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="w-[550px] min-h-[650px] bg-white bg-opacity-90 shadow-lg p-12 relative z-30">
          <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
            {/* You can replace below with your INFINITO logo image if needed */}
            <h1 className="text-3xl font-bold text-red-600">INFINITO</h1>
            <h2 className="text-xl font-semibold">Log-in to our universe</h2>
            <p className="text-sm text-gray-600">
              Don’t have an account?{' '}
              <a href="#" className="text-blue-600 font-medium">Create one!</a>
            </p>

            <input
              type="email"
              placeholder="Please type your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <div className="text-right w-full text-sm text-blue-600 cursor-pointer">
              Forgot password?
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              CONTINUE
            </button>

            {/* Optional Social Icons */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

