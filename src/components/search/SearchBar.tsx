import React, { useState } from 'react';

interface PropsBarreRecherche {
  initialValue: string;
  onSearch: (newName: string) => void;
}

const SearchBar: React.FC<PropsBarreRecherche> = ({ initialValue, onSearch }) => {
  const [searchText, setSearchText] = useState(initialValue);

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Rechercher par nom..."
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default SearchBar;

