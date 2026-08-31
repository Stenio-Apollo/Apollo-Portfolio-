/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { motion, scale, AnimatePresence } from "framer-motion";
import { a, div } from "framer-motion/client";
import { FiGithub, FiInstagram, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];
const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Stenio-Apollo",
    Icon: FiGithub,
    className:
      "tet-gray-700 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors duration-300",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stenio_ii/",
    Icon: FiInstagram,
    className:
      "tet-gray-700 dark:text-gray-300 hover:text-rose-400 dark:hover:text-rose-400 transition-colors duration-300",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stenio-gerlin-44119829a/",
    Icon: FiLinkedin,
    className:
      "tet-gray-700 dark:text-gray-300 hover:text-teal-400 dark:hover:text-teal-400 transition-colors duration-300",
  },
];
const contactEmail = "s3.gerlin@gmail.com";

const Header = () => {
  // toggle menu open/close
  const [isOpen, setIsOpen] = useState(false);
  const [isDigitalFootprintOpen, setIsDigitalFootprintOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((menuIsOpen) => !menuIsOpen);
    setIsDigitalFootprintOpen(false);
  };
  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsDigitalFootprintOpen(false);
  };
  const toggleDigitalFootprint = () => {
    setIsDigitalFootprintOpen((digitalFootprintIsOpen) => !digitalFootprintIsOpen);
  };

  // State to track if the contact form is open
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  useEffect(() => {
    const handleContactFormOpen = () => setContactFormOpen(true);

    window.addEventListener("rhodie:open-contact-form", handleContactFormOpen);

    return () =>
      window.removeEventListener("rhodie:open-contact-form", handleContactFormOpen);
  }, []);

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const visitorName = formData.get("name");
    const visitorEmail = formData.get("email");
    const visitorMessage = formData.get("message");
    const subject = encodeURIComponent(`New project inquiry from ${visitorName}`);
    const body = encodeURIComponent(
      `Name: ${visitorName}\nEmail: ${visitorEmail}\n\nMessage:\n${visitorMessage}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

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
        <motion.a
          href="#home"
          aria-label="Back to home"
          onClick={closeMobileMenu}
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
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="lg:flex hidden space-x-8">
          {navigationItems.map(
            ({ label, href }, index) => (
              <motion.a
                key={label}
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
                href={href}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5
                          bg-white group-hover:w-full transition-all duration-300"
                ></span>
              </motion.a>
            )
          )}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.7 + navigationItems.length * 0.2,
            }}
            className="relative"
          >
            <button
              type="button"
              onClick={toggleDigitalFootprint}
              aria-expanded={isDigitalFootprintOpen}
              aria-controls="desktop-digital-footprint-menu"
              className="relative text-gray-900 dark:text-gray-200
                          hover:white-600 dark:hover:text-white font-medium
                          transition-colors duration-300 group "
            >
              Digital Foot-Print
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5
                          bg-white group-hover:w-full transition-all duration-300"
              ></span>
            </button>
            <AnimatePresence>
              {isDigitalFootprintOpen && (
                <motion.div
                  id="desktop-digital-footprint-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 flex items-center space-x-9"
                >
                  {socialLinks.map(({ label, href, Icon, className }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Rhodie's ${label} profile`}
                      className={className}
                      onClick={() => setIsDigitalFootprintOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* social icons */}

        <div className="md:flex hidden items-center space-x-9">
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
          {navigationItems.map(({ label, href }) => (
            <a
              onClick={closeMobileMenu}
              className="font-medium py-2"
              key={label}
              href={href}
            >
              {label}
            </a>
          ))}
          <div>
            <button
              type="button"
              onClick={toggleDigitalFootprint}
              aria-expanded={isDigitalFootprintOpen}
              aria-controls="mobile-digital-footprint-menu"
              className="font-medium py-2 text-left"
            >
              Digital Foot-Print
            </button>
            <AnimatePresence>
              {isDigitalFootprintOpen && (
                <motion.div
                  id="mobile-digital-footprint-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex space-x-5 overflow-hidden"
                >
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Rhodie's ${label} profile`}
                      onClick={closeMobileMenu}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
        <div
          className="pt-4 border-t border-gray-200
              dark;border-gray-700"
        >
          <button
            onClick={() => {
              closeMobileMenu();
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
              <form className="space-y-4" onSubmit={handleContactSubmit}>
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
                    name="name"
                    required
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
                    name="email"
                    required
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
                    name="message"
                    required
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
