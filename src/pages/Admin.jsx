import React, { useState, useEffect } from "react";
import axios from "axios";

// Backend API base URL (Render)
const SERVER_URL = "http://localhost:5000";

// Cloudinary config
const CLOUD_NAME = "djmu2d1nz"; // 👈 Your Cloudinary cloud name (from earlier)
const UPLOAD_PRESET = "unsigned_preset"; // 👈 Your Cloudinary upload preset

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    previews: [],
  });

  // Fetch items on load
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewItem((prev) => ({ ...prev, images: files, previews }));
  };

  // Upload images to Cloudinary
  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      uploadedUrls.push(res.data.secure_url);
    }

    return uploadedUrls;
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (newItem.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      // Upload images first
      const uploadedImageUrls = await uploadImagesToCloudinary(newItem.images);

      // Send item data + image URLs to backend
      const itemData = {
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        category: newItem.category,
        images: uploadedImageUrls, // Cloudinary URLs here
      };

      const res = await axios.post(`${SERVER_URL}/api/items`, itemData);
      setItems((prev) => [...prev, res.data]);

      // Reset form
      setNewItem({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
        previews: [],
      });

      alert("Item added successfully!");
    } catch (err) {
      console.error("Add error:", err);
      alert("Failed to add item.");
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/api/items/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Admin Panel</h1>

      {/* Add Item Form */}
      <section className="bg-white p-6 rounded-2xl shadow-lg mb-16">
        <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleAddItem}
        >
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleInputChange}
            className="border rounded-lg p-3"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newItem.category}
            onChange={handleInputChange}
            className="border rounded-lg p-3"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (Rs)"
            value={newItem.price}
            onChange={handleInputChange}
            className="border rounded-lg p-3"
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="border rounded-lg p-3"
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={newItem.description}
            onChange={handleInputChange}
            className="border rounded-lg p-3 md:col-span-2 h-32 resize-none"
            required
          />

          {newItem.previews.length > 0 && (
            <div className="md:col-span-2 flex space-x-4">
              {newItem.previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  className="h-24 w-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition md:col-span-2"
          >
            Add Item
          </button>
        </form>
      </section>

      {/* Manage Items */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Manage Items</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
            >
              {item.images && item.images.length > 0 && (
                <div className="flex space-x-2 mb-4 overflow-x-auto">
                  {item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img} // Cloudinary URL directly
                      alt={`Item ${item.name} ${idx}`}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-lg text-amber-700 font-semibold">
                  Rs {item.price}
                </p>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>

              <button
                onClick={() => handleDeleteItem(item._id)}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
