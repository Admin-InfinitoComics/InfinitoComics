  import React, { useState, useEffect, useRef } from 'react';
  import { Calendar, Image, Type, FileText, Plus, Edit2, Trash2, Save, Clock, Eye, Tags, X } from 'lucide-react';
  import { addItems, getAllItems, deleteItems, updateItems } from '../../services/timeline';
  import Swal from 'sweetalert2';
  import withReactContent from 'sweetalert2-react-content';
  const MySwal = withReactContent(Swal);
  const showAlert = (type, shouldReload = true) => {
    const config = {
      icon: 'success',
      title: '',
      html: '',
      showConfirmButton: true,
      confirmButtonText: 'Awesome!',
      confirmButtonColor: '#4CAF50',
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `,
    };
    switch (type) {
      case 'published':
        config.title = '🎉 Blog Published!';
        config.html = `<strong>Your blog has been <span style="color:#4CAF50;">successfully published</span>!</strong>`;
        config.icon = 'success';
        break;
      case 'updated':
        config.title = '✏️ Blog Updated!';
        config.html = `<strong>Your blog changes have been <span style="color:#2196F3;">saved</span>!</strong>`;
        config.icon = 'info';
        config.confirmButtonColor = '#2196F3';
        break;
      case 'deleted':
        config.title = '🗑️ Blog Deleted!';
        config.html = `<strong>The blog has been <span style="color:#f44336;">permanently removed</span>.</strong>`;
        config.icon = 'warning';
        config.confirmButtonColor = '#f44336';
        break;
      default:
        config.title = '✅ Success';
        config.html = 'Operation completed successfully!';
    }
    MySwal.fire(config).then(() => {
      if (shouldReload) {
        window.location.reload();
    }
    });
  };
const InfinitoTimelineAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [showTimelines, setShowTimelines] = useState(false);
  const [timelineItems, setTimelineItems] = useState([]);
  const [editingBlocks, setEditingBlocks] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);

  const [timelineBlocks, setTimelineBlocks] = useState([ ]);
  const timelineRef = useRef(null);
  const inputSectionRef = useRef(null);

  useEffect(() => {
    const fetchAndInit = async () => {
      const items = await getAllItems();
      setTimelineItems(items);

      const maxEventNumber = items.length > 0
        ? Math.max(...items.map(item => Number(item.eventNumber)))
        : 0;

      setTimelineBlocks([
        {
          id: Date.now(),
          eventNumber: maxEventNumber + 1, // <-- always next available
          title: '',
          description: '',
          category: '',
          date: '',
          images: [],
        }
      ]);
    };
    fetchAndInit();
  }, []);

const handleBlockChange = (id, field, value) => {
  if (editingBlocks.length > 0) {
    setEditingBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, [field]: value } : block
      )
    );
  } else {
    setTimelineBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, [field]: value } : block
      )
    );
  }
};

const handleImageUpload = (id, files) => {
  if (editingBlocks.length > 0) {
    setEditingBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, images: Array.from(files) } : block
      )
    );
  } else {
    setTimelineBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, images: Array.from(files) } : block
      )
    );
  }
};

const getNextEventNumber = () => {
  const allNumbers = [
    ...timelineItems.map(item => Number(item.eventNumber)),
    ...timelineBlocks.map(block => Number(block.eventNumber)),
    ...editingBlocks.map(block => Number(block.eventNumber))
  ].filter(Boolean);
  return allNumbers.length > 0 ? Math.max(...allNumbers) + 1 : 1;
};

const addNewBlock = () => {
  setTimelineBlocks(prev => [
    ...prev,
    {
      id: Date.now() + Math.random(),
      eventNumber: getNextEventNumber(),
      title: '',
      description: '',
      category: '',
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
      (block.id || block._id) === blockId
        ? { ...block, images: block.images.filter((_, i) => i !== imageIndex) }
        : block
    )
);

setEditingBlocks(prev =>
    prev.map(block =>
      (block.id || block._id) === blockId
        ? { ...block, images: block.images.filter((_, i) => i !== imageIndex) }
        : block
    )
  );
};

const handleCreateTimeline = async (blockId, index) => {
  setLoading(true);
  try {
    const block = timelineBlocks.find((b) => b.id === blockId);
    if (!block) throw new Error("Block not found");

    const { title, description, category, date, images, eventNumber } = block;

    const result = await addItems({
      title,
      eventDate: date,
      category,
      description,
      image: images[0], 
      eventNumber:  String(eventNumber),
    });

    if (!result.data.success) {
      throw new Error(result.data.message || "Failed to create timeline event.");
    }
    showAlert('published', false); 
  } catch (error) {
    console.error(error);
    alert(error.message || "Error while creating timeline event.");
  } finally {
    setLoading(false);
  }
};

const fetchTimelines = async () => {
const items = await getAllItems();
setTimelineItems(items);

const maxEventNumber = items.length > 0
  ? Math.max(...items.map(item => Number(item.eventNumber)))
  : 0;

setTimelineBlocks([
  {
    id: Date.now(),
    eventNumber: maxEventNumber + 1,
    title: '',
    description: '',
    category: '',
    date: '',
    images: [],
  }
]);
setCurrentPage(1);
setShowTimelines(true);

setTimeout(() => {
  timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
}, 100);
};

const renumberBlocks = (blocks) => {
  return blocks
    .sort((a, b) => Number(a.eventNumber) - Number(b.eventNumber))
    .map((block, idx) => ({
      ...block,
      eventNumber: idx + 1
    }));
};

const handleDelete = async (id) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this timeline event?");
    if (!confirmDelete) return;

    const response = await deleteItems(id);
    if (response.success) {
      showAlert("deleted");
      const updatedItems = renumberBlocks(timelineItems.filter(item => item._id !== id));
      setTimelineItems(updatedItems);

      await updateEventNumbersInDB(updatedItems);

      setTimelineBlocks(prev => renumberBlocks(prev.filter(block => block._id !== id)));
      setEditingBlocks(prev => renumberBlocks(prev.filter(block => block._id !== id)));
    } else {
      alert("Failed to delete event.");
    }
  } catch (error) {
    console.error(error);
    alert("Error occurred while deleting.");
  }
};

const handleEdit = (item, isUpdate = false) => {
  const exists = editingBlocks.find(block => block._id === item._id);
  if (exists) return;

  const newBlock = {
    id: Date.now() + Math.random(),
    _id: item._id,
    eventNumber: item.eventNumber,
    title: item.title,
    description: item.description,
    category: item.category,
    date: item.eventDate ? item.eventDate.split('T')[0] : '',
    images: [item.imageUrl],
    isEditable: isUpdate
};

setEditingBlocks(prev => sortBlocksByEventNumber([...prev, newBlock]));
  setTimeout(() => {
  inputSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
}, 100);
};

const handleSaveChanges = async (id, block) => {
  const confirmUpdate = window.confirm("Are you sure you want to save the changes or update this blog?");
  if (!confirmUpdate) return;
  try {
    const item = {
      title: block.title,
      eventDate: block.date,
      category: block.category,
      description: block.description,
      eventNumber: block.eventNumber,
      image: block.images[0],
      imageUrl: typeof block.images[0] === 'string' ? block.images[0] : undefined
    };
    const result = await updateItems(id, item);
    console.log('Updated successfully:', result);
      showAlert('updated');
  } catch (err) {
    console.error('Error updating item:', err);
  }
};

const sortBlocksByEventNumber = (blocks) => {
  return [...blocks].sort((a, b) => Number(a.eventNumber) - Number(b.eventNumber));
};

const updateEventNumbersInDB = async (blocks) => {
  for (const block of blocks) {
    await updateItems(block._id, {
      title: block.title || "",
      eventDate: block.date || "", 
      category: block.category || "",
      description: block.description || "",
      eventNumber: block.eventNumber, 
      image: block.images?.[0] || "",
      imageUrl: typeof block.images?.[0] === 'string' ? block.images[0] : undefined
    });
  }
};

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 3;

const totalPages = Math.ceil(timelineItems.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const currentItems = timelineItems.slice(startIndex, startIndex + itemsPerPage);

const handleNext = () => {
  if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
};

const handlePrevious = () => {
  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
}

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20" ref={inputSectionRef}>

      <div className="flex justify-center mb-6 " >
        <button
          onClick={fetchTimelines} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Get All Timelines
        </button>
      </div>
     
      <div  className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Plus className="w-7 h-7" />
              Create Timeline Events
            </h2>
            <p className="text-red-100 mt-1">Add amazing moments to your timeline</p>
          </div>
          
          <div className="p-8 space-y-8 max-h-[800px] overflow-y-auto">
            {(editingBlocks.length > 0 ? sortBlocksByEventNumber(editingBlocks) : timelineBlocks).map((block, index) => (
              <div key={block.id} className="border-2 border-slate-200 rounded-xl p-6 space-y-6 relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-red-500" />
                    Event {block.eventNumber}
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
                <div className="group">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
                    <Tags className="w-5 h-5 text-red-500" />
                    Category
                  </label>
                  <select
                    value={block.category}
                    onChange={(e) => handleBlockChange(block.id, 'category', e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="About Us">About Us</option>
                    <option value="Support Us">Support Us</option>
                  </select>
                </div>
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
                <div className="group">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
                    <Image className="w-5 h-5 text-red-500" />
                    Upload Images
                  </label>
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

                  {block.images.length > 0 && (
                    <div className="flex flex-col items-start gap-4 mt-4">
                      <div className="relative group">
                        <img
                        src={
                            block.images[0] instanceof File
                              ? URL.createObjectURL(block.images[0])
                              : block.images[0]
                          }
                          alt="preview"
                          className="w-20 h-20 object-cover rounded-lg border-2 border-slate-200"
                          onClick={() => setExpandedImage(
                            block.images[0] instanceof File
                              ? URL.createObjectURL(block.images[0])
                              : block.images[0]
                          )}
                        />
                          <button
                            onClick={() => removeImageFromBlock(block.id, 0)}
                            className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-red-500 hover:text-white transition text-xs"
                            title="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                      </div>

                      <div className="w-full flex justify-center">
                        {block.isEditable ? (
                          <button
                            onClick={() => handleSaveChanges(block._id, block)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCreateTimeline(block.id, index)}
                            className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition ${loading || !!block._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading || !!block._id} // Disable if loading or in open mode (has _id)
                          >
                            {loading ? 'Creating...' : 'Create timeline'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {expandedImage && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center"
                onClick={() => setExpandedImage(null)}
              >
                <img
                  src={expandedImage}
                  alt="Expanded"
                  className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                />
              </div>
            )}
            {editingBlocks.length === 0 && (
              <button
                onClick={addNewBlock}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:from-slate-700 hover:to-slate-600 transition-all transform hover:scale-[1.02] shadow-lg border-2 border-dashed border-slate-300 hover:border-slate-400"
              >
                <Plus className="w-6 h-6" />
                Add More Blocks
            </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Eye className="w-7 h-7" />
              Live Preview
            </h2>
            <p className="text-slate-200 mt-1">See how your timeline will appear</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-white max-h-[800px] overflow-y-auto">
            {[...sortBlocksByEventNumber(editingBlocks), ...timelineBlocks].some(block => block.title || block.description || block.date || block.images.length > 0) ? (
              <div className="space-y-0 p-6">
                
                {[...sortBlocksByEventNumber(editingBlocks), ...timelineBlocks].map((block, index) => {
                const eventNum = Number(block.eventNumber) || index + 1;
                const isOddEvent = Number(block.eventNumber) % 2 === 1;
                  const hasContent = block.title || block.description || block.date || block.images.length > 0;
                  if (!hasContent) return null;

                  return (
                    <div key={block.id} className="grid md:grid-cols-[1fr_auto_1fr] min-h-[350px] items-stretch gap-4  sm:grid-cols-1 sm:min-h-[250px] sm:p-2 p-4 lg:gap-0 lg:p-0">
                      {isOddEvent ? (
                        <>
                          <div className="flex flex-col justify-center text-right pl-2">
                            <h3 className="text-sm font-semibold text-red-600 uppercase">
                              {block.title || "Untitled Event"}
                            </h3>
                            {block.date && (
                              <div className="text-right  mb-7">
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
                          <div className="px-4 py-5 flex justify-center pb-0 pt-0 ">
                            <div className="bg-gradient-to-b from-red-600 to-red-400 w-1 h-full shadow-md" />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            {block.images.length > 0 ? (
                              <div className="relative max-h-[300px] w-full">
                                <img
                                  src={block.images[0] instanceof File ? URL.createObjectURL(block.images[0]) : block.images[0]}
                                  alt="Main preview"
                                  className="object-cover w-full h-full"
                                />
                                <button
                                onClick={() => removeImageFromBlock(block.id || block._id, 0)}
                                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-80"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <div className="w-full h-[200px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                                <div className="text-center">
                                  <Image className="mx-auto mb-3 w-8 h-8" />
                                  <p className="font-medium text-sm">No image uploaded</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <hr className="sm:block lg:hidden w-full border-t border-slate-600 my-2" />
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col justify-center items-center">
                            {block.images.length > 0 ? (
                              <div className="relative max-h-[300px] w-full">
                                <img
                                  src={block.images[0] instanceof File ? URL.createObjectURL(block.images[0]) : block.images[0]}
                                  alt="Main preview"
                                  className="object-cover w-full h-full"
                                />
                                <button
                                  onClick={() => removeImageFromBlock(block.id || block._id, 0)}
                                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-80"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <div className="w-full h-[200px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                                <div className="text-center">
                                  <Image className="mx-auto mb-3 w-8 h-8" />
                                  <p className="font-medium text-sm">No image uploaded</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="px-4 py-5 flex justify-center pb-0 pt-0">
                            <div className="bg-gradient-to-b from-slate-700 to-slate-500 w-1 h-full shadow-md" />
                          </div>
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
                          <hr className="sm:block lg:hidden w-full border-t border-slate-600 my-2" />
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
        <div ref={timelineRef} className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Timeline Events</h2>

          <p className="text-sm text-gray-600 mb-4">
            Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, timelineItems.length)} of {timelineItems.length}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item, index) => (
              <div
                key={item._id}
                className="relative group bg-white border border-red-200 p-4 rounded-lg shadow transition-all overflow-hidden"
              >
                <div className="absolute -top-1 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-20">
                  {startIndex + index + 1}
                </div>

                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(item, false)}
                      className="bg-blue-600 text-white text-xs px-7 py-3 rounded shadow"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white text-xs px-7 py-3 rounded shadow"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(item, true)}
                      className="bg-green-600 text-white text-xs px-7 py-3 rounded shadow"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="group-hover:blur-sm transition-all">
                  <h3 className="text-lg font-bold text-red-600">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(item.eventDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt="event"
                      className="w-full mt-3 h-40 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white'
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default InfinitoTimelineAdmin;