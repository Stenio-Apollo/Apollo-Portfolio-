import { useEffect } from "react";
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import ContactSection from "./components/ContactSection";
import ProgressBar from "./components/ProgressBar";
import Footer from "./components/Footer";
import Animate from "./components/Animate";
import BrandCarousel from "./components/BrandCarousel";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
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
      <HomeScreen />
      <BrandCarousel />
      <CustomCursor />
      <AboutScreen />
      <ProjectsScreen />
      <ContactSection />
      <ProgressBar />
      <Animate />
      <Footer />
    
    </>
  )
}
