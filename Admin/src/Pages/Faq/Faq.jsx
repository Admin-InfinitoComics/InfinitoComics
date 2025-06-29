import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "", order: "", id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef(null); // 👈 Create a ref for the form

  const API_URL = "http://localhost:3000/faq";

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data.success && Array.isArray(response.data.data)) {
        setFaqs(response.data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      toast.error("Failed to fetch FAQs.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderNumber = parseInt(form.order);

    if (!form.question || !form.answer || isNaN(orderNumber)) {
      setError("All fields are required and order must be a number.");
      return;
    }

    const isDuplicateOrder = faqs.some(faq => faq.order === orderNumber && faq._id !== form.id);
    if (isDuplicateOrder) {
      setError("This order number already exists. Please choose a different one.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, {
          question: form.question,
          answer: form.answer,
          order: orderNumber
        });
        toast.success("FAQ updated successfully!");
      } else {
        await axios.post(API_URL, {
          question: form.question,
          answer: form.answer,
          order: orderNumber
        });
        toast.success("FAQ added successfully!");
      }

      setForm({ question: "", answer: "", order: "", id: null });
      setIsEditing(false);
      fetchFaqs();
    } catch (err) {
      toast.error("Failed to save FAQ.");
    }
  };

  const handleEdit = (faq) => {
    setForm({
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
      order: faq.order
    });
    setIsEditing(true);
    setError("");

    // 👇 Scroll to the form smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this FAQ?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.info("FAQ deleted.");
        fetchFaqs();
      } catch (err) {
        toast.error("Failed to delete FAQ.");
      }
    }
  };

  const sortedFaqs = Array.isArray(faqs)
    ? [...faqs].sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="max-w-3xl mx-auto p-4 mt-32 ">
      <h1 className="text-2xl font-bold mb-4">FAQ Manager</h1>

      {/* 👇 Ref on this form wrapper */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Question"
          className="w-full border p-2"
        />
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="Answer"
          className="w-full border p-2"
        />
        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleChange}
          placeholder="Order (must be unique)"
          className="w-full border p-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {isEditing ? "Update FAQ" : "Add FAQ"}
        </button>
      </form>

      <div>
        {sortedFaqs.map((faq) => (
          <div key={faq._id} className="border p-4 mb-4 rounded bg-gray-50">
            <h3 className="font-semibold text-lg">Q{faq.order}. {faq.question}</h3>
            <p className="text-gray-700 mb-1">Ans: {faq.answer}</p>
            <p className="text-sm text-gray-500 mb-2">Order: {faq.order}</p>
            <button onClick={() => handleEdit(faq)} className="text-blue-600 mr-4">
              Edit
            </button>
            <button onClick={() => handleDelete(faq._id)} className="text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FAQManager;
