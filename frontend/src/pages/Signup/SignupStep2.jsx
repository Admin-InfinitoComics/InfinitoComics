import React from 'react';
import { Calendar, Shuffle } from 'lucide-react';
import LoginLogo from '../../../assets/Images/LoginLogo.png';
import { signUpUser } from '../../services/userServices';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const SignupStep2 = ({ formData, handleChange, onNext, onBack }) => {
const [error, setError] = useState('');
const dispatch = useDispatch();
const navigate = useNavigate();
const dateInputRef = useRef();

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    setError('');
    const data = await signUpUser(formData);
    // localStorage.setItem('authtoken', data.token.token);
    navigate('/');
    dispatch(addUser(data.data));
  } catch (err) {
    console.log(err)
    console.error('Signup failed:', err);
    if (err.response && err.response.status === 401) {
      setError(err.message);
    } else {
      setError('Something went wrong. Please try again.');
    }
  }
};

  return (
    <div className="w-[540px] h-[650px] bg-white bg-opacity-95 px-24 py-10 rounded shadow-md font-sans">
      <div className="flex flex-col items-center gap-4">
        <img src={LoginLogo} alt="Logo" className="w-[200px] m-4" />
        <div className='flex flex-col items-start justify-between mt-[-20px] h-21'>
          <h2 className="text-2xl font-semibold text-left text-[#1f1f1f]">Welcome to Infinito</h2>
          <p className="text-sm text-left text-gray-600">
            Complete your profile to enjoy this community to the fullest. It only takes <span className="text-red-600 font-semibold">2</span> steps!
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-34 h-1 bg-red-600" />
          <div className="w-6 h-6 flex items-center justify-center border-3 border-red-600 text-red-600 text-sm font-bold">1</div>
          <div className="w-34 h-1 bg-gray-300" />
          <div className="w-6 h-6 flex items-center justify-center border-3 border-gray-300 text-gray-400 text-sm font-semibold">2</div>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-2" onSubmit={handleSignup}>
          {/* Full Name */}
          <div>
            <label className="text-[#DD1215] text-[12px] font-semibold">Your Full Name</label>
            <input
              type="text"
              placeholder="Ashok Kumar"
              className="w-full border text-[12px] text-gray-500 border-gray-400 px-4 py-2 font-semibold pr-10"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Birthday */}

<div>
  <label className="text-[#DD1215] text-[12px] font-semibold">Your Birthday</label>
  <div className="relative mt-1">
    <input
      ref={dateInputRef}
      type="date"
      className="w-full border text-[12px] text-gray-500 border-gray-400 px-4 py-2 font-semibold pr-10"
      value={formData.dob}
      onChange={(e) => handleChange("dob", e.target.value)}
      required
      style={{
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
        background: 'transparent',
      }}
    />
    <Calendar
      className="absolute top-2.5 right-3 text-gray-400 cursor-pointer"
      size={18}
      onClick={() => dateInputRef.current?.showPicker()}
    />
  </div>
</div>



          {/* Username */}
          <div>
            <label className="text-[#DD1215] text-[12px] font-semibold">Create Username*</label>
            <div className="flex mt-1">
              <input
                type="text"
                placeholder="Pirana_Fish"
                className="w-full border text-[12px] text-gray-500 border-gray-400 px-4 py-2 font-semibold pr-10"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value.replace(/\s/g, ""))}
              />
              <div className="w-[50%] flex items-center gap-2 bg-[#DD1215] text-white px-3 py-2 cursor-pointer text-xs pl-6"
              onClick={() => {
  const firstName = formData.name.trim().split(" ")[0];
  const randomString = Math.random().toString(36).substring(2, 8);
  handleChange("username", `${firstName}_${randomString}`);
}}

>
                RANDOM
                <Shuffle size={14} />
              </div>
            </div>
            <p className="text-[#666666] text-[11px] font-semibold mt-1">
              *Don’t worry, you can change this again in Account Setting!
            </p>

            <ul className="text-[12px] text-gray-600 list-none mt-2 space-y-1">
              <li className="flex items-center mt-4 text-[#999999]">
                <svg className="w-4 h-4 text-[#999999] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Username must be between 6 to 30 characters.
              </li>
              <li className="flex items-center mt-1 mb-3 text-[#999999]">
                <svg className="w-4 h-4 text-[#999999] mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Username must only use letters, underscore and periods.
              </li>
            </ul>
          </div>

          {/* Buttons */}
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

export default SignupStep2;
