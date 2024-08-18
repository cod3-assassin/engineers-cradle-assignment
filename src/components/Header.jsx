import React from "react";
import { FaUser } from "react-icons/fa";

const Header = ({ userEmail }) => (
  <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 shadow-lg fixed top-0 left-0 w-full z-20">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight whitespace-nowrap">
        Engineer’s Cradle
      </h1>
      {userEmail && (
        <div className="hidden md:flex items-center space-x-2 bg-teal-600 bg-opacity-75 text-white rounded-lg py-1 px-2 shadow-md border border-teal-500 text-sm">
          <span>Logged in as</span>
          <span className="truncate">{userEmail}</span>
        </div>
      )}
      {userEmail && (
        <div className="flex md:hidden items-center space-x-2 bg-teal-600 bg-opacity-75 text-white rounded-lg py-1 px-2 shadow-md border border-teal-500 text-xs">
          <FaUser className="text-xs sm:text-sm" />
          <span className="truncate">{userEmail}</span>
        </div>
      )}
    </div>
  </header>
);

export default Header;
