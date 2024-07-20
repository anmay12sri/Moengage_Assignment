import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Components/Search/SearchBar';  // Import the SearchBar component

const SearchPage = () => {
  const [filter, setFilter] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [defaultImages, setDefaultImages] = useState([]);
  const [listName, setListName] = useState('');
  const [savedLists, setSavedLists] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for full-screen mode
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    // Load saved lists from localStorage on component mount
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    setSavedLists(storedLists);
  }, []);

  useEffect(() => {
    // Fetch images based on the filter or default images
    setLoading(true);
    if (filter) {
      fetchFilteredImages(filter);
    } else {
      fetchDefaultImages();
    }
  }, [filter]);

  const fetchFilteredImages = async (filter) => {
    const imagePromises = [];
    const codes = [];

    // Process filter to handle wildcards
    const normalizedFilter = filter.replace(/x/g, '\\d');
    const regex = new RegExp(`^${normalizedFilter}$`, 'i');

    for (let i = 100; i < 600; i++) {
      const code = i.toString();
      if (regex.test(code)) {
        codes.push(code);
        imagePromises.push(
          axios.get(`https://http.dog/${code}.jpg`, { responseType: 'blob' })
        );
      }
    }

    try {
      const responses = await Promise.all(imagePromises);
      const images = responses.map((response, index) => ({
        code: codes[index],
        link: URL.createObjectURL(response.data)
      }));
      setFilteredImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultImages = async () => {
    const defaultCodes = ['200', '201', '404', '203', '303', '500', '204', '403' ]; // Example default codes
    const imagePromises = defaultCodes.map(code =>
      axios.get(`https://http.dog/${code}.jpg`, { responseType: 'blob' })
    );

    try {
      const responses = await Promise.all(imagePromises);
      const images = responses.map((response, index) => ({
        code: defaultCodes[index],
        link: URL.createObjectURL(response.data)
      }));
      setDefaultImages(images);
      if (!filter) {
        setFilteredImages(images); // Show default images if no filter
      }
    } catch (error) {
      console.error('Error fetching default images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveList = () => {
    if (!listName) {
      alert('Please enter a list name.');
      return;
    }

    const list = {
      name: listName,
      createdAt: new Date().toLocaleDateString(),
      responseCodes: filteredImages.map(img => img.code),
      imageLinks: filteredImages.map(img => img.link)
    };

    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    storedLists.push(list);
    localStorage.setItem('lists', JSON.stringify(storedLists));
    setSavedLists(storedLists);
    setListName('');
  };

  const handleNavigateToLists = () => {
    navigate('/lists');  // Redirect to /lists
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the clicked image for full-screen mode
  };

  const handleCloseFullScreen = () => {
    setSelectedImage(null); // Close full-screen mode
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div className={`p-6 ${selectedImage ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Search Page</h1>

        <SearchBar onSearch={setFilter} />

        {loading && (
          <div className="flex justify-center items-center h-96">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && (
          <div className="flex flex-wrap gap-6 mb-6">
           {(filter ? filteredImages : defaultImages).map((image) => (
  <div
    key={image.code}
    className="flex-shrink-0 w-60 h-60 bg-white p-4 rounded-lg ml-10 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center"
    onClick={() => handleImageClick(image)}
  >
    <img
      src={image.link}
      alt={`Response Code ${image.code}`}
      className="w-full h-40 object-contain rounded-lg mb-2"
    />
    <p className="text-center text-gray-600 font-medium">Code: {image.code}</p>
  </div>
))}

             
          </div>
        )}

        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name..."
            className="p-3 border border-gray-300 rounded-lg shadow-sm w-80"
          />
          <button
            onClick={handleSaveList}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Save List
          </button>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="w-full p-6 bg-gray-100">
        <button
          onClick={handleNavigateToLists}
          className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          View Saved Lists
        </button>
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseFullScreen}
        >
          <div className="relative">
            <img
              src={selectedImage.link}
              alt={`Response Code ${selectedImage.code}`}
              className="max-w-screen-lg max-h-screen object-contain"
            />
            <button
              onClick={handleCloseFullScreen}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-3 shadow-md hover:bg-gray-200 transition duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
