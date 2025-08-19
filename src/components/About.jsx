import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Title Animation
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: -300,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
  return (
    <section
      ref={sectionRef}
      className="h-screen relative overflow-hidden
      bg-gradient-to-b from-gray-950 to-black "
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* {stars} */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${10 + i * 3}px`,
              height: `${10 + i * 3} px`,
              backgroundColor: "white",
              opacity: 0.2 + Math.random() * 0.4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="'container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <h1
          ref={titleRef}
          className="ClassicoBold text-3xl md:text-4xl lg:text-5xl font-bold
              sm:mb-16 text-center text-white opacity-0 "
        >
          About Me
        </h1>
      </div>
      <div>
        <h3
          className="text-sm md:text-2xl ClassicoBold z-50 lg:max-w-[45rem] max-w-[27rem] 
        tracking-wider md:mt-20 sm:mt-[-40] mt-[-32rem]"
        ></h3>
      </div>
    </section>
  );
};

export default About;
