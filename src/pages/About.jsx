import React from "react";

const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh]">
        <img
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Showroom background"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            About Metwood Crafts
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-2xl">
            Crafting timeless furniture with passion and precision
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-800 mb-6">
            Our Story
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Founded with a passion for handcrafted excellence, Metwood Crafts
            has been bringing timeless designs to homes across the world. Our
            artisans carefully select the finest materials, ensuring that each
            piece tells a story of tradition, craftsmanship, and attention to
            detail. We believe furniture is more than just functional — it's a
            reflection of your lifestyle and values.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-amber-700 mb-4">
              Our Vision
            </h3>
            <p className="text-neutral-600">
              To be a global symbol of authenticity and luxury in handcrafted
              furniture, inspiring spaces where memories are made.
            </p>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-amber-700 mb-4">
              Our Mission
            </h3>
            <p className="text-neutral-600">
              Delivering exceptional craftsmanship, sustainable materials, and
              personalized service to our customers, while preserving the art of
              fine woodworking.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-amber-50 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12">
          {/* Info */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-800 mb-6">
              Visit Our Showroom
            </h2>
            <p className="text-neutral-600 text-lg">
              Explore our latest collections at our flagship location, where
              craftsmanship meets comfort.
            </p>
            <div className="text-neutral-700 space-y-2">
              <p>
                <strong>Address:</strong> Lakeside Street, Pokhara 33700
              </p>
              <p>
                <strong>Email:</strong> metwood@gapl.co
              </p>
              <p>
                <strong>Phone:</strong> +977 061533529 , +977 9856025325
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 rounded-3xl overflow-hidden shadow-lg">
            <iframe
              title="Metwood Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.816141876702!2d83.96822307585042!3d28.212898075896444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995955ec3489503%3A0x743be176a0a1c5e0!2sMetwood%20Crafts!5e0!3m2!1sen!2snp!4v1745920263759!5m2!1sen!2snp"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
