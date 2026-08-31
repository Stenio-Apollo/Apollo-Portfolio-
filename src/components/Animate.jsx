
import Spline from "@splinetool/react-spline";


const Animate = () => {
  return (
   <section className="h-screen w-screen flex
        xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10
        relative overflow-hidden">
      {/* Right Section */}
           <Spline className="absolute xl: right-0 top-[10%] lg:top-13 h-screen w-screen" scene="https://prod.spline.design/D8L467zVO9RYJ38e/scene.splinecode" />
    </section>
  )
}

export default Animate