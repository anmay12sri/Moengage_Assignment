import React from 'react';

function SearchResult({ results, onSave }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {results.map(result => (
          <div key={result.code} className="p-4 border rounded shadow-sm">
            <img src={result.image} alt={`Response ${result.code}`} />
            <p>{result.code}</p>
          </div>
        ))}
      </div>
      <button onClick={onSave} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}

export default SearchResult;
