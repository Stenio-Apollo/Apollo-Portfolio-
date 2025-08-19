import { useEffect } from "react";
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CustomCursor from "./components/CustomCursor";
import About from "./components/About";
import ProjectSection from "./components/projectSection";
export default function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((trigger)=> trigger.kill())
    }
  }, [])

  return (
    <>
      <Header />
      <HeroSection />
      <CustomCursor />
      <About />
      <ProjectSection />
      
    </>
  )
}