import React, { useState } from 'react';

// Import your local images (adjust the paths as needed)
import defaultProfileImage from '../../../assets/Images/Botton.png'; // Example local image path
import supermanImage from '../../../assets/Images/Botton.png'; // Example local image path
import orderImage from '../../../assets/Images/Botton.png'; // Example local image path

export default function DashboardPage() {
  const [userName, setUserName] = useState('Fusion_Bot');
  const [userEmail, setUserEmail] = useState('nghtsuman24@gmail.com');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOn, setIsOn] = useState(true); // State for the toggle button

  // Function to handle the image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Function to toggle the state of the button
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-gray-100 border-r border-black p-6 sticky top-0 h-full flex-shrink-0 rounded-lg shadow-md">
        <div className="text-center mb-8">
          {/* "My Account" Label */}
          <h2 className="text-xl font-bold mb-4">My Account</h2>

          {/* Profile Image */}
          <div className="w-24 h-24 bg-pink-300 mx-auto rounded-md mb-4 flex items-center justify-center">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          
          {/* Edit Button for Image */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="block mx-auto mb-4 text-sm text-gray-600"
          />

          {/* Editable Name and Email */}
          {isEditMode ? (
            <div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-lg font-semibold mb-1 text-center border-b border-black p-1"
              />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="text-sm text-gray-600 text-center border-b border-black p-1"
              />
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-1">{userName}</h2>
              <p className="text-sm text-gray-600 text-center">{userEmail}</p>
            </div>
          )}
          
          {/* Edit Toggle Button */}
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className="mt-2 text-sm text-blue-500"
          >
            {isEditMode ? 'Save' : 'Edit'}
          </button>
        </div>
      </aside>

      {/* === Right Content === */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
        
        {/* Subscription Plan */}
        <section className="bg-red-100 p-4 rounded-md flex items-center justify-between border-black border shadow-md">
          <div className="text-lg font-semibold">FREE</div>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Upgrade Plan</button>
        </section>

        {/* === My Library (Horizontal Scroll) === */}
        <section>
          <h3 className="text-xl font-bold mb-4">My Library</h3>
          <div className="flex space-x-4 overflow-x-auto py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-32 h-40 bg-gray-200 rounded flex items-center justify-center overflow-hidden relative flex-shrink-0 shadow-md">
                <img 
                  src={supermanImage} // Replace with the correct path
                  alt={`Library Item ${i + 1}`} 
                  className="object-cover w-full h-full"
                />
                <span className="text-sm absolute bottom-2 left-2 text-white">Superman</span>
              </div>
            ))}
          </div>
        </section>

        {/* === My Orders (Horizontal Scroll) === */}
        <section>
          <h3 className="text-xl font-bold mb-4">My Orders</h3>
          <div className="flex space-x-4 overflow-x-auto py-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-40 h-48 bg-gray-200 rounded flex items-center justify-center overflow-hidden relative flex-shrink-0 shadow-md">
                <img 
                  src={orderImage} // Replace with the correct path
                  alt={`Order Item ${i + 1}`} 
                  className="object-cover w-full h-full"
                />
                <span className="text-sm absolute bottom-2 left-2 text-white">Order {i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* === My Interactions (Horizontal Scroll) === */}
        <section>
          <h3 className="text-xl font-bold mb-4">My Interactions</h3>
          <div className="flex space-x-4 overflow-x-auto py-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded w-80 flex-shrink-0 shadow-md border border-black">
                <p className="text-sm text-gray-700 mb-2">
                  2 days ago · A long established fact that a reader will be distracted...
                </p>
                <div className="w-full h-40 bg-gray-300 rounded mb-2" />
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>2.5k Likes</span>
                  <span>2.0k Comments</span>
                  <span>2.5k Shares</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === Account Settings */}
        <section className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-4">Account Settings</h3>
          <div className="space-y-4">
            {/* Service Emails */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                Service Emails
              </label>
              <div className="flex items-center">
                <span className="text-gray-500">On</span>
                <div className="w-10 h-10 bg-gray-300 rounded-lg border border-gray-600 relative ml-2 cursor-pointer" onClick={toggleSwitch}>
                  <div 
                    className={`w-7 h-7 bg-red-500 absolute top-0 transition-transform duration-200 
                      ${isOn ? 'left-0' : 'right-0'}
                    `}
                    style={{
                      width: '20px', 
                      height: '20px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Subscriptions related mails */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                Subscriptions related mails
              </label>
              <div className="flex items-center">
                <span className="text-gray-500">On</span>
                <div className="w-10 h-10 bg-gray-300 rounded-lg border border-gray-600 relative ml-2 cursor-pointer" onClick={toggleSwitch}>
                  <div 
                    className={`w-7 h-7 bg-red-500 absolute top-0 transition-transform duration-200 
                      ${isOn ? 'left-0' : 'right-0'}
                    `}
                    style={{
                      width: '20px', 
                      height: '20px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Top Comments/Comments related mails */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                Top Comments/Comments related mails
              </label>
              <div className="flex items-center">
                <span className="text-gray-500">On</span>
                <div className="w-10 h-10 bg-gray-300 rounded-lg border border-gray-600 relative ml-2 cursor-pointer" onClick={toggleSwitch}>
                  <div 
                    className={`w-7 h-7 bg-red-500 absolute top-0 transition-transform duration-200 
                      ${isOn ? 'left-0' : 'right-0'}
                    `}
                    style={{
                      width: '20px', 
                      height: '20px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Marketing Emails */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Marketing Emails
              </label>
              <div className="flex items-center">
                <span className="text-gray-500">Off</span>
                <div className="w-10 h-10 bg-gray-300 rounded-lg border border-gray-600 relative ml-2 cursor-pointer" onClick={toggleSwitch}>
                  <div 
                    className={`w-7 h-7 bg-red-500 absolute top-0 transition-transform duration-200 
                      ${isOn ? 'left-0' : 'right-0'}
                    `}
                    style={{
                      width: '20px', 
                      height: '20px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="mt-6 text-right">
            <button className="bg-[#D8D8D8] text-[#717171] px-6 py-2 rounded-md border border-[#A5A5A5]">
              Save Changes
            </button>
          </div>
        </section>

        {/* === Buttons */}
        <div className="flex space-x-4 mt-6">
          <button className="border border-black px-4 py-2 rounded">Give Feedback</button>
          <button className="border border-black px-4 py-2 rounded">Report Error</button>
          <button className="border border-red-500 text-red-500 px-4 py-2 rounded">Log Out</button>
        </div>
      </main>
    </div>
  );
}
