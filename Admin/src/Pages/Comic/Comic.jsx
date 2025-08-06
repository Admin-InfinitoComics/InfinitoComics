import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchComics, createComic, updateComic, deleteComic, getComicById } from '../../services/comicServices.js'
import { deleteChapter } from "../../services/comicChapServices.js";
import { showAlert } from "../../constants/sweetAlert";
const Comic = () => {
    const [comicData, setComicData] = useState({
        coverImg: "",
        title: "",
        authors: [""],
        releasedYear: ""
    });
    const [previewImg, setPreviewImg] = useState(null);
    const [comics, setComics] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedComicId, setSelectedComicId] = useState(null);

    const [visibleCount, setVisibleCount] = useState(4);
    const [chapters, setChapters] = useState([]);

    const token = localStorage.getItem("authToken");
    // console.log("Token from comic.jsx file: ", token);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComicData({ ...comicData, [name]: value });
    };

    const handleAuthorsChange = (index, value) => {
        const updatedAuthors = [...comicData.authors];
        updatedAuthors[index] = value;
        setComicData({ ...comicData, authors: updatedAuthors });
    };

    //fetch all comics
    const fetchAllComics = async () => {
        try {
            const res = await fetchComics();
            setComics(res.data);
        } catch (err) {
            toast.error("Error in fetching the comics!")
            console.error("Fetch error:", err);
        }
    };

    //handle delete comic
    const handleDelete = async (id, token) => {
        try {
            const deletedComic = await deleteComic(id, token);
            console.log("Deleted Comic: ", deletedComic);
            toast.success("Comic deleted successfully!")
            fetchAllComics();
        } catch (err) {
            console.error(err);
        }
    };

    //filing the form fields on edit
    const handleEdit = (comic) => {
        setComicData({
            ...comic,
            coverImg: comic.coverImg,
        });
        setPreviewImg(comic.coverImg);
        setSelectedComic(comic);
        setSelectedComicId(comic._id);
    };


    //Reset function to clear inputs
    const resetForm = () => {
        setComicData({
            coverImg: "",
            title: "",
            authors: [""],
            releasedYear: ""
        });
        setPreviewImg(null);
        setSelectedComic(null);
    };

    //update and create handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comicData.title || !comicData.releasedYear || comicData.authors.length === 0 || !comicData.coverImg) {
            toast.error("Please fill in all the fields");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", comicData.title);
            formData.append("releasedYear", comicData.releasedYear);
            formData.append("authors", JSON.stringify(
    comicData.authors.map(a => a.trim()).filter(Boolean)
));


            if (comicData.coverImg instanceof File) {
                formData.append("coverImg", comicData.coverImg);
            } else if (typeof comicData.coverImg === "string") {
                formData.append("coverImg", comicData.coverImg);
            }

            if (selectedComic) {
                await updateComic(selectedComicId, formData, token);
                toast.success("Comic updated successfully!");
            } else {
                await createComic(formData, token);
                toast.success("Comic created successfully!");
            }

            fetchAllComics();
            resetForm();
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            toast.error("Something went wrong!");
        }
    };

    const addAuthorField = () => {
        setComicData({ ...comicData, authors: [...comicData.authors, ""] });
    };

    const removeAuthorField = (index) => {
        const updatedAuthors = [...comicData.authors];
        updatedAuthors.splice(index, 1);
        setComicData({ ...comicData, authors: updatedAuthors });
    };


    useEffect(() => {
        fetchAllComics();
    }, []);

    const handleDeleteChapter = async (comicId, chapterId) => {
      if (!window.confirm("Are you sure you want to delete this chapter?")) return;
    
      try {
        await deleteChapter(comicId, chapterId);
        setChapters((prevChapters) =>
          prevChapters.filter((chap) => chap._id !== chapterId)
        );
        showAlert("deleted"); 
      } catch (err) {
        console.error("Error deleting chapter:", err);
        alert("Failed to delete chapter.");
      }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-8 text-black pt-28">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 drop-shadow-md">
                        Comic Management Dashboard
                    </h1>
                    <p className="mt-2 text-lg md:text-xl text-gray-600">
                        Effortlessly manage your comic series — add, edit, preview and publish.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-40">
                    {/* Form Section */}
                    <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg space-y-6 border border-red-200">
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">
                            {selectedComic ? "Edit Comic" : "Add New Comic"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="file"
                                name="coverImg"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setComicData({ ...comicData, coverImg: file });
                                        setPreviewImg(URL.createObjectURL(file));
                                    }
                                }}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-red-400"
                            />

                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={comicData.title}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-red-400"
                            />

                            <input
                                type="number"
                                name="releasedYear"
                                placeholder="Released Year"
                                value={comicData.releasedYear}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-red-400"
                            />

                            {comicData.authors.map((author, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder={`Author ${index + 1}`}
                                        value={author}
                                        onChange={(e) => handleAuthorsChange(index, e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-red-400"
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAuthorField(index)}
                                            className="text-red-500 hover:text-red-700 font-bold"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addAuthorField}
                                className="text-sm text-red-600 hover:underline mt-1"
                            >
                                + Add Author
                            </button>



                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-2 font-semibold rounded hover:bg-red-700 transition"
                            >
                                {selectedComic ? "Update Comic" : "Create Comic"}
                            </button>
                        </form>
                    </div>

                    {/* Live Preview */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center  rounded-xl shadow-lg border border-gray-200 p-4 bg-white">
                        <div className="w-[15.7rem] bg-white ">
                            <img
                                src={
                                    previewImg ||
                                    (typeof comicData.coverImg === "string" && comicData.coverImg) ||
                                    "/fallback.jpg"
                                }
                                alt="Cover Image"
                                className="w-[15.5rem] h-[21rem] object-cover shadow-md"
                            />
                            <h3 className="text-sm font-semibold mt-3 tracking-wide">
                                {comicData.title || "Comic Title"}{" "}
                                {comicData.releasedYear && `(${comicData.releasedYear})`}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0 tracking-wide">
                                {comicData.authors.filter(Boolean).length > 0
                                    ? comicData.authors.join(", ")
                                    : "Author(s)"}
                            </p>

                        </div>
                    </div>
                </div>

                {/* All Comics */}
                <div className="max-w-6xl mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg border border-red-200">
                    <h2 className="text-2xl font-semibold text-red-700 mb-6">All Comics Preview</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...comics].reverse().slice(0, visibleCount).map((comic) => (
                            <div key={comic._id} className="w-[15.5rem]">
                                <img
                                    src={comic.coverImg}
                                    alt="Cover"
                                    className="w-[15.5rem] h-[21rem] object-cover shadow-md"
                                />
                                <h3 className="text-sm font-semibold mt-2 tracking-wide">
                                    {comic.title}{" "}
                                    {comic.releasedYear && `(${comic.releasedYear})`}
                                </h3>
                                <p className="text-xs text-gray-600  font-medium">
                                    <span className="text-gray-700">Authors:</span> {comic.authors.join(", ")}
                                </p>
                                <div className="relative group inline-block">
                                <div className="cursor-pointer transition-all duration-200 rounded-md px-2 py-1 group-hover:bg-blue-50 inline-flex items-center">
                                    <p className="text-xs text-gray-600 font-medium group-hover:text-blue-700 transition-colors">
                                    <span className="text-gray-700 group-hover:text-blue-800">Chapters:</span> {comic.chapters.length}
                                    </p>
                                </div>
                                {comic.chapters.length > 1 && (
                                    <div className="absolute top-0 left-full ml-2 bg-white shadow-xl border border-gray-400 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 whitespace-nowrap">
                                    <button
                                       onClick={() => navigate(`/comicChap/${comic._id}/chapters`, { state: { comic } })}
                                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-500 text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-1 "
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View All
                                    </button>
                                    </div>
                                )}
                                {comic.chapters.length === 1 && (
                                    <div className="absolute top-full left-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-10 min-w-48">
                                    <div className="space-y-2">
                                        <button
                                        onClick={() => { 
                                            localStorage.setItem("selectedComic", JSON.stringify(comic)); 
                                            navigate(`/chapters/${comic.chapters[0]._id}/open`, { 
                                                state: { chap: comic.chapters[0], comicId: comic._id } 
                                            }); 
                                        }}
                                        className="w-full px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                                        >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Open Chapter
                                        </button>
                                        
                                        <button
                                        onClick={() => navigate(`/chapters/${comic.chapters[0]._id}/edit`, { state: { chap: comic.chapters[0], comicId: comic._id } })}
                                        className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                                        >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Chapter
                                        </button>
                                        
                                        <button
                                        onClick={() => {
                                           handleDeleteChapter(comic._id, comic.chapters[0]._id);
                                        }}
                                        className="w-full px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                                        >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Chapter
                                        </button>
                                    </div>
                                    <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                                    </div>
                                )}
                                </div>
                                <div className="flex gap-1  mt-4 ">
                                    <button
                                        onClick={() => handleEdit(comic)}
                                        className="px-3 py-1 border-2 border-red-600 text-red-600 bg-white  hover:bg-red-600 hover:text-white font-semibold transition"
                                    >
                                        Edit
                                    </button>
                                    <div className="relative inline-block">
                                        <button
                                            onClick={() => {
                                                setShowPopup(true);
                                                setSelectedComicId(comic._id);
                                            }}
                                            className=" border-2 border-red-600 text-red-600 bg-white  hover:bg-red-600 hover:text-white font-semibold py-1 px-3 transition"
                                        >
                                            Delete
                                        </button>

                                        {/* POP UP  */}
                                        {showPopup && selectedComicId === comic._id && (
                                            <div className="absolute w-[14rem] -top-[18rem] -left-[3rem] rounded shadow-md p-3 z-50 bg-white/80 backdrop-blur-sm font-bold border-2 border-red-100">
                                                <p className="text-sm text-red-500  mb-3">Are you sure you want to delete this comic?</p>
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            handleDelete(comic._id);
                                                            setShowPopup(false);
                                                        }}
                                                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={() => setShowPopup(false)}
                                                        className="text-red-600 bg-white border-2 border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded text-sm font-bold"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                   <button
                                    onClick={() => {
                                        localStorage.setItem("selectedComic", JSON.stringify(comic));
                                        navigate(`/comic/${comic._id}/chapters`, {
                                        state: { comic }, 
                                        });
                                    }}
                                    className="flex-1 border-2 border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white font-semibold py-1 px-1 transition"
                                    >
                                    Add Chapter
                                    </button>
                                </div>


                            </div>
                        ))}



                    </div>
                    {visibleCount < comics.length && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 4)}
                                className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                            >
                                View More
                            </button>
                        </div>
                    )}
                    {visibleCount >= comics.length && (
                        <>
                            <p className="italic text-gray-500 text-center mt-10">All comics loaded!</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Comic;
