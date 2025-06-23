import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginLogo from '../../../assets/Images/LoginLogo.png';
import ASignup from '../../../assets/Images/Signup/ASignup.png';
import FSignup from '../../../assets/Images/Signup/FSignup.png';
import GSignup from '../../../assets/Images/Signup/Gsignup.png';
import { Link } from 'react-router-dom';

const SignupStep1 = ({ onNext }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="w-[540px] h-[650px] bg-white bg-opacity-95 py-10 px-24 rounded shadow-md">
      <div className="flex flex-col items-center gap-4">
        <img src={LoginLogo} alt="Logo" className="w-[200px] m-4" />

        <div className="flex flex-col items-start justify-evenly w-full mt-[-10px] h-20">
          <h2 className="font-semibold text-[27px]">Sign-up to our universe</h2>
          <p className="text-sm text-gray-600">
            Already have an account? <Link className="text-[#0090FF] font-medium cursor-pointer" to="" > Log-in  </Link>
          </p>
        </div>

        <div className="flex justify-center gap-4">
          {[GSignup, FSignup, ASignup].map((imgSrc, idx) => (
            <div key={idx} className="w-11 h-11 flex justify-center items-center cursor-pointer hover:shadow border-black">
              <img src={imgSrc} alt={`signup-icon-${idx}`} className="w-full h-full object-contain p-1" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center w-full mt-1">
          <hr className="w-[80px] border-gray-300 border-t-[1.5px]" />
          <span className="mx-2 text-gray-400 text-xs font-semibold">OR</span>
          <hr className="w-[80px] border-gray-300 border-t-[1.5px]" />
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-1 mt-2">
          <div>
            <label className="text-[#DD1215] text-[12px] font-semibold">Register an email</label>
            <input
              type="email"
              placeholder="Please type your email here"
              className="w-full border text-[12px] text-gray-500 border-gray-400 px-4 py-2 font-semibold"
              required
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <label className="text-[#DD1215] text-[12px] font-semibold">Create a password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full border text-[12px] text-gray-500 border-gray-400 px-4 py-2 font-semibold pr-10"
              required
            />
            <div
              className="absolute right-3 top-[34px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 accent-[#DD1215]" />
              <span className="text-[#666666] text-[12px] font-semibold">Sign-up to our news letter!</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" required className="w-5 h-5 accent-[#DD1215]" />
              <span className="text-[#666666] text-[12px] font-semibold">
                I agree to the <span className="text-[#0090FF] cursor-pointer">Terms of Use</span>
              </span>
            </label>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-[100px] bg-red-600 text-white py-2 hover:bg-red-700 transition uppercase text-[10px] tracking-widest"
            >
              Continue &gt;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupStep1;
