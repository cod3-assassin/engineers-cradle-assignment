import React, { useState, useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import ProductCard from "../components/ProductCard";
import SearchComponent from "../components/SearchBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { fetchProducts } from "../services/apiService";

const PRODUCTS_PER_PAGE = 8;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchAndSetProducts();
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
    setNoResults(filtered.length === 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4 md:p-8 pt-20 md:pt-24">
        <div>
          <SearchComponent onSearch={handleSearch} />
          {noResults && (
            <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-md">
              No matching products found. Please try a different keyword.
            </div>
          )}
          <ErrorBoundary>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 ${
                noResults ? "hidden" : ""
              }`}
            >
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ErrorBoundary>
          {!noResults && (
            <div className="flex justify-between items-center mt-8">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300 flex items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </button>
              )}
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300 flex items-center"
                >
                  Next
                  <FaArrowRight className="ml-2" />
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
