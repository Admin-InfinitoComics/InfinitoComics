import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Plus, Edit3, Trash2, HelpCircle, Save, X, AlertCircle } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "", order: "", id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  const API_URL = "http://localhost:3000/faq";

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success && Array.isArray(response.data.data)) {
        setFaqs(response.data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      toast.error(
        "Oops! Something went wrong while loading FAQs. Please check your connection or refresh the page.",
        { toastId: "faq-fetch-failed" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderNumber = parseInt(form.order);

    if (!form.question.trim() || !form.answer.trim() || isNaN(orderNumber)) {
      setError("All fields are required and order must be a valid number.");
      return;
    }

    const isDuplicateOrder = faqs.some(faq => faq.order === orderNumber && faq._id !== form.id);
    if (isDuplicateOrder) {
      setError("This order number already exists. Please choose a different one.");
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, {
          question: form.question.trim(),
          answer: form.answer.trim(),
          order: orderNumber
        });
        toast.success("FAQ updated successfully!");
      } else {
        await axios.post(API_URL, {
          question: form.question.trim(),
          answer: form.answer.trim(),
          order: orderNumber
        });
        toast.success("FAQ added successfully!");
      }

      resetForm();
      fetchFaqs();
    } catch (err) {
      toast.error("Failed to save FAQ. Please try again.", {
        toastId: "faq-save-failed"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ question: "", answer: "", order: "", id: null });
    setIsEditing(false);
    setShowForm(false);
    setError("");
  };

  const handleEdit = (faq) => {
    setForm({
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
      order: faq.order.toString()
    });
    setIsEditing(true);
    setShowForm(true);
    setError("");

    setTimeout(() => {
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this FAQ?");
    if (confirmDelete) {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/${id}`);
        toast.info("FAQ deleted successfully.");
        fetchFaqs();
      } catch (err) {
        toast.error("Failed to delete FAQ. Please try again.", {
          toastId: "faq-delete-failed"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-28">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FAQ Manager</h1>
          <p className="text-lg text-gray-600">Manage your frequently asked questions with ease</p>
        </div>

        {/* Add Button */}
        {!showForm && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New FAQ
            </button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div ref={formRef} className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black flex items-center">
                  {isEditing ? <Edit3 className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                  {isEditing ? "Edit FAQ" : "Add New FAQ"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
                <input
                  type="text"
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="Enter your question here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Answer</label>
                <textarea
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Provide a detailed answer..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">Order must be unique</p>
              </div>

              {error && (
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? "Saving..." : isEditing ? "Update FAQ" : "Add FAQ"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FAQ List */}
        {sortedFaqs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No FAQs Yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first FAQ</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions ({sortedFaqs.length})
            </h2>
            {sortedFaqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3">
                          {faq.order}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-11">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Order: {faq.order}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq._id)}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </div>
    </div>
  );
};

export default FAQManager;
