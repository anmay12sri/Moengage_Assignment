import React, { useState, useEffect } from 'react';
import ListItem from '../Components/Lists/ListItem';
import ListDetail from '../Components/Lists/ListDetail';

function ListsPage() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    // Load saved lists from localStorage when component mounts
    const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
    setLists(savedLists);
  }, []);

  const handleSelectList = (id) => {
    const list = lists.find(list => list.name === id);
    setSelectedList(list);
  };

  const handleDeleteList = (id) => {
    const updatedLists = lists.filter(list => list.name !== id);
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  };

  const handleEditList = () => {
    // Implement list editing functionality if needed
  };

  const handleDeleteCode = (code) => {
    if (selectedList) {
      const updatedCodes = selectedList.responseCodes.filter(c => c !== code);
      const updatedImages = selectedList.imageLinks.filter((_, index) => selectedList.responseCodes[index] !== code);
      const updatedList = { ...selectedList, responseCodes: updatedCodes, imageLinks: updatedImages };
      const updatedLists = lists.map(list => list.name === selectedList.name ? updatedList : list);
      setLists(updatedLists);
      setSelectedList(updatedList);
      localStorage.setItem('lists', JSON.stringify(updatedLists));
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          {lists.length > 0 ? (
            lists.map(list => (
              <ListItem 
                key={list.name} 
                list={list} 
                onSelect={handleSelectList} 
                onDelete={handleDeleteList} 
              />
            ))
          ) : (
            <p>No lists available.</p>
          )}
        </div>
        <div className="col-span-2">
          {selectedList && <ListDetail list={selectedList} onEdit={handleEditList} onDeleteCode={handleDeleteCode} />}
        </div>
      </div>
    </div>
  );
}

export default ListsPage;
