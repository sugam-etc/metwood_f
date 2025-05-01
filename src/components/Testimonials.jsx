import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Metwood's craftsmanship transformed our living space. The attention to detail is unmatched.",
      author: "Sarah Johnson",
      role: "Homeowner",
    },
    {
      quote:
        "As an interior designer, I exclusively specify Metwood for my high-end clients. Their quality is exceptional.",
      author: "Michael Chen",
      role: "Interior Designer",
    },
    {
      quote:
        "The dining table we purchased has become the centerpiece of our family gatherings. Worth every penny.",
      author: "The Rodriguez Family",
      role: "Customers",
    },
  ];

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-zinc-900 text-center mb-12">
          What Our Clients Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto text-center relative overflow-hidden">
                {/* Quotation Icon */}
                <FaQuoteLeft className="text-6xl text-amber-100 absolute top-5 left-5 opacity-30" />

                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-500 text-xl mx-0.5" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-lg italic mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div>
                  <p className="text-zinc-800 font-semibold text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
