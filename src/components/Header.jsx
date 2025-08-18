/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { motion, scale, AnimatePresence } from "framer-motion";
import { a, div } from "framer-motion/client";
import { FiGithub, FiTwitter, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  // toggle menu open/close
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // State to track if the contact form is open
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  return (
    <header
      className="absolute w-full z-50 transition-all
      duration-300"
    >
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-9 flex items-center justify-between h-16
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
            className="h-10 w-10 rounded-xl border
            flex items-center justify-center text-white fon-bold text-xl mr-3"
          >
            Rh
          </div>
          <span className="text-l text-white">Rhodie</span>
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
                          hover:white-600 dark:hover:text-white font-medium
                          transition-colors duration-300 group "
                href="#"
              >
                {item}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5
                          bg-white group-hover:w-full transition-all duration-300"
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
            className="tet-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors duration-300"
            href="#"
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="tet-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors duration-300"
            href="#"
          >
            <FiTwitter className="w-5 h-5" />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="tet-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors duration-300"
            href="#"
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>

          {/* Hire Me Button */}

          <motion.button
            onClick={openContactForm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.6,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 3,
            }}
            className="px-4 py-2 rounded-lg bg-black text-white bg-transparent border border-white hover:bg-cyan-300 hover:border-cyan-300 hover:text-black transition-all duration-300"
          >
            Let's Build
          </motion.button>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.7 }}
            onClick={toggleMenu}
            className="text-gray-300"
          >
            {isOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>
      {/* Mobile Nav */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.5 }}
        className="md:hidden overflow-hidden bg-white dark:bg-black shadow-lg
              px-4 py-5 space-y-5 "
      >
        <nav className="flex flex-col space-y-3">
          {["Home", "About", "Projects", "Digital Foot-Print"].map((item) => (
            <a
              onClick={toggleMenu}
              className="font-medium py-2"
              key={item}
              href="#"
            >
              {item}
            </a>
          ))}
        </nav>
        <div
          className="pt-4 border-t border-gray-200
              dark;border-gray-700"
        >
          <div className="flex space-x-5 ">
            <a href="#">
              <FiGithub className="h-5 w-5 " />
            </a>
            <a href="#">
              <FiTwitter className="h-5 w-5 " />
            </a>
            <a href="#">
              <FiLinkedin className="h-5 w-5 " />
            </a>
          </div>
          <button
            onClick={() => {
              toggleMenu();
              openContactForm();
            }}
            className="mt-4 block w-full px-4 py-2 rounded-lg bg-black text-white bg-transparent border border-white hover:border-cyan-500 transition-all duration-300"
          >
            Let's Build
          </button>
        </div>
      </motion.div>
      {/* Contact Form */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 bg-black/50 
              background-blur-sm z-50 flex 
              items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
                duration: 0.9,
              }}
              className="bg-black 
                  rounded-xl shadow-xl w-full max-w-md p-6 border "
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">Get in Touch</h1>

                <motion.button onClick={closeContactForm}>
                  <FiX className="w-5 h-5 font-extrabold text-white" />
                </motion.button>
              </div>
              {/* input forms */}
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2
                  focus:border-white bg-white text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    placeholder="Enter email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2
                  focus:border-white bg-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Message"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    id="Message"
                    placeholder="How may I assist you?"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2
                  focus:border-stone-200 bg-black"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.99 }}
                  className="mt-4 block w-full px-4 py-2 rounded-lg bg-black text-white bg-transparent border border-white hover:bg-rose-300 hover:text-black hover:border-rose-700 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
