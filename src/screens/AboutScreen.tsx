import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutScreen = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const animationContext = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        titleLineRef.current,
        { width: "0%", autoAlpha: 0 },
        {
          width: "100%",
          autoAlpha: 1,
          duration: 1.5,
          ease: "power3.inOut",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => animationContext.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      id="about"
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
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="relative -top-[40px] flex w-full flex-col items-center">
          <h1
            ref={titleRef}
            className="ClassicoBold text-2xl md:text-2xl lg:text-4xl font-bold
                 mb-[7px] text-center text-gray-300 opacity-0"
          >
            About Me
          </h1>
          <div
            ref={titleLineRef}
            className="h-1 w-0 rounded bg-gradient-to-r from-white to-gray-900 opacity-0"
          />
        </div>
        <h3
          className="text-lg text-gray-500 md:text-2xl z-50 lg:max-w-[45rem] max-w-[27rem] border-r border-b rounded border-gray-900  
        "
        >
            I’m a software engineer focused on building polished, production-oriented digital experiences. I enjoy working at the intersection
            of engineering, product design, and user experience—turning ideas into responsive interfaces and functional products.
            My experience spans React, React Native, Next.js, TypeScript, Supabase, API integration, and modern UI development.
            I’m particularly interested in frontend architecture, interaction design, performance, and building software that feels as good as it functions.
          
        </h3>
      </div>
      <div></div>
    </section>
  );
};

export default AboutScreen;
