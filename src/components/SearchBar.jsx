import React, { useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6 mx-4 md:mx-8 flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for products..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchComponent;
