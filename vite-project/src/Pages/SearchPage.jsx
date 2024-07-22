// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from '../Components/Search/SearchBar';
// import { AuthContext } from '../context/AuthContext';

// const SearchPage = () => {
//   const [filter, setFilter] = useState('');
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [defaultImages, setDefaultImages] = useState([]);
//   const [listName, setListName] = useState('');
//   const [savedLists, setSavedLists] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       const storedLists = JSON.parse(localStorage.getItem(`lists_${user.email}`)) || [];
//       setSavedLists(storedLists);
//     }
//   }, [user]);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     if (filter) {
//       fetchFilteredImages(filter);
//     } else {
//       fetchDefaultImages();
//     }
//   }, [filter]);

//   const fetchFilteredImages = async (filter) => {
//     const imagePromises = [];
//     const codes = [];

//     const normalizedFilter = filter.replace(/x/g, '\\d');
//     const regex = new RegExp(`^${normalizedFilter}`, 'i');

//     for (let i = 100; i < 600; i++) {
//       const code = i.toString();
//       if (regex.test(code)) {
//         codes.push(code);
//         imagePromises.push(
//           axios
//             .get(`http://localhost:5000/api/images/${code}`, { responseType: 'blob' })
//             .then((response) => ({
//               code: code,
//               link: URL.createObjectURL(response.data),
//             }))
//             .catch(() => null)
//         );
//       }
//     }

//     try {
//       const responses = await Promise.all(imagePromises);
//       const images = responses.filter((response) => response !== null);
//       setFilteredImages(images);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       setError('Failed to fetch images. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDefaultImages = async () => {
//     const defaultCodes = ['200', '201', '404', '203', '303', '500', '204', '403'];
//     const imagePromises = defaultCodes.map((code) =>
//       axios
//         .get(`http://localhost:5000/api/images/${code}`, { responseType: 'blob' })
//         .then((response) => ({
//           code: code,
//           link: URL.createObjectURL(response.data),
//         }))
//         .catch(() => null)
//     );

//     try {
//       const responses = await Promise.all(imagePromises);
//       const images = responses.filter((response) => response !== null);
//       setDefaultImages(images);
//       if (!filter) {
//         setFilteredImages(images);
//       }
//     } catch (error) {
//       console.error('Error fetching default images:', error);
//       setError('Failed to fetch default images. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveList = () => {
//     if (!listName || !user) {
//       alert('Please enter a list name and ensure you are logged in.');
//       return;
//     }

//     const list = {
//       name: listName,
//       user: user.email,
//       createdAt: new Date().toLocaleDateString(),
//       responseCodes: filteredImages.map((img) => img.code),
//       imageLinks: filteredImages.map((img) => img.link),
//     };

//     const storedLists = JSON.parse(localStorage.getItem(`lists_${user.email}`)) || [];
//     storedLists.push(list);
//     localStorage.setItem(`lists_${user.email}`, JSON.stringify(storedLists));
//     setSavedLists(storedLists);
//     setListName('');
//   };

//   const handleNavigateToLists = () => {
//     navigate('/lists');
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleCloseFullScreen = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
       
//       {user && (
//         <div className="absolute top-6 right-1 p-4 text-black  font-bold bg-blue-200 cursor-pointer">
//           Welcome, {user.email}
//         </div>
//       )}

//       {/* Main Content */}
//       <div className={`p-6 ${selectedImage ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
//         <h1 className="text-4xl font-bold mb-6 text-white text-center cursor-pointer">CODE STATUS</h1>
//         <hr></hr>

//         <SearchBar onSearch={setFilter} />

//         {loading && (
//           <div className="flex justify-center items-center h-96">
//             <div className="w-12 h-12 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
//           </div>
//         )}

//         {error && (
//           <div className="flex justify-center items-center h-96 text-red-500">
//             {error}
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="flex flex-wrap gap-6 mb-6 justify-center">
//             {(filter ? filteredImages : defaultImages).map((image) => (
//               <div
//                 key={image.code}
//                 className="flex-shrink-0 w-60 h-72 bg-gray-300 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col items-center"
//                 onClick={() => handleImageClick(image)}
//               >
//                 <img
//                   src={image.link}
//                   alt={`Response Code ${image.code}`}
//                   className="w-full h-30 object-contain rounded-lg mb-1 "
//                 />
//                 <p className="text-center text-gray-800 font-medium">Code: {image.code}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mb-6 flex items-center space-x-4 justify-center">
//           <input
//             type="text"
//             value={listName}
//             onChange={(e) => setListName(e.target.value)}
//             placeholder="Enter list name..."
//             className="p-3 border border-gray-300 rounded-lg shadow-sm w-80"
//           />
//           <button
//             onClick={handleSaveList}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Navigation Button */}
//       <div className="w-full p-6 bg-gray-100">
//         <button
//           onClick={handleNavigateToLists}
//           className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           View Saved Lists
//         </button>
//       </div>

//       {/* Full-Screen Part */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={handleCloseFullScreen}
//           aria-label="Close full-screen image"
//           role="dialog"
//         >
//           <div className="relative">
//             <img
//               src={selectedImage.link}
//               alt={`Response Code ${selectedImage.code}`}
//               className="max-w-screen-lg max-h-screen object-contain"
//             />
//             <button
//               onClick={handleCloseFullScreen}
//               className="absolute top-4 right-4 bg-white text-black rounded-full p-3 shadow-md hover:bg-gray-200 transition duration-200"
//               aria-label="Close full-screen image"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchPage;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Components/Search/SearchBar';
import { AuthContext } from '../context/AuthContext';

const SearchPage = () => {
  const [filter, setFilter] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [defaultImages, setDefaultImages] = useState([]);
  const [listName, setListName] = useState('');
  const [savedLists, setSavedLists] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const storedLists = JSON.parse(localStorage.getItem(`lists_${user.email}`)) || [];
      setSavedLists(storedLists);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (filter) {
      fetchFilteredImages(filter);
    } else {
      fetchDefaultImages();
    }
  }, [filter]);

  const fetchFilteredImages = async (filter) => {
    const imagePromises = [];
    const codes = [];

    const normalizedFilter = filter.replace(/x/g, '\\d');
    const regex = new RegExp(`^${normalizedFilter}`, 'i');

    for (let i = 100; i < 600; i++) {
      const code = i.toString();
      if (regex.test(code)) {
        codes.push(code);
        imagePromises.push(
          axios
            .get(`https://moengage-assignment-1-lpiv.onrender.com/api/images/${code}`, { responseType: 'blob' })
            .then((response) => ({
              code: code,
              link: URL.createObjectURL(response.data),
            }))
            .catch(() => null)
        );
      }
    }

    try {
      const responses = await Promise.all(imagePromises);
      const images = responses.filter((response) => response !== null);
      setFilteredImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultImages = async () => {
    const defaultCodes = ['200', '201', '404', '203', '303', '500', '204', '403'];
    const imagePromises = defaultCodes.map((code) =>
      axios
        .get(`https://moengage-assignment-1-lpiv.onrender.com/api/images/${code}`, { responseType: 'blob' })
        .then((response) => ({
          code: code,
          link: URL.createObjectURL(response.data),
        }))
        .catch(() => null)
    );

    try {
      const responses = await Promise.all(imagePromises);
      const images = responses.filter((response) => response !== null);
      setDefaultImages(images);
      if (!filter) {
        setFilteredImages(images);
      }
    } catch (error) {
      console.error('Error fetching default images:', error);
      setError('Failed to fetch default images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveList = () => {
    if (!listName || !user) {
      alert('Please enter a list name and ensure you are logged in.');
      return;
    }

    const list = {
      name: listName,
      user: user.email,
      createdAt: new Date().toLocaleDateString(),
      responseCodes: filteredImages.map((img) => img.code),
      imageLinks: filteredImages.map((img) => img.link),
    };

    const storedLists = JSON.parse(localStorage.getItem(`lists_${user.email}`)) || [];
    storedLists.push(list);
    localStorage.setItem(`lists_${user.email}`, JSON.stringify(storedLists));
    setSavedLists(storedLists);
    setListName('');
  };

  const handleNavigateToLists = () => {
    navigate('/lists');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseFullScreen = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
       
      {user && (
        <div className="absolute top-6 right-1 p-4 text-black  font-bold bg-blue-200 cursor-pointer">
          Welcome, {user.email}
        </div>
      )}

      {/* Main Content */}
      <div className={`p-6 ${selectedImage ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
        <h1 className="text-4xl font-bold mb-6 text-white text-center cursor-pointer">CODE STATUS</h1>
        <hr></hr>

        <SearchBar onSearch={setFilter} />

        {loading && (
          <div className="flex justify-center items-center h-96">
            <div className="w-12 h-12 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-96 text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-wrap gap-6 mb-6 justify-center">
            {(filter ? filteredImages : defaultImages).map((image) => (
              <div
                key={image.code}
                className="flex-shrink-0 w-60 h-72 bg-gray-300 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col items-center"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.link}
                  alt={`Response Code ${image.code}`}
                  className="w-full h-30 object-contain rounded-lg mb-1 "
                />
                <p className="text-center text-gray-800 font-medium">Code: {image.code}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mb-6 flex items-center space-x-4 justify-center">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name..."
            className="p-3 border border-gray-300 rounded-lg shadow-sm w-80"
          />
          <button
            onClick={handleSaveList}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
          >
            Save
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

      {/* Full-Screen Part */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseFullScreen}
          aria-label="Close full-screen image"
          role="dialog"
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
              aria-label="Close full-screen image"
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


