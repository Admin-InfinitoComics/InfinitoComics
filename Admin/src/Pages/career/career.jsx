// src/components/JobManagement.js
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    department: 'Creative & Design',
    jobType: 'Full-time',
    positions: 1,
    description: '',
    tasks: [{ point: '' }],
    skills: [{ point: '' }]
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterJobType, setFilterJobType] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [apiStatus, setApiStatus] = useState({ 
    isPending: false, 
    isSuccess: false, 
    isError: false,
    message: ''
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  
  // Calculate pagination values
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle task point changes
  const handleTaskChange = (index, value) => {
    const newTasks = [...formData.tasks];
    newTasks[index].point = value;
    setFormData({ ...formData, tasks: newTasks });
  };

  // Handle skill point changes
  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index].point = value;
    setFormData({ ...formData, skills: newSkills });
  };

  // Add new task point
  const addTaskPoint = () => {
    setFormData({ 
      ...formData, 
      tasks: [...formData.tasks, { point: '' }] 
    });
  };

  // Remove task point
  const removeTaskPoint = (index) => {
    if (formData.tasks.length === 1) return;
    const newTasks = [...formData.tasks];
    newTasks.splice(index, 1);
    setFormData({ ...formData, tasks: newTasks });
  };

  // Add new skill point
  const addSkillPoint = () => {
    setFormData({ 
      ...formData, 
      skills: [...formData.skills, { point: '' }] 
    });
  };

  // Remove skill point
  const removeSkillPoint = (index) => {
    if (formData.skills.length === 1) return;
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  // Format job data for API
  const formatJobForAPI = (job) => {
    return {
      jobTitle: job.title,
      Department: job.department,
      jobTypes: job.jobType,
      positions: job.positions,
      description: job.description,
      tasks: job.tasks.filter(task => task.point.trim() !== ''),
      skill: job.skills.filter(skill => skill.point.trim() !== '')
    };
  };

  // API call to save a new job
  const saveJobToBackend = async (jobData) => {
    setApiStatus({ 
      isPending: true, 
      isSuccess: false, 
      isError: false,
      message: 'Saving job...' 
    });
    
    try {
      const formattedJob = formatJobForAPI(jobData);
      console.log("Saving job to backend:", formattedJob);
      
      // Simulate API request with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Random success/failure for demonstration
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        setApiStatus({ 
          isPending: false, 
          isSuccess: true, 
          isError: false,
          message: 'Job saved successfully!' 
        });
      } else {
        throw new Error("Failed to save job: Server error");
      }
    } catch (error) {
      setApiStatus({ 
        isPending: false, 
        isSuccess: false, 
        isError: true,
        message: error.message 
      });
    }
  };

  // API call to update an existing job
  const updateJobInBackend = async (jobData) => {
    setApiStatus({ 
      isPending: true, 
      isSuccess: false, 
      isError: false,
      message: 'Updating job...' 
    });
    
    try {
      const formattedJob = formatJobForAPI(jobData);
      console.log("Updating job in backend:", formattedJob);
      
      // Simulate API request with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Random success/failure for demonstration
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        setApiStatus({ 
          isPending: false, 
          isSuccess: true, 
          isError: false,
          message: 'Job updated successfully!' 
        });
      } else {
        throw new Error("Failed to update job: Server error");
      }
    } catch (error) {
      setApiStatus({ 
        isPending: false, 
        isSuccess: false, 
        isError: true,
        message: error.message 
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty tasks and skills
    const filteredTasks = formData.tasks.filter(task => task.point.trim() !== '');
    const filteredSkills = formData.skills.filter(skill => skill.point.trim() !== '');
    
    const jobData = {
      ...formData,
      tasks: filteredTasks.length > 0 ? filteredTasks : [{ point: 'No tasks specified' }],
      skills: filteredSkills.length > 0 ? filteredSkills : [{ point: 'No skills specified' }]
    };
    
    if (editingId) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === editingId ? { ...jobData, id: editingId } : job
      ));
      
      // Send update to backend
      await updateJobInBackend(jobData);
      
      setEditingId(null);
    } else {
      // Add new job
      const newId = Math.max(...jobs.map(job => job.id), 0) + 1;
      const newJob = { ...jobData, id: newId };
      
      setJobs([...jobs, newJob]);
      
      // Send new job to backend
      await saveJobToBackend(jobData);
    }
    
    // Reset form and hide it
    setFormData({
      title: '',
      department: 'Creative & Design',
      jobType: 'Full-time',
      positions: 1,
      description: '',
      tasks: [{ point: '' }],
      skills: [{ point: '' }]
    });
    setShowForm(false);
    setCurrentPage(1); // Reset to first page
  };

  // Prepare form for editing a job
  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      department: job.department,
      jobType: job.jobType,
      positions: job.positions,
      description: job.description || '',
      tasks: job.tasks && job.tasks.length > 0 
        ? job.tasks 
        : [{ point: '' }],
      skills: job.skills && job.skills.length > 0 
        ? job.skills 
        : [{ point: '' }]
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  // Confirm delete action
  const confirmDelete = (id) => {
    setJobToDelete(id);
    setShowDeleteModal(true);
  };

  // Perform delete action
  const handleDelete = () => {
    setJobs(jobs.filter(job => job.id !== jobToDelete));
    if (editingId === jobToDelete) {
      setEditingId(null);
      setFormData({
        title: '',
        department: 'Creative & Design',
        jobType: 'Full-time',
        positions: 1,
        description: '',
        tasks: [{ point: '' }],
        skills: [{ point: '' }]
      });
    }
    setShowDeleteModal(false);
    setJobToDelete(null);
    // Reset to first page if the last job on current page is deleted
    if (currentJobs.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || job.department === filterDepartment;
    const matchesJobType = filterJobType === 'All' || job.jobType === filterJobType;
    
    return matchesSearch && matchesDepartment && matchesJobType;
  });

  // Get current jobs for pagination
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  
  // Total pages for pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get unique departments for filter dropdown
  const departments = ['All', '2D animators', 'Marketing', 'UI/UX', 'Human Resources', 'Legal','Finance','Graphic Designer','Management Trainee','Web Developer'];
  
  // Job types for filter dropdown
  const jobTypes = ['All', 'Internship', 'Full-time', 'Freelancer'];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter changes - reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDepartment, filterJobType]);

  // Auto-clear success/error messages after 3 seconds
  useEffect(() => {
    if (apiStatus.isSuccess || apiStatus.isError) {
      const timer = setTimeout(() => {
        setApiStatus({ 
          isPending: false, 
          isSuccess: false, 
          isError: false,
          message: '' 
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiStatus.isSuccess, apiStatus.isError]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this job listing? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Career Management</h1>
              <p className="text-gray-600 mt-2">Manage and create job listings</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => {
                  setShowForm(true);
                  if (editingId) {
                    setEditingId(null);
                    setFormData({
                      title: '',
                      department: 'Creative & Design',
                      jobType: 'Full-time',
                      positions: 1,
                      description: '',
                      tasks: [{ point: '' }],
                      skills: [{ point: '' }]
                    });
                  }
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" /> 
                Add New Job
              </button>
            </div>
          </div>
          
          {/* API Status Indicator */}
          {apiStatus.isPending && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
              <span className="text-blue-700">{apiStatus.message}</span>
            </div>
          )}
          
          {apiStatus.isSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <FiCheck className="text-green-600 mr-2" />
              <span className="text-green-700">{apiStatus.message}</span>
            </div>
          )}
          
          {apiStatus.isError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <FiX className="text-red-600 mr-2" />
              <span className="text-red-700">{apiStatus.message}</span>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                value={filterJobType}
                onChange={(e) => setFilterJobType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterDepartment('All');
                  setFilterJobType('All');
                }}
                className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId ? 'Edit Job' : 'Add New Job'}
              </h2>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    department: 'Creative & Design',
                    jobType: 'Full-time',
                    positions: 1,
                    description: '',
                    tasks: [{ point: '' }],
                    skills: [{ point: '' }]
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2D animators">2D animators</option>
                    <option value="Marketing">Marketing</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="legal">Legal</option>
                    <option value="Finance">Finance</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="Management Trainees">Management Trainees</option>
                    <option value="Web Developer">Web Developer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelancer">Freelancer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Open Positions *</label>
                  <input
                    type="number"
                    name="positions"
                    value={formData.positions}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the job role and responsibilities..."
                ></textarea>
              </div>
              
              {/* Tasks Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Key Tasks & Responsibilities</h3>
                  <button
                    type="button"
                    onClick={addTaskPoint}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Task
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.tasks.map((task, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mt-1.5 mr-2 text-gray-500">•</span>
                      <input
                        type="text"
                        value={task.point}
                        onChange={(e) => handleTaskChange(index, e.target.value)}
                        placeholder={`Task #${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeTaskPoint(index)}
                        disabled={formData.tasks.length === 1}
                        className={`ml-2 p-2 rounded-lg ${
                          formData.tasks.length === 1 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skills Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Required Skills & Qualifications</h3>
                  <button
                    type="button"
                    onClick={addSkillPoint}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Skill
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mt-1.5 mr-2 text-gray-500">•</span>
                      <input
                        type="text"
                        value={skill.point}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        placeholder={`Skill #${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkillPoint(index)}
                        disabled={formData.skills.length === 1}
                        className={`ml-2 p-2 rounded-lg ${
                          formData.skills.length === 1 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      title: '',
                      department: 'Creative & Design',
                      jobType: 'Full-time',
                      positions: 1,
                      description: '',
                      tasks: [{ point: '' }],
                      skills: [{ point: '' }]
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={apiStatus.isPending}
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${
                    apiStatus.isPending 
                      ? "bg-blue-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {apiStatus.isPending ? (
                    <>
                      <span className="animate-pulse">Processing...</span>
                    </>
                  ) : editingId ? (
                    'Update Job'
                  ) : (
                    'Add Job'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Positions
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentJobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No jobs found matching your criteria
                    </td>
                  </tr>
                ) : (
                  currentJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2 max-w-md">
                          {job.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{job.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${job.jobType === 'Full-time' ? 'bg-green-100 text-green-800' : 
                            job.jobType === 'Part-time' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {job.jobType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <span className="mr-2">{job.positions}</span>
                          <span className="text-gray-400">positions</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEdit(job)}
                            className="text-blue-600 hover:text-blue-900 transition-colors flex items-center"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => confirmDelete(job.id)}
                            className="text-red-600 hover:text-red-900 transition-colors flex items-center"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer with Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex flex-col md:flex-row items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700 mb-2 md:mb-0">
              Showing <span className="font-medium">{indexOfFirstJob + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastJob, filteredJobs.length)}
              </span>{" "}
              of <span className="font-medium">{filteredJobs.length}</span> jobs
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`w-8 h-8 rounded-full text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages || totalPages === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-gray-700">
              {jobs.length} total job listings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobManagement;