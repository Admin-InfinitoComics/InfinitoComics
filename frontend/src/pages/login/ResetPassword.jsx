import React, { useState } from 'react';  
import { useParams } from 'react-router-dom';  
import { toast } from 'react-toastify';  

const ResetPassword = () => {  
  const { token } = useParams();  
  const [newPassword, setNewPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [loading, setLoading] = useState(false);  

  const handleReset = async (e) => {  
    e.preventDefault();  
    setLoading(true);  
    try {  
      const response = await fetch(`/users/reset-password/${token}`, {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ newPassword }),  
      });  
      if (!response.ok) {  
        const errorData = await response.json();  
        throw new Error(errorData?.message || 'Link expired or invalid.');  
      }  
      const data = await response.json();  
      toast.success('Password reset successfully!');  
      setTimeout(() => {  
        window.location.href = '/signin';  
      }, 3000);  
    } catch (err) {  
      toast.error(err.message || 'Something went wrong.');  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    // ... your JSX code for form  
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">  
      <div className="w-full max-w-md bg-white p-8 rounded shadow">  
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>  
        <form onSubmit={handleReset} className="space-y-4">  
          {/* New Password */}  
          <div>  
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">  
              New Password  
            </label>  
            <input  
              id="newPassword"  
              type="password"  
                          placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;