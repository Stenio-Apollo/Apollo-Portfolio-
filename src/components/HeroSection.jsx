/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  return (
    <section
      className="h-screen bg-gradient-to-b from-black to-gray-950 flex
        xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10
        relative overflow-hidden"
    >
      {/* left Section */}
      <div className="z-40 xl:mb-0 mb-[20%]">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.9,
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold z-10 mb-6"
        >
          building Fast <br /> Reliable Results
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.8,
            duration: 1.9,
          }}
          className="text-xl md:text-1xl lg:text-2xl text-gray-500 max-w-2xl"
        >
          I deliver robust, production-ready mobile & web applications. Every
          project is backed by clean and concise codes, clear communication and
          commitment to aiding in you creative endeavors.
        </motion.p>
      </div>
      {/* Right Section */}
        <Spline scene="https://prod.spline.design/UnwlUX6l4wDXbCbv/scene.splinecode" />
    </section>
  );
};

export default HeroSection;
