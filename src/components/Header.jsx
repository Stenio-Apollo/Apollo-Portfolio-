/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { motion, scale } from "framer-motion";
import { a } from "framer-motion/client";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

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
                          hover:white-600 dark:hover:text-teal-200 font-medium
                          transition-colors duration-300 group "
                href="#"
              >
                {item}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5
                          bg-teal-200 group-hover:w-full transition-all duration-300"
                ></span>
              </motion.a>
            )
          )}
        </nav>

        {/* social icons */}
        <div className="md:flex hidden items-center space-x-9">
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="tet-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
            href="#"
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="tet-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
            href="#"
          >
            <FiTwitter className="w-5 h-5" />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="tet-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
            href="#"
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Hire Me Button */}

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.6,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 3,
          }}
          className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r
          from-teal-500 to-gray-900 text-gray-300 font-bold
          hover:form-violet-700 hover:to-teal-600 hover:text-white
          transition-all duration 500 "
        >
          Book Me
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
