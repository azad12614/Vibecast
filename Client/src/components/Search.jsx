import React, { useState, useEffect } from "react";

const Search = ({ searchTerm, setSearchTerm, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Clear search when component unmounts or add a clear button
  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Search Container */}
      <div
        className={`
        relative flex items-center w-full p-4 rounded-2xl border-2 transition-all duration-300
        ${
          isFocused
            ? "border-blue-500 bg-gray-800 shadow-lg shadow-blue-500/20"
            : "border-gray-600 bg-gray-800/50 hover:bg-gray-800 hover:border-gray-500"
        }
      `}
      >
        {/* Search Icon */}
        <div className="flex-shrink-0 mr-3">
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${
              isFocused ? "text-blue-400" : "text-white"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium w-full"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label={`Search ${placeholder.toLowerCase()}`}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 ml-3 p-1 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Stats */}
      {searchTerm && (
        <div className="mt-3 text-center">
          <p className="text-white text-sm">
            Searching for:{" "}
            <span className="text-white font-semibold">"{searchTerm}"</span>
          </p>
        </div>
      )}

      {/* Popular Searches Suggestion */}
      {!searchTerm && (
        <div className="mt-4 text-center">
          <p className="text-white text-sm mb-2">
            Try: {placeholder === "Search Movies" ? "Inception, The Dark Knight, Interstellar" : "The Witcher 3, Cyberpunk 2077, God of War"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
