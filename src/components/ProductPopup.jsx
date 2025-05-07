import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductPopup = ({ isOpen, onClose, product, onBuyNow }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen || !product) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-container") {
      onClose();
    }
  };

  const getImageUrl = (url) => {
    return url || "/images/placeholder.jpg";
  };

  return (
    <div
      id="popup-container"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md p-4 overflow-y-auto"
    >
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-700 hover:text-zinc-900 text-5xl font-bold z-50"
        >
          &times;
        </button>

        <Swiper
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="rounded-t-3xl"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={getImageUrl(img)}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 mb-2">
            {product.name}
          </h2>
          <p className="text-sm sm:text-base text-amber-600 font-medium mb-3">
            Category: {product.category}
          </p>
          <p className="text-neutral-600 text-base sm:text-lg mb-6">
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <span className="text-amber-700 text-xl sm:text-2xl font-semibold">
              Rs {product.price}
            </span>
            <button
              onClick={() => onBuyNow(product)}
              className="px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all text-base sm:text-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
