import React, { useState } from 'react';
import chat from '../../../assets/Images/Chat.png';
import { FaPaperclip, FaArrowLeft } from 'react-icons/fa'; // Importing icon for file attachment and arrow
import axios from 'axios'; 

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: '',
    customSubject: '',
    feedback: '',
    file: null, // Adding file state
  });

  const [isCustomSubject, setIsCustomSubject] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setFormData({
      ...formData,
      subject: selectedSubject,
      customSubject: selectedSubject === 'Custom' ? '' : formData.customSubject,
    });
    setIsCustomSubject(selectedSubject === 'Custom');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('subject', formData.subject === 'Custom' ? formData.customSubject : formData.subject);
    formDataToSend.append('feedback', formData.feedback);
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/feedback', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message); // Handle success
      setFormData({
        email: '',
        name: '',
        subject: '',
        customSubject: '',
        feedback: '',
        file: null,
      }); // Reset form after submit
    } catch (error) {
      alert('Error submitting feedback');
      console.error(error);
    }
  };

  return (
    <div className="flex gap-16 p-10 px-32 mx-auto max-w-7xl py-24">
      <div className="w-full md:w-1/2 space-y-6">
       
        <div className="flex items-center space-x-2 mb-4">
          <FaArrowLeft className="text-black" />
          <a href="/my-account" className="text-black text-xl text-bold">Back to My Account</a>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Registered Mail Section with Arrow above */}
          <div className="space-y-2">
            <div className="flex justify-center mb-2">
             
            </div>
            <label htmlFor="email" className="text-sm font-medium text-red-700">
              Registered Mail*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500">*This is where we’ll contact you if needed.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-red-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-red-700">
              Subject (Dropdown)
            </label>
            <select
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleSubjectChange}
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Please select what type of feedback you have</option>
              <option value="General">General</option>
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          {isCustomSubject && (
            <div className="space-y-2">
              <input
                type="text"
                id="customSubject"
                name="customSubject"
                value={formData.customSubject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your subject here..."
              />
            </div>
          )}

          <div className="space-y-2 relative">
            <label htmlFor="feedback" className="text-sm font-medium text-red-700">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Tell us how you feel..."
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* File Attachment Icon */}
            <div className="absolute top-10 right-2">
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('file').click()}
                className="flex items-center gap-2 p-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
              >
                <FaPaperclip />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 justify-end">
            <button
              type="reset"
              className=" text-red-500 p-5  font-extrabold; "
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white p-3 border border-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 w-30 h-16"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Right Preview Section */}
      <div className="w-full md:w-1/2 bg-white p-8 shadow-md border border-gray-200 relative">
        <img
          src={chat}
          alt="Preview Image"
          className="absolute top-[-40px] right-[-40px] w-52 h-52 object-cover border-4 border-white shadow-"
        />
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Feedback Preview</h3>
          <div className="text-sm text-gray-700">
            <div className="mb-3">
              <strong>Registered Mail:</strong> {formData.email}
            </div>
            <div className="mb-3">
              <strong>Your Name:</strong> {formData.name}
            </div>
            <div className="mb-3">
              <strong>Subject:</strong> {formData.subject === 'Custom' ? formData.customSubject : formData.subject}
            </div>
            <div className="mb-3">
              <strong>Your Feedback:</strong> {formData.feedback}
            </div>
            {formData.file && (
              <div className="mb-3">
                <strong>Attached File:</strong> {formData.file.name}
              </div>
            )}
          </div>
        </div>

        {/* Text inside the image */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
