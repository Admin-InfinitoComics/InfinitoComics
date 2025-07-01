import React, { useState } from "react";
import axios from "axios";

const AdminPublishResearch = () => {
  const [formData, setFormData] = useState({
    title: "",
    journalName: "",
    datePublished: "",
    authors: [""],
    citationCount: 0,
    downloadCount: 0,
    abstract: "",
    keywords: [""],
    introduction: "",
    references: [""],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Transform references to expected format: [{ text: "..." }]
  const transformedData = {
    ...formData,
    references: formData.references.map((ref) => ({ text: ref })),
  };

  try {
    await axios.post("http://localhost:3000/researchPaper/", transformedData);
    alert("Research paper published successfully!");
    // Optional: clear form after submission
    setFormData({
      title: "",
      journalName: "",
      datePublished: "",
      authors: [""],
      citationCount: 0,
      downloadCount: 0,
      abstract: "",
      keywords: [""],
      introduction: "",
      references: [""],
    });
  } catch (error) {
    console.error("Error submitting research paper:", error);
    alert("Error submitting paper.");
  }
};

  return (
    <div className="bg-[#fdfdfd] py-12 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10">
        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-9/12 bg-white shadow-md p-8 rounded-md"
        >
          <h2 className="text-3xl font-bold text-left mb-6 text-red-600">
            Publish Research Paper
          </h2>

          {/* Title */}
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          {/* Journal Name + Date */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Journal Name
              </label>
              <input
                type="text"
                name="journalName"
                required
                value={formData.journalName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Date Published
              </label>
              <input
                type="date"
                name="datePublished"
                required
                value={formData.datePublished}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Authors */}
          <label className="block text-sm font-semibold mb-1">Authors</label>
          {formData.authors.map((author, idx) => (
            <input
              key={idx}
              type="text"
              value={author}
              onChange={(e) => handleArrayChange(idx, "authors", e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
          ))}
          <button
            type="button"
            onClick={() => addField("authors")}
            className="text-sm text-blue-600 mb-4"
          >
            + Add Author
          </button>

          {/* Citation & Download */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Citation Count
              </label>
              <input
                type="number"
                name="citationCount"
                value={formData.citationCount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Download Count
              </label>
              <input
                type="number"
                name="downloadCount"
                value={formData.downloadCount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Abstract */}
          <label className="block text-sm font-semibold mb-1">Abstract</label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          ></textarea>

          {/* Keywords */}
          <label className="block text-sm font-semibold mb-1">Keywords</label>
          {formData.keywords.map((keyword, idx) => (
            <input
              key={idx}
              type="text"
              value={keyword}
              onChange={(e) => handleArrayChange(idx, "keywords", e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
          ))}
          <button
            type="button"
            onClick={() => addField("keywords")}
            className="text-sm text-blue-600 mb-4"
          >
            + Add Keyword
          </button>

          {/* Introduction */}
          <label className="block text-sm font-semibold mb-1">Introduction</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            rows="6"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          ></textarea>

          {/* References */}
          <label className="block text-sm font-semibold mb-1">References</label>
          {formData.references.map((ref, idx) => (
            <input
              key={idx}
              type="text"
              value={ref}
              onChange={(e) => handleArrayChange(idx, "references", e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              required
            />
          ))}
          <button
            type="button"
            onClick={() => addField("references")}
            className="text-sm text-blue-600 mb-4"
          >
            + Add Reference
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            Publish Paper
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminPublishResearch;
