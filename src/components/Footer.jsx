import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6 mt-40">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and description */}
          <h2 className="text-3xl flex justify-between font-bold bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent">
            Rhodie
            <div
              className="h-9 w-9 rounded-lg border
            flex items-center justify-center text-gray-400 font-bold text-xl ml-3 "
            >
              Rh
            </div>
          </h2>

          {/* Scroll links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                className="text-gray-700 hover:text-cyan-400 transition-colors"
                href="https://github.com/Stenio-Apollo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Rhodie's GitHub profile"
              >
                <FiGithub className="w-5 h-5" />
              </a>

              <a
                className="text-gray-700 hover:text-rose-400 transition-colors"
                href="https://www.instagram.com/stenio_ii/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Rhodie's Instagram profile"
              >
                <FiInstagram className="w-5 h-5" />
              </a>

              <a
                className="text-gray-700 hover:text-teal-400 transition-colors"
                href="https://www.linkedin.com/in/stenio-gerlin-44119829a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Rhodie's LinkedIn profile"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Stenio Gerlin. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              className="text-gray-500 hover:text-white text-sm transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-gray-500 hover:text-white text-sm transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-gray-500 hover:text-white text-sm transition-colors"
              href="#"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
