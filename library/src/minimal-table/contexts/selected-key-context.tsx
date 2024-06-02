// Custom hook to use the SelectedKeysContext
import { useContext } from 'react';

export const useSelectedKeys = () => {
  return useContext(SelectedKeysContext);
};

// Provider component
export const SelectedKeysProvider = ({ children }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const addKey = (key) => {
    setSelectedKeys((prevKeys) => [...prevKeys, key]);
  };

  const removeKey = (key) => {
    setSelectedKeys((prevKeys) => prevKeys.filter((k) => k !== key));
  };

  const toggleKey = (key) => {
    setSelectedKeys((prevKeys) =>
      prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]
    );
  };

  return (
    <SelectedKeysContext.Provider value={{ selectedKeys, addKey, removeKey, toggleKey }}>
  {children}
  </SelectedKeysContext.Provider>
);
};