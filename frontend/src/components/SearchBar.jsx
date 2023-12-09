import React, { useState } from "react"

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    // Pass the search term to the parent component
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mr-2 p-2 border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
