import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import ProductPopup from "../components/ProductPopup";
import PurchasePopup from "../components/CartPopup";

const SERVER_URL = "http://localhost:5000";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/items`);
        setProducts(response.data);
        const uniqueCategories = [
          "All",
          ...new Set(response.data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  const openPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const openPurchasePopup = () => {
    setIsPopupOpen(false);
    setIsPurchaseOpen(true);
  };

  const closePurchasePopup = () => {
    setIsPurchaseOpen(false);
    setSelectedProduct(null);
  };

  const getImageUrl = (url) => {
    return url || "/images/placeholder.jpg";
  };

  return (
    <div className="min-h-screen bg-amber-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-neutral-600">
            Discover furniture that combines craftsmanship and beauty.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-amber-700 text-white border-amber-700"
                  : "bg-white text-zinc-700 border-neutral-300 hover:bg-amber-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search furniture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-zinc-700 shadow-sm"
          />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <img
                  src={getImageUrl(product.images?.[0])}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="p-5 flex flex-col">
                  <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                    {product.name}
                  </h2>
                  <span className="text-amber-700 font-medium text-lg mb-4">
                    Rs {product.price}
                  </span>
                  <button
                    onClick={() => openPopup(product)}
                    className="py-2 px-5 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-neutral-500">
              No products found.
            </p>
          )}
        </div>
      </div>

      {/* Product Popup */}
      <ProductPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        product={selectedProduct}
        onBuyNow={openPurchasePopup}
      />

      {/* Purchase Popup */}
      <PurchasePopup
        isOpen={isPurchaseOpen}
        onClose={closePurchasePopup}
        product={selectedProduct}
      />
    </div>
  );
};

export default Store;
