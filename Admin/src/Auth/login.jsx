// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();
  
  // Password regex: 8+ chars, uppercase, lowercase, number, special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Login data:', data);
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Reset success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  const handleForgotPassword = () => {
    alert('Password reset instructions sent to your email');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-700 py-8 px-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <FaShieldAlt className="text-white text-4xl mr-3" />
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            </div>
            <p className="text-indigo-200">Secure access to your dashboard</p>
          </div>
          
          {/* Form */}
          <div className="p-8">
            {showSuccess && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
                Login successful! Redirecting to dashboard...
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                    }`}
                    placeholder="admin@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-gray-700 font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                    }`}
                    placeholder="••••••••"
                    {...register('password', { 
                      required: 'Password is required',
                      pattern: {
                        value: passwordRegex,
                        message: 'Password must have 8+ chars with uppercase, lowercase, number & special char'
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
{/*               
              <div className="mb-6 flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  {...register('remember')}
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div> */}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 py-4 px-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Admin Panel. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>For security reasons, please do not share your credentials.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;