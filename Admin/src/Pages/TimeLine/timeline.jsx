import React, { useState, useEffect } from 'react';
import { Calendar, Image, Type, FileText, Plus, Edit2, Trash2, Save, Clock, Eye } from 'lucide-react';
import { addItems, getAllItems, deleteItems } from '../../services/timeline';

const InfinitoTimelineAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [showTimelines, setShowTimelines] = useState(false);
  const [timelineItems, setTimelineItems] = useState([]);

  const [timelineBlocks, setTimelineBlocks] = useState([
    {
      id: Date.now(),
      title: '',
      description: '',
      date: '',
      images: [],
    }
  ]);

  const handleBlockChange = (id, field, value) => {
    setTimelineBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, [field]: value } : block
      )
    );
  };

  const handleImageUpload = (id, files) => {
    setTimelineBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, images: Array.from(files) } : block
      )
    );
  };

  const addNewBlock = () => {
    setTimelineBlocks(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        title: '',
        description: '',
        date: '',
        images: [],
      }
    ]);
  };

  const removeBlock = (id) => {
    if (timelineBlocks.length > 1) {
      setTimelineBlocks(prev => prev.filter(block => block.id !== id));
    }
  };

  const removeImageFromBlock = (blockId, imageIndex) => {
    setTimelineBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { ...block, images: block.images.filter((_, i) => i !== imageIndex) }
          : block
      )
    );
  };

  const handleCreateTimeline = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    for (const block of timelineBlocks) {
      const { title, description, date, images } = block;

      if (!title || !description || !date || images.length === 0) {
        alert("All fields are required for each event block.");
        setLoading(false);
        return;
      }

      const result = await addItems({
        title,
        eventDate: date,
        description,
        image: images[0], // Send the first uploaded image
      });

      if (!result.data.success) {
        throw new Error("Failed to create one of the timeline events.");
      }
    }

    alert("All timeline events created successfully!");
    // Optionally clear form:
    // setTimelineBlocks([
    //   {
    //     id: Date.now(),
    //     title: '',
    //     description: '',
    //     date: '',
    //     images: [],
    //   },
    // ]);
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Error while creating timeline events.");
  } finally {
    setLoading(false);
  }
};

 const fetchTimelines = async () => {
    const items = await getAllItems();
    setTimelineItems(items);
    setShowTimelines(true);
  };

  const handleDelete = async (id) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this timeline event?");
    if (!confirmDelete) return;

    const response = await deleteItems(id);
    if (response.success) {
      alert("Event deleted successfully.");
      // Optionally refresh the list or remove the deleted item from state
      setTimelineItems((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert("Failed to delete event.");
    }
  } catch (error) {
    console.error(error);
    alert("Error occurred while deleting.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">

        <div className="flex justify-center mb-6">
          <button
          onClick={fetchTimelines}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Get All Timelines
          </button>
        </div>
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          
          {/* Form Section - Enhanced Design */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Plus className="w-7 h-7" />
                Create Timeline Events
              </h2>
              <p className="text-red-100 mt-1">Add memorable moments to your timeline</p>
            </div>
            
            <div className="p-8 space-y-8 max-h-[800px] overflow-y-auto">
              {timelineBlocks.map((block, index) => (
                <div key={block.id} className="border-2 border-slate-200 rounded-xl p-6 space-y-6 relative">
                  {/* Block Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-red-500" />
                      Event {index + 1}
                    </h3>
                    {timelineBlocks.length > 1 && (
                      <button
                        onClick={() => removeBlock(block.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Title Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
                      <Type className="w-5 h-5 text-red-500" />
                      Event Title
                    </label>
                    <input
                      value={block.title}
                      onChange={(e) => handleBlockChange(block.id, 'title', e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                      placeholder="What happened?"
                    />
                  </div>

                  {/* Date Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
                      <Calendar className="w-5 h-5 text-red-500" />
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={block.date}
                      onChange={(e) => handleBlockChange(block.id, 'date', e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                    />
                  </div>

                  {/* Description Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
                      <FileText className="w-5 h-5 text-red-500" />
                      Description
                    </label>
                    <textarea
                      value={block.description}
                      onChange={(e) => handleBlockChange(block.id, 'description', e.target.value)}
                      rows="4"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none resize-none"
                      placeholder="Tell the story behind this moment..."
                    />
                  </div>

                  {/* Images Upload */}
                  <div className="group">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
                    <Image className="w-5 h-5 text-red-500" />
                    Upload Images
                  </label>

                  {/* Upload Box - only show if no images */}
                  {block.images.length === 0 && (
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-red-400 transition-colors">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleImageUpload(block.id, e.target.files)}
                        className="hidden"
                        id={`image-upload-${block.id}`}
                      />
                      <label htmlFor={`image-upload-${block.id}`} className="cursor-pointer">
                        <Image className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium">Click to upload images</p>
                        <p className="text-slate-400 text-sm mt-1">JPG, PNG up to 10MB</p>
                      </label>
                    </div>
                  )}

                  {/* Image Preview + Action Button */}
                  {block.images.length > 0 && (
                    <div className="flex flex-col items-start gap-4 mt-4">
                      <div className="relative group">
                        <img
                          src={URL.createObjectURL(block.images[0])}
                          alt="preview"
                          className="w-20 h-20 object-cover rounded-lg border-2 border-slate-200"
                        />
                        <button
                          onClick={() => removeImageFromBlock(block.id, 0)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>

                      <div className="w-full flex justify-center">
                  <button
                    onClick={handleCreateTimeline}
                    className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Creating...' : 'Create a timeline'}
                  </button>
                </div>
                    </div>
                  )}
                </div>

                </div>
              ))}

              {/* Add More Blocks Button */}
              <button
                onClick={addNewBlock}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:from-slate-700 hover:to-slate-600 transition-all transform hover:scale-[1.02] shadow-lg border-2 border-dashed border-slate-300 hover:border-slate-400"
              >
                <Plus className="w-6 h-6" />
                Add More Blocks
              </button>
            </div>
          </div>
          
          {/* Preview Section - Enhanced Design */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Eye className="w-7 h-7" />
                Live Preview
              </h2>
              <p className="text-slate-200 mt-1">See how your timeline will appear</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-white max-h-[800px] overflow-y-auto">
              {timelineBlocks.some(block => block.title || block.description || block.date || block.images.length > 0) ? (
                <div className="space-y-0 p-6">
                  {timelineBlocks.map((block, index) => {
                    const isOddBlock = (index + 1) % 2 === 1;
                    const hasContent = block.title || block.description || block.date || block.images.length > 0;
                    
                    if (!hasContent) return null;

                    return (
                      <div key={block.id} className="grid md:grid-cols-[1fr_auto_1fr] min-h-[350px] items-stretch">
                        
                        {/* Conditional Layout Based on Block Number */}
                        {isOddBlock ? (
                          <>
                            {/* Left: Text Section (Odd blocks) */}
                            <div className="flex flex-col justify-center text-right">
                              <h3 className="text-sm font-semibold text-red-600 uppercase">
                                {block.title || "Untitled Event"}
                              </h3>

                              {block.date && (
                                <div className="text-right mb-7">
                                  <p className="font-semibold uppercase text-slate-700 text-sm">
                                    {new Date(block.date).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                    })}
                                  </p>
                                </div>
                              )}

                              <p className="text-slate-700 leading-relaxed text-xs font-semibold mb-5">
                                {block.description || "No description provided yet."}
                              </p>

                              <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-4 py-2 text-white text-xs self-end transition-all">
                                READ MORE →
                              </button>
                            </div>

                            {/* Middle: Red Vertical Line (Odd blocks) */}
                            <div className="px-4 py-5 flex justify-center pb-0 pt-0">
                              <div className="bg-gradient-to-b from-red-600 to-red-400 w-1 h-full shadow-md" />
                            </div>

                            {/* Right: Image Preview (Odd blocks) */}
                            <div className="flex flex-col justify-center items-center">
                              {block.images.length > 0 ? (
                                <div className="relative max-h-[300px] w-full">
                                  <img
                                    src={URL.createObjectURL(block.images[0])}
                                    alt="Main preview"
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ) : (
                                <div className="w-full h-[200px] bg-gradient-to-br from-slate-100 to-slate-200  flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                                  <div className="text-center">
                                    <Image className="mx-auto mb-3 w-8 h-8" />
                                    <p className="font-medium text-sm">No image uploaded</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Left: Image Preview (Even blocks) */}
                            <div className="flex flex-col justify-center items-center ">
                              {block.images.length > 0 ? (
                                <div className="relative max-h-[300px] w-full">
                                  <img
                                    src={URL.createObjectURL(block.images[0])}
                                    alt="Main preview"
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ) : (
                                <div className="w-full h-[200px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                                  <div className="text-center">
                                    <Image className="mx-auto mb-3 w-8 h-8" />
                                    <p className="font-medium text-sm">No image uploaded</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Middle: Black Vertical Line (Even blocks) */}
                            <div className="px-4 py-4 flex justify-center pt-0 pb-0">
                              <div className="bg-gradient-to-b from-slate-700 to-slate-500 w-1 h-full shadow-md" />
                            </div>

                            {/* Right: Text Section (Even blocks) */}
                            <div className="flex flex-col justify-center text-left pl-2">
                              <h3 className="text-sm font-semibold text-red-600 uppercase">
                                {block.title || "Untitled Event"}
                              </h3>

                              {block.date && (
                                <div className="text-left mb-7">
                                  <p className="font-semibold uppercase text-slate-700 text-sm">
                                    {new Date(block.date).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                    })}
                                  </p>
                                </div>
                              )}

                              <p className="text-slate-700 leading-relaxed text-xs font-semibold mb-5">
                                {block.description || "No description provided yet."}
                              </p>

                              <button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-4 py-2 text-white text-xs self-start transition-all">
                                READ MORE →
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 p-6">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-12">
                    <Calendar className="w-20 h-20 mx-auto mb-6 text-slate-400" />
                    <p className="font-semibold text-xl text-slate-600 mb-2">No timeline events yet</p>
                    <p className="text-slate-500">Start filling the form to see live preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {showTimelines && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Timeline Events</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineItems.map((item) => (
              <div
                key={item._id} // Assuming _id is your MongoDB identifier
                className="relative group bg-white border border-red-200 p-4 rounded-lg shadow hover:shadow-lg transition-all"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Delete
                  </button>
                  <button className="bg-green-600 text-white text-xs px-2 py-1 rounded">Save</button>
                </div>

                <h3 className="text-lg font-bold text-red-600">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
                <p className="text-gray-700 text-sm">{item.description}</p>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt="event"
                    className="w-full mt-3 h-40 object-cover rounded border"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>

    
  );
};

export default InfinitoTimelineAdmin;