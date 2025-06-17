import React from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

const SignupStep1 = ({ onNext }) => {
  return (
    <div className="w-[540px] bg-white bg-opacity-95 px-8 py-10 rounded shadow-md">
      <div className="flex flex-col items-center gap-6">
        <img src="/path/to/SignupLogo.png" alt="Logo" className="w-[160px]" />
        <h2 className="font-semibold text-2xl">Sign-up to our universe</h2>
        <p className="text-sm text-gray-600">
          Already have an account? <a className="text-blue-600 font-medium">Log-in</a>
        </p>

        <div className="flex justify-center gap-4">
          {[FaGoogle, FaFacebookF, FaApple].map((Icon, idx) => (
            <div key={idx} className="w-10 h-10 border rounded flex justify-center items-center cursor-pointer hover:shadow">
              <Icon />
            </div>
          ))}
        </div>

        <form className="w-full flex flex-col gap-4 mt-4">
          <div>
            <label className="text-sm text-red-600 font-semibold">Register an email</label>
            <input type="email" placeholder="Please type your email here" className="w-full border border-gray-300 px-4 py-2 rounded" required />
          </div>

          <div>
            <label className="text-sm text-red-600 font-semibold">Create a password</label>
            <input type="password" placeholder="Enter your password" className="w-full border border-gray-300 px-4 py-2 rounded" required />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <label><input type="checkbox" /> Sign-up to our news letter!</label>
            <label><input type="checkbox" required /> I agree to the <span className="text-blue-600">Terms of Use</span></label>
          </div>

          <button type="button" onClick={onNext} className="w-full bg-red-600 text-white py-2 text-xs tracking-widest uppercase mt-2">Continue &gt;</button>
        </form>
      </div>
    </div>
  );
};

export default SignupStep1;
