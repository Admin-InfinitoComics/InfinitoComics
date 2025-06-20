import React, { useState } from 'react';

// Local images (adjust paths if needed)
import profileImageDefault from '../../../assets/Images/spotlight/image (2).png';
import libraryImage from '../../../assets/Images/spotlight/image (2).png';
import orderImage from '../../../assets/Images/spotlight/image (2).png';
import interactionImage from '../../../assets/Images/spotlight/image (2).png';

import leaf from '../../../assets/Images/leaf.png';


export default function DashboardPage() {
  const [userName, setUserName] = useState('Fusion_Bot');
  const [userEmail, setUserEmail] = useState('nghtsuman24@gmail.com');
  const [profileImage, setProfileImage] = useState(profileImageDefault);
  const [isEditMode, setIsEditMode] = useState(false);

  const [serviceEmails, setServiceEmails] = useState(true);
  const [subscriptionEmails, setSubscriptionEmails] = useState(true);
  const [commentEmails, setCommentEmails] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-gray-300 p-6 sticky top-0 flex-shrink-0">
        <h2 className="text-lg font-bold mb-6">MY ACCOUNT</h2>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-md bg-gray-200"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />

          {isEditMode ? (
            <>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-center border-b border-gray-400"
              />
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="text-center border-b border-gray-400"
              />
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold">{userName}</h3>
              <p className="text-xs text-gray-600">{userEmail}</p>
            </>
          )}

          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="text-xs text-blue-500 underline"
          >
            {isEditMode ? 'Save' : 'Edit'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 space-y-10 max-w-5xl mx-auto">

  <div>
    <span className="text-lg font-bold">My subscription plan</span>
  </div>

  {/* Plan */}
  <section className="flex justify-between items-center p-6 bg-[#FDE3E4] rounded-lg border border-[#F8B7B7]">
    <div className="flex items-center">
      {/* Logo Image before FREE */}
      <img
        src={leaf} // Replace with your logo image path
        alt="Logo"
        className="w-6 h-6 mr-2" // Adjust the size of the logo
      />
      <span className="text-m-bold text-black-600">FREE</span>
    </div>
      <div className="flex items-center text-red-700  space-x-2">
      <span>Upgrade now and enjoy ad-free, unlimited access!</span>
      <button className="bg-[#D9534F] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#c74e46] transition duration-300">
        UPGRADE PLAN
      </button>
    </div>
  </section>

        {/* Library */}
        <section>
          <h3 className="text-lg font-bold mb-4">My Library</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="w-32 h-40 bg-black relative rounded shadow flex-shrink-0 overflow-hidden"
              >
                <img src={libraryImage} alt="Library" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 text-white text-[10px] font-semibold">
                  SUPERMAN
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Orders */}
        <section>
          <h3 className="text-lg font-bold mb-4">My Orders</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="w-40 h-48 bg-black relative rounded shadow flex-shrink-0 overflow-hidden"
              >
                <img src={orderImage} alt="Order" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 text-white text-[10px] font-semibold">
                  ORDER HISTORY
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Interactions */}
        <section>
          <h3 className="text-lg font-bold mb-4">My Interactions</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="w-80 border border-gray-300 rounded shadow p-4 flex-shrink-0"
              >
                <p className="text-[10px] mb-2 text-gray-600">2 days ago</p>
                <p className="text-xs mb-2">
                  A long established fact that a reader will be distracted by the readable content...
                </p>
                <img
                  src={interactionImage}
                  alt="Interaction"
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>3.5k Likes</span>
                  <span>1.5k Comments</span>
                  <span>1.5k Shares</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Account Settings */}
        <section className="border border-gray-300 p-6 rounded shadow space-y-4">
          <h3 className="text-lg font-bold">Account Settings</h3>

          {[
            { label: 'Service Emails', state: serviceEmails, setter: setServiceEmails },
            { label: 'Subscriptions related mails', state: subscriptionEmails, setter: setSubscriptionEmails },
            { label: 'Top Comments/Comments related mails', state: commentEmails, setter: setCommentEmails },
            { label: 'Marketing Emails', state: marketingEmails, setter: setMarketingEmails },
          ].map(({ label, state, setter }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-sm">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={state}
                  onChange={() => setter(!state)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-500 transition"></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    state ? 'translate-x-5' : ''
                  }`}
                ></div>
              </label>
            </div>
          ))}

          <div className="text-right">
            <button className="bg-gray-200 text-gray-700 px-6 py-2 text-xs rounded border border-gray-400">
              SAVE CHANGES
            </button>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-between items-center w-full">
  {/* Left side: buttons */}
  <div className="flex space-x-4">
    <button className="border border-black text-xs px-4 py-2 rounded">GIVE FEEDBACK</button>
    <button className="border border-black text-xs px-4 py-2 rounded">SUPPORT US</button>
    <button className="border border-red-500 text-red-500 text-xs px-4 py-2 rounded">LOG OUT</button>
  </div>
  {/* Right side: delete account */}
  <span className="text-sm text-red-600 cursor-pointer">delete my account</span>
</div>



      </main>
    </div>
  );
}
