import React from "react";

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 shadow-md text-center">
    <div className="container mx-auto">
      <p className="text-sm">
        &copy; 2024 Engineer's Cradle. All rights reserved.
      </p>
      <div className="mt-2">
        <a
          href="/privacy"
          className="text-gray-200 hover:text-gray-100 transition duration-300 text-sm"
        >
          Privacy Policy
        </a>
        <span className="mx-2">|</span>
        <a
          href="/terms"
          className="text-gray-200 hover:text-gray-100 transition duration-300 text-sm"
        >
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
