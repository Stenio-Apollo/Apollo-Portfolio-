/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { a } from "framer-motion/client";
import { FiGithub } from "react-icons/fi";

const Header = () => {
  return (
    <header
      className="absolute w-full z-50 transition-all
      duration-300"
    >
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16
      md:h-20"
      >
        {/* logo/Namem */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <div
            className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray 
            flex items-center justify-center text-red-100 fon-bold text-xl mr-3"
          >
            C
          </div>
          <span
            className="text-xl font-bold bg-gradient-to-r from-gray-500
           to-gray-700 bg-clip-text text-transparent "
          >
            Cheyene
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="lg:flex hidden space-x-8">
          {["Home", "About", "Projects", "Digital Foot-Print"].map(
            (item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.7 + index * 0.2,
                }}
                className="relative text-gray-900 dark:text-gray-200 
                          hover:white-600 dark:hover:text-violet-300 font-medium
                          transition-colors duration-300 group "
                href="#"
              >
                {item}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5
                          bg-violet-300 group-hover:w-full transition-all duration-300"
                ></span>
              </motion.a>
            )
          )}
        </nav>
        
        {/* social icons */}
        <div className="md:flex hidden items-center space-x-4"></div>
        
        <motion.a className="tet-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300" href="#">
          <FiGithub className="w-5 h-5"/>
        </motion.a>
      </div>
    </header>
  );
};

export default Header;
