import React from "react";

const ProductCard = ({ product }) => (
  <div className="relative bg-gray-50 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-72 h-96 mx-auto">
    <div className="relative w-full h-2/3 overflow-hidden">
      {/* images */}
      <img
        src={product.thumbnail || "fallback-image-url"}
        alt={product.title}
        className="w-full h-full object-cover rounded-t-lg border border-gray-300"
      />
      {/* Price */}
      <div className="absolute bottom-14 left-48 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg border border-yellow-500 transform rotate-[-40deg] origin-bottom-right flex items-center justify-center w-24 h-10 text-sm font-bold">
        ${product.price.toFixed(2)}
      </div>
    </div>
    <div className="p-4 h-auto flex items-center justify-center">
      {/*  title */}
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {product.title}
      </h3>
    </div>
  </div>
);

export default ProductCard;
