import React, { useState, useEffect } from 'react';
import { FaBold, FaItalic } from 'react-icons/fa';
import { MdVisibility } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { PiFloppyDiskDuotone } from 'react-icons/pi';
import { MdSend } from 'react-icons/md';
import { MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight } from 'react-icons/md';
import Navbar from './Navbar/Navbar';

const BlogCreator = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const [showNotification, setShowNotification] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [publishedBlogs, setPublishedBlogs] = useState([]);

  const defaultStyle = {
    fontFamily: 'Arial',
    fontSize: '16px',
    color: '#000',
    alignment: 'left',
    bold: false,
    italic: false
  };

  const [titleStyle, setTitleStyle] = useState(defaultStyle);
  const [subjectStyle, setSubjectStyle] = useState(defaultStyle);
  const [descriptionStyle, setDescriptionStyle] = useState(defaultStyle);
  const [editingBlog, setEditingBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  const colors = ['#000', '#222', '#444', '#666', '#888', '#aaa', '#ccc', '#eee', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#ffa500', '#800080', '#008000', '#800000'];

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/blog/deleteblog/${blogId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (response.ok) {
      alert('Blog deleted successfully!');
      
      // Update state
      const updated = publishedBlogs.filter((b) => b._id !== blogId);
      setPublishedBlogs(updated);

      // Update localStorage
      localStorage.setItem('publishedBlogs', JSON.stringify(updated));

       // Update allBlogs too!
      const updatedAll = allBlogs.filter((b) => b._id !== blogId);
      setAllBlogs(updatedAll);
    } else {
      console.error('Error:', result);
      alert(`Error deleting blog: ${result.message}`);
    }
  } catch (err) {
    console.error('Network Error:', err);
    alert('Error deleting blog - check console for details');
  }
};

const handleUpdate = async () => {
  if (!editingBlog) {
    alert('No blog is being edited!');
    return;
  }

  const confirmUpdate = window.confirm("Are you sure you want to save the changes or update this blog?");
  if (!confirmUpdate) return;

  const formData = new FormData();
  formData.append('title', title);
  formData.append('subject', subject);
  formData.append('description', description);
  formData.append('status', 'published');
  formData.append('titleStyle', JSON.stringify(titleStyle));
  formData.append('subjectStyle', JSON.stringify(subjectStyle));
  formData.append('descriptionStyle', JSON.stringify(descriptionStyle));


  try {
    const response = await fetch(`http://localhost:3000/blog/updateblog/${editingBlog._id}`, {
      method: 'PUT',
      body: formData, // ✅ just like handlePublish
    });

    const result = await response.json();

    if (response.ok) {
      alert('Blog updated successfully!');
      console.log('Updated:', result);

      // Update local state
      const updatedBlogs = publishedBlogs.map((b) =>
        b._id === editingBlog._id
        ? { ...b, title, subject, description, status: 'published',  titleStyle,subjectStyle,
              descriptionStyle,}
        : b
      );
      setPublishedBlogs(updatedBlogs);
      localStorage.setItem('publishedBlogs', JSON.stringify(updatedBlogs));

      // Update allBlogs
      const updatedAllBlogs = allBlogs.map((b) =>
        b._id === editingBlog._id
          ? { ...b, title, subject, description, status: 'published', titleStyle,subjectStyle,
              descriptionStyle }
          : b
      );
      setAllBlogs(updatedAllBlogs);

      // Clear form & editing state
      setEditingBlog(null);
      setTitle('');
      setSubject('');
      setDescription('');
      setShowPreview(false);

    } else {
      console.error('Error updating:', result);
      alert(`Error updating blog: ${result.message}`);
    }
  } catch (err) {
    console.error('Network Error:', err);
    alert('Error updating blog - check console for details');
  }
};

  const handleGetAllBlogs = async () => {
  try {
    const response = await fetch('http://localhost:3000/blog/getallblog');
    const result = await response.json();

    if (response.ok) {
      console.log('Fetched all blogs:', result.data);
      setAllBlogs(result.data);
      localStorage.setItem('allBlogs', JSON.stringify(result.data));
    } else {
      console.error('Error fetching blogs:', result);
      alert(`Error fetching blogs: ${result.message}`);
    }
  } catch (err) {
    console.error('Network Error:', err);
    alert('Error fetching blogs - check console for details');
  }
};


  useEffect(() => {
    const savedDraft = localStorage.getItem('blogDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setTitle(draft.title || '');
      setSubject(draft.subject || '');
      setDescription(draft.description || '');
      setTitleStyle(draft.titleStyle || defaultStyle);
      setSubjectStyle(draft.subjectStyle || defaultStyle);
      setDescriptionStyle(draft.descriptionStyle || defaultStyle);
      setShowNotification(true);
      setShowReset(true);
    }

    const savedPublished = localStorage.getItem('publishedBlogs');
    if (savedPublished) {
      setPublishedBlogs(JSON.parse(savedPublished));
    }
  }, []);

  const handleSaveDraft = () => {
    const draftData = {
      title,
      subject,
      description,
      titleStyle,
      subjectStyle,
      descriptionStyle,
    };
    localStorage.setItem('blogDraft', JSON.stringify(draftData));
    setShowNotification(true);
    setShowReset(true);
    alert('Draft saved locally!');
  };

  const handleResetDraft = () => {
    localStorage.removeItem('blogDraft');
    setTitle('');
    setSubject('');
    setDescription('');
    setTitleStyle(defaultStyle);
    setSubjectStyle(defaultStyle);
    setDescriptionStyle(defaultStyle);
    setImages([]);
    setShowNotification(false);
    setShowReset(false);
    alert('Draft reset!');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('status', 'published');
    // images.forEach((img) => {
    //   formData.append('images', img);
    // });

    // Add style objects as string
    formData.append('titleStyle', JSON.stringify(titleStyle));
    formData.append('subjectStyle', JSON.stringify(subjectStyle));
    formData.append('descriptionStyle', JSON.stringify(descriptionStyle));

    try {
      const response = await fetch('http://localhost:3000/blog/createblog', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert('Blog Published Successfully!');
        console.log('Success:', result);

        // Add new card
        const newBlog = {
          _id: result.data._id,  
          title,
          subject,
          description,
          titleStyle,
          subjectStyle,
          descriptionStyle,
        };

        const updatedBlogs = [...publishedBlogs, newBlog];
        setPublishedBlogs(updatedBlogs);
        localStorage.setItem('publishedBlogs', JSON.stringify(updatedBlogs));

        setTitle('');
        setSubject('');
        setDescription('');
        setImages([]);
        localStorage.removeItem('blogDraft');
        setShowNotification(false);
        setShowReset(false);
      } else {
        console.error('Error:', result);
        alert(`Error publishing blog: ${result.message}`);
      }
    } catch (err) {
      console.error('Network Error:', err);
      alert('Error publishing blog - check console for details');
    }
  };

  const renderTextField = (label, value, onChange, styleObj, setStyle, placeholder) => (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
        <span className="text-xl">T</span> {label}
      </h2>
      <textarea
        className="w-full border p-3 rounded mb-4"
        style={{
          height: '150px',
          color: styleObj.color,
          fontFamily: styleObj.fontFamily,
          fontSize: styleObj.fontSize,
          textAlign: styleObj.alignment,
          fontWeight: styleObj.bold ? 'bold' : 'normal',
          fontStyle: styleObj.italic ? 'italic' : 'normal'
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="border px-2 py-1 rounded"
          value={styleObj.fontFamily}
          onChange={(e) => setStyle({ ...styleObj, fontFamily: e.target.value })}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Courier New">Courier New</option>
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={styleObj.fontSize}
          onChange={(e) => setStyle({ ...styleObj, fontSize: e.target.value })}
        >
          <option>16px</option>
          <option>20px</option>
          <option>24px</option>
          <option>32px</option>
        </select>
        <div className="flex gap-1">
          {colors.map((c, i) => (
            <button
              key={i}
              onClick={() => setStyle({ ...styleObj, color: c })}
              className="w-5 h-5 rounded border"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="flex gap-1 ml-auto">
          <button
            onClick={() => setStyle({ ...styleObj, alignment: 'left' })}
            className="px-2 py-1 border rounded"
          > <MdFormatAlignLeft size={18} /></button>
          <button
            onClick={() => setStyle({ ...styleObj, alignment: 'center' })}
            className="px-2 py-1 border rounded"
          ><MdFormatAlignCenter size={18} /></button>
          <button
            onClick={() => setStyle({ ...styleObj, alignment: 'right' })}
            className="px-2 py-1 border rounded"
          ><MdFormatAlignRight size={18} /></button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStyle({ ...styleObj, bold: !styleObj.bold })}
            className={`px-2 py-1 rounded ${styleObj.bold ? 'bg-gray-400' : 'bg-gray-200'}`}
          >
            <FaBold />
          </button>
          <button
            onClick={() => setStyle({ ...styleObj, italic: !styleObj.italic })}
            className={`px-2 py-1 rounded ${styleObj.italic ? 'bg-gray-400' : 'bg-gray-200'}`}
          >
            <FaItalic />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
<Navbar/>
  
    <div className="min-h-screen bg-[#f6f6ff] p-20 font-sans relative">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 md:mb-0">
            Infinito Comics - Blog Creator
          </h1>
          <p className="text-gray-600">
            Create and publish engaging blog content for your audience
          </p>
        </div>

        <button
          onClick={handleGetAllBlogs}
          className="mt-4 md:mt-0 px-6 py-3 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          All Blogs
        </button>
      </div>

      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-200 text-green-900 px-4 py-2 rounded shadow-lg z-50">
          Draft saved locally!
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {renderTextField('Blog Title', title, setTitle, titleStyle, setTitleStyle, 'Enter your blog title...')}
          {renderTextField('Subject', subject, setSubject, subjectStyle, setSubjectStyle, 'Enter blog subject...')}
          {renderTextField('Full Story', description, setDescription, descriptionStyle, setDescriptionStyle, 'Write your full story here...')}

          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
              <AiOutlineCloudUpload /> Upload Images
            </h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-3 rounded text-black mb-4"
            />
            <div className="flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24">
                  <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover rounded" />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >X</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-6 py-3 border rounded bg-white text-black font-semibold hover:bg-gray-50"
            >
              <PiFloppyDiskDuotone className="text-xl" /> Save Draft
            </button>

            {showReset && (
              <button
                onClick={handleResetDraft}
                className="flex items-center gap-2 px-6 py-3 border rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200"
              >
                Reset
              </button>
            )}

            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-6 py-3 rounded bg-black text-white font-semibold hover:bg-gray-800"
            >
              <MdSend className="text-xl" /> Publish Blog
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <MdVisibility /> Preview
          </h2>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="border px-4 py-2 rounded hover:bg-gray-100 w-full"
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>

          {showPreview && (
            <div className="mt-4 prose max-w-none">
              <h1
                style={{
                  color: titleStyle.color,
                  fontFamily: titleStyle.fontFamily,
                  fontSize: titleStyle.fontSize,
                  textAlign: titleStyle.alignment,
                  fontWeight: titleStyle.bold ? 'bold' : 'normal',
                  fontStyle: titleStyle.italic ? 'italic' : 'normal',
                }}
              >
                {title}
              </h1>

              <h2
                style={{
                  color: subjectStyle.color,
                  fontFamily: subjectStyle.fontFamily,
                  fontSize: subjectStyle.fontSize,
                  textAlign: subjectStyle.alignment,
                  fontWeight: subjectStyle.bold ? 'bold' : 'normal',
                  fontStyle: subjectStyle.italic ? 'italic' : 'normal',
                }}
              >
                {subject}
              </h2>

              <p
                style={{
                  color: descriptionStyle.color,
                  fontFamily: descriptionStyle.fontFamily,
                  fontSize: descriptionStyle.fontSize,
                  textAlign: descriptionStyle.alignment,
                  fontWeight: descriptionStyle.bold ? 'bold' : 'normal',
                  fontStyle: descriptionStyle.italic ? 'italic' : 'normal',
                }}
              >
                {description}
              </p>

              {images.length > 0 && (
                <div className="mt-4">
                  <h3>Images:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
               {/* Only show "Update" button if editingBlog */}
              {editingBlog && (
                <button
                  onClick={handleUpdate}
                  className="mt-4 px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Update
                </button>
              )}
            </div>
          )}
        </div>
      </div>

    {/* All Blogs */}
    {allBlogs.length > 0 && (
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">All Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allBlogs.map((blog) => (
            <div 
              key={blog._id} 
              className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white"
            >
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.subject}</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 transition-opacity duration-300">
                <button
                  onClick={() => {
                    setTitle(blog.title);
                    setSubject(blog.subject);
                    setDescription(blog.description);
                    setTitleStyle(blog.titleStyle || defaultStyle);
                    setSubjectStyle(blog.subjectStyle || defaultStyle);
                    setDescriptionStyle(blog.descriptionStyle || defaultStyle);
                    setShowPreview(true);
                  }}
                  className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200"
                >
                  Open
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setTitle(blog.title);
                    setSubject(blog.subject);
                    setDescription(blog.description);
                    setTitleStyle(blog.titleStyle || defaultStyle);
                    setSubjectStyle(blog.subjectStyle || defaultStyle);
                    setDescriptionStyle(blog.descriptionStyle || defaultStyle);
                    setShowPreview(true);
                    setEditingBlog(blog);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    </div>
      </div>
  );
};

export default BlogCreator;
