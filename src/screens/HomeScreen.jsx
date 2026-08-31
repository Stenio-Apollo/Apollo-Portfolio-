/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const matrixRainColumns = Array.from({ length: 28 }, (_, index) => ({
  delay: (index % 9) * 0.75,
  duration: 7 + (index % 3),
  left: `${index * 3.5 + 1}%`,
}));

const matrixRainWords = ["RHODIE"];

const toVerticalRain = (word) => word.split("").join("\n");

const MatrixRain = ({
  className,
  delayMultiplier,
  durationOffset,
  repeatDelay,
  columnStep = 1,
}) => (
  <div
    className={`pointer-events-none absolute inset-y-0 z-20 overflow-hidden ${className}`}
    aria-hidden="true"
  >
    {matrixRainColumns
      .filter((_, index) => index % columnStep === 0)
      .map(({ delay, duration, left }, index) => (
      <motion.span
        key={left}
        initial={{ opacity: 0, y: "-30vh" }}
        animate={{ opacity: [0, 0.29, 0], y: "115vh" }}
        transition={{
          delay: delay * delayMultiplier,
          duration: duration + durationOffset,
          ease: "linear",
          repeat: Infinity,
          repeatDelay,
        }}
        className="absolute whitespace-pre-line text-xs leading-relaxed text-gray-500 md:text-sm lg:text-base"
        style={{ left }}
      >
        {Array.from({ length: 4 }, () =>
          toVerticalRain(matrixRainWords[index % matrixRainWords.length]),
        ).join("\n\n")}
      </motion.span>
      ))}
  </div>
);

const HomeScreen = () => {
  return (
    <section
      id="home"
      className="h-screen bg-gradient-to-b from-black to-gray-950 flex
        xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10
        relative overflow-hidden"
    >
      <MatrixRain
        className="left-0 w-1/2"
        delayMultiplier={1}
        durationOffset={0}
        repeatDelay={0.5}
        columnStep={1}
      />
      <MatrixRain
        className="right-0 w-[18%]"
        delayMultiplier={0.7}
        durationOffset={2}
        repeatDelay={0.8}
        columnStep={4}
      />

      <div className="z-40 w-[82%] max-w-[551px] xl:mb-0 mb-[20%]">
        <div className="relative -top-[33px]">
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
            className="ClassicoBold text-center text-3xl md:text-4xl lg:text-5xl font-bold z-10 mb-[7px]"
          >
            Rhodie
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.6 }}
            className="h-1 rounded bg-gradient-to-r from-white to-gray-900"
          />
        </div>

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
          className="text-lg md:text-lg lg:text-xl text-gray-500 border-r border-b rounded border-gray-800"
        >
          "The Rhodie promise is the promise to deliver robust, well-crafted production-ready mobile &
          web applications. Every project is backed with clean and concise
          codes, clear communication and commitment to aiding in you creative
          endeavors. So what're you waiting for? let's get this show on the
          'Rhode!'''
        </motion.p>
      </div>
      <Spline scene="https://prod.spline.design/UnwlUX6l4wDXbCbv/scene.splinecode" />
    </section>
  );
};

export default HomeScreen;
