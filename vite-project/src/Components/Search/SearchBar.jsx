import   { useState } from 'react';
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Call onSearch on every key press
  };

  return (
    <div className="relative w-full mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 pl-10 pr-4"
        placeholder="Search response codes (e.g., 202, 201, 404)"
      />
      <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
    </div>
  );
}

export default SearchBar;
