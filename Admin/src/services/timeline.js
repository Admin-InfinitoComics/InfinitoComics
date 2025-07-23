import axios from "axios";
import {BACKEND_URL} from '../Utils/constant'

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/timeline/getAll`);
    return response.data.data; 
  } catch (error) {
    console.error("Failed to fetch timeline items", error);
    return [];
  }
};

// API Call Function
export const addItems = async (block) => {
  const { title, eventDate, category, description, eventNumber, image } = block;

  // Validate all fields
  if (!title || !description || !eventDate || !category || !eventNumber || !image) {
    throw new Error("Please fill all fields in the block before submitting.");
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("eventDate", eventDate);
  formData.append("category", category);
  formData.append("description", description);
  formData.append("image", image);
  formData.append("eventNumber", String(eventNumber));
  console.log("inside the func")
  console.log(title, eventDate, category, description, eventNumber)

  const token = localStorage.getItem("authToken");

  const response = await axios.post(`${BACKEND_URL}/timeline/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response;
};

export const updateItems = async (id, item) => {
  const token = localStorage.getItem("authToken");
  const formData = new FormData();
  
  formData.append('title', item.title);
  formData.append('eventDate', item.eventDate);
  formData.append('category', item.category)
  formData.append('description', item.description);

  formData.append('eventNumber', String(item.eventNumber));

  // Handle optional image: if a new file is being uploaded
  if (item.image instanceof File) {
    formData.append('image', item.image); // backend expects req.file
  } else if (item.imageUrl) {
    formData.append('imageUrl', item.imageUrl); // use existing URL if no new file
  }

  try {
    const response = await axios.put(
      `${BACKEND_URL}/timeline/update/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};


export const deleteItems = async (id) => {
     const token = localStorage.getItem("authToken");
     console.log(token)
  try {
    const response = await axios.delete(`${BACKEND_URL}/timeline/delete/${id}`, {
      withCredentials: true, // in case you are using cookies for auth
      headers: {
        Authorization: `Bearer ${token}`, // ✅ CORRECT placement
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
