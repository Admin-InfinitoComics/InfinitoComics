import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fillDemoCredentials = () => {
    setEmail('admin@infinitoarchery.com');
    setPassword('Admin@8421');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@infinitoarchery.com' && password === 'Admin@8421') {
      navigate('/app'); 
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left side: Image */}
        <div className="md:w-1/2 flex justify-center items-center bg-white p-6">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Admin Login Illustration"
            className="w-full h-full object-cover rounded"
          />
        </div>
        {/* Right side: Sign In form */}
        <div className="md:w-1/2 p-8 bg-white flex flex-col justify-center relative">
          <h2 className="text-3xl font-bold mb-4 text-black">Admin Sign In</h2>
          <p className="text-gray-700 mb-6">Welcome back! Please login to your account.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            {/* Demo Credentials Button */}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-sm text-red-600 hover:underline focus:outline-none mt-2"
            >
              
            </button>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;