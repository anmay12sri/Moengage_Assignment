import { useState, useEffect, useContext } from 'react';
import ListItem from '../Components/Lists/ListItem';
import ListDetail from '../Components/Lists/ListDetail';
import { AuthContext } from '../context/AuthContext';

function ListsPage() {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    if (user) {
      const storedLists = JSON.parse(localStorage.getItem(`lists_${user.email}`)) || [];
      setLists(storedLists);
    }
  }, [user]);

  const handleSelectList = (name) => {
    const list = lists.find((list) => list.name === name);
    setSelectedList(list);
  };

  const handleDeleteList = (name) => {
    const updatedLists = lists.filter((list) => list.name !== name);
    setLists(updatedLists);
    localStorage.setItem(`lists_${user.email}`, JSON.stringify(updatedLists));
    if (selectedList && selectedList.name === name) {
      setSelectedList(null);
    }
  };

  const handleEditList = () => {
    
  };

  const handleDeleteCode = (code) => {
    if (selectedList) {
      const updatedCodes = selectedList.responseCodes.filter((c) => c !== code);
      const updatedImages = selectedList.imageLinks.filter(
        (_, index) => selectedList.responseCodes[index] !== code
      );
      const updatedList = {
        ...selectedList,
        responseCodes: updatedCodes,
        imageLinks: updatedImages,
      };
      const updatedLists = lists.map((list) =>
        list.name === selectedList.name ? updatedList : list
      );
      setLists(updatedLists);
      setSelectedList(updatedList);
      localStorage.setItem(`lists_${user.email}`, JSON.stringify(updatedLists));
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-600 to-purple-900 min-h-screen">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
          {lists.map((list) => (
            <ListItem
              key={list.name}
              list={list}
              onSelect={handleSelectList}
              onDelete={handleDeleteList}
            />
          ))}
        </div>
        <div className="col-span-2 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
          {selectedList && (
            <ListDetail
              list={selectedList}
              onEdit={handleEditList}
              onDeleteCode={handleDeleteCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListsPage;
