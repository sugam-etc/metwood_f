import React from "react";
import Hero from "../components/Hero";
import Collection from "../components/Collection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <Collection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
