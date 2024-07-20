import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 mb-4">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="w-full border rounded px-3 py-2"
        placeholder="Search response codes (e.g., 202, 201, 404)"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
    </form>
  );
}

export default SearchBar;
