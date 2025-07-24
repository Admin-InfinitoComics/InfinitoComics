import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



function Characters() {
    const api = `${import.meta.env.VITE_BASE_URL}/timeline`;

    const [timelines, setTimelines] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        eventDate: '',
        imageUrl: '',
        imageFile: null,
        pageContext: 'support',
        _id: null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [showForm, setShowForm] = useState(false);


    const fetchTimelines = async () => {
        try {
            const res = await axios.get(`${api}/getAll`);
            setTimelines(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch timelines');
        }
    };

    useEffect(() => {
        fetchTimelines();
    }, []);

    const createTimeline = async () => {
        try {
            toast.success("toast open");
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('eventDate', form.eventDate);
            formData.append('pageContext', form.pageContext);

            if (form.imageFile && form.pageContext === 'support') {
                formData.append('imageUrl', form.imageFile);
            }

            await axios.post(`${api}/create`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Timeline created');
            resetForm();
            fetchTimelines();
        } catch (error) {
            toast.error('Creation failed');
        }
    };

    const handleConfirmDelete = async (id) => {
        try {
            await axios.delete(`${api}/delete/${id}`);
            toast.success('Deleted successfully');
            setConfirmDeleteId(null);
            fetchTimelines();
        } catch (error) {
            toast.error('Delete failed');
            setConfirmDeleteId(null);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, imageFile: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let msg = isEditing ? "Changes saved Successfully!" : "Timeline Created Successfully!";
        toast.success(msg);
        isEditing ? updateTimeline() : createTimeline();
    };

    const updateTimeline = async () => {
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('eventDate', form.eventDate);
            formData.append('pageContext', form.pageContext);
            if (form.imageFile && form.pageContext === 'support') {
                formData.append('imageUrl', form.imageFile);
            }

            await axios.put(`${api}/update/${form._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Timeline updated');
            resetForm();
            fetchTimelines();
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const handleEdit = (timeline) => {
        setForm({ ...timeline, eventDate: timeline.eventDate?.slice(0, 10) });
        setIsEditing(true);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setForm({
            title: '',
            description: '',
            eventDate: '',
            imageUrl: '',
            imageFile: null,
            pageContext: 'support',
            _id: null
        });
        setIsEditing(false);
    };

    console.log("Form: ", form);

    return (
        <div className="p-4 w-11/12 lg:w-2/3 mx-auto relative bg-white/30 backdrop-blur-sm mt-6">
            <Toaster />

            <h1 className="text-2xl text-center font-bold text-red-600 mb-4 mt-16 tracking-widest">TIMELINE MANAGER</h1>

            <div className=" flex justify-center items-center pb-6 pt-3">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mb-4 tracking-widest "
                >
                    + CREATE
                </button>
            </div>

            {/* form */}
            {showForm && (
                <div className="relative  shadow-md rounded p-4 mb-6 space-y-1 border border-red-600">

                    {/* Close button */}
                    <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-1 right-1 text-white bg-red-600 hover:bg-red-700 font-bold text-xl px-2"
                        title="Close form"
                    >
                        &times;
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-2.5 text-sm text-gray-700">

                        <div className="flex flex-col space-y-0.5 ">
                            <label className="font-semibold text-red-600" htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                                className="w-full border border-grey-500 py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-0.5">
                            <label className="font-semibold text-red-600" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                placeholder="Enter description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                required
                                className="w-full border border-grey-500 py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                rows={3}
                            />
                        </div>


                        <div className="flex justify-between items-center gap-4 ">
                            <div className="w-1/2 flex flex-col space-y-0.5">
                                <label className="font-semibold text-red-600" htmlFor="eventDate">Event Date</label>
                                <input
                                    id="eventDate"
                                    type="date"
                                    value={form.eventDate}
                                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                                    required
                                    className="w-full border border-grey-500 py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col space-y-0.5">
                                <label className="font-semibold text-red-600" htmlFor="pageContext">Page Context</label>
                                <select
                                    id="pageContext"
                                    disabled={isEditing}
                                    value={form.pageContext}
                                    onChange={(e) => setForm({ ...form, pageContext: e.target.value })}
                                    required
                                    className="w-full border border-grey-500 py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                >
                                    <option value="about">About</option>
                                    <option value="support">Support</option>
                                </select>
                            </div>

                        </div>
                        <div className=" flex flex-col space-y-0.5">
                            <label className="font-semibold text-red-600" htmlFor="imageUrl">Upload Image</label>
                            <input
                                id="imageUrl"
                                type="file"
                                accept="image/*"
                                name="imageUrl"
                                onChange={handleImageUpload}
                                disabled={form.pageContext !== 'support'}
                                className="w-full border border-grey-500 py-1 px-4 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                style={{
                                    backgroundColor: form.pageContext !== 'support' ? '#f3f4f6' : 'white',
                                    cursor: form.pageContext !== 'support' ? 'not-allowed' : 'pointer',
                                }}
                            />
                        </div>



                        {form.imageFile && (
                            <img
                                src={URL.createObjectURL(form.imageFile)}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                            />
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 transition"
                            >
                                {isEditing ? 'Update' : 'Create'}
                            </button>


                        </div>
                    </form>

                </div>
            )}


            <h1 className='tracking-widest text-red-600 text-2xl text-center font-bold bg-gray-200 py-3'>ALL TIMELINES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 px-6 py-10">
                {[...timelines].reverse().map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out relative hover:border-2 hover:border-red-600 hover:cursor-pointer p-[2px] hover:p-0 hover:scale-105"
                    >
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-red-600 mb-2">{item.title}</h2>
                            <p className="text-gray-700 text-sm line-clamp-3">{item.description}</p>
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                <span>
                                    {new Date(item.eventDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })} • {item.pageContext}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-xs text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded tracking-widest "
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        onClick={() => setConfirmDeleteId(item._id)}
                                        className="text-xs text-red-600 px-3 py-1 rounded hover:text-white hover:bg-red-600 border border-red-600 tracking-widest"
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Delete Popup */}
                        {confirmDeleteId === item._id && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-600  p-5 rounded z-50 shadow-xl w-64 tracking-widest bg-white/30 backdrop-blur-sm ">
                                <p className="text-sm font-extrabold text-center text-red-600 mb-3 ">
                                    Confirm delete?
                                </p>
                                <div className="flex justify-center gap-3 font-bold">
                                    <button
                                        onClick={() => handleConfirmDelete(item._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-3 py-1 border-2 border-red-600 text-red-600 hover:text-white text-bold rounded text-sm hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Characters;
