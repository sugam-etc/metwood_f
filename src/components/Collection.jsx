import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import img2 from "../assets/Images/img2.JPG";
import img1 from "../assets/Images/img1.JPG";
import img3 from "../assets/Images/img3.JPG";
import img4 from "../assets/Images/img4.JPG";
import img5 from "../assets/Images/img5.JPG";
import img6 from "../assets/Images/img6.jpg";
import img7 from "../assets/Images/img7.jpg";
import img8 from "../assets/Images/img8.jpg";
import img9 from "../assets/Images/img9.jpg";

const furnitureCollection = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img6 },
  { id: 7, image: img7 },
  { id: 8, image: img8 },
  { id: 9, image: img9 },
];

const Collection = () => {
  return (
    <section className="relative bg-amber-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-light text-zinc-900 tracking-tight">
            Crafted with Heart
          </h2>
          <p className="mt-4 text-xl text-neutral-700">
            Experience timeless beauty through every piece
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          //   loop={true}
          speed={800}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {furnitureCollection.map((item) => (
            <SwiperSlide key={item.id} className="max-w-xs">
              <div
                className="rounded-3xl overflow-hidden 
              will-change: transform;
backface-visibility: hidden;
transform: translateZ(0);
              shadow-lg hover:shadow-2xl transition-shadow duration-500 will-change-transform"
              >
                <img
                  src={item.image}
                  alt={`Furniture ${item.id}`}
                  className="object-cover w-full h-96"
                  loading="lazy"
                  width={384}
                  height={384}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View Full Collection Button */}
        <div className="mt-16 text-center">
          <Link
            to="/store"
            className="inline-block px-10 py-4 bg-zinc-700 text-white text-lg font-normal rounded-full shadow-lg hover:bg-neutral-800 hover:scale-105 transition-all duration-300 will-change-transform"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collection;
