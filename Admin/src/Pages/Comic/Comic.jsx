import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchComics, createComic, updateComic, deleteComic, getComicById } from '../../services/comicServices.js'

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
                                    "https://via.placeholder.com/300x400?text=Preview"
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
                                <p className="text-xs text-gray-600 font-medium">
                                    <span className="text-gray-700">Chapters:</span> {comic.chapters.length}
                                </p>
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
                                        onClick={() => navigate(`${comic._id}/chapters`)}
                                        className="flex-1 border-2 border-red-600 text-red-600 bg-white  hover:bg-red-600 hover:text-white font-semibold py-1 px-1 transition"
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
