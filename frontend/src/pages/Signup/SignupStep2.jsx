import React from 'react';
import { Calendar, Shuffle } from 'lucide-react';

const SignupStep2 = ({ onNext, onBack }) => {
  return (
    <div className="w-[540px] bg-white bg-opacity-95 px-8 py-10 rounded shadow-md">
      <div className="flex flex-col items-center gap-6">
        <img src="/path/to/SignupLogo.png" alt="Logo" className="w-[160px]" />
        <h2 className="font-semibold text-2xl text-center">Welcome to Infinito</h2>
        <p className="text-sm text-center text-gray-600">
          Complete your profile to enjoy this community to the fullest. It only takes <span className="font-semibold">2 steps</span>!
        </p>

        <form className="w-full flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Your Full Name</label>
            <input type="text" placeholder="Ashok Kumar" className="w-full border border-gray-300 px-4 py-2 rounded" required />
          </div>

          <div>
            <label className="text-sm font-medium">Your Birthday</label>
            <div className="relative">
              <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-300 px-4 py-2 rounded" required />
              <Calendar className="absolute top-2.5 right-3 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Create Username</label>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Pirana_Fish" className="w-full border border-gray-300 px-4 py-2 rounded" />
              <Shuffle className="cursor-pointer" />
            </div>
            <p className="text-xs text-gray-500 mt-1">You can change this again in account settings.</p>
            <ul className="text-xs text-gray-500 list-disc ml-4 mt-1">
              <li>Must be 8–30 characters</li>
              <li>Only use letters, underscore and periods</li>
            </ul>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onBack} className="text-sm text-gray-600 underline">Back</button>
            <button type="button" onClick={onNext} className="bg-red-600 text-white py-2 px-6 text-xs tracking-widest uppercase rounded">Continue &gt;</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupStep2;
