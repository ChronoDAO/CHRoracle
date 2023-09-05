'use client'
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import searchUser from '../../lib/prisma/searchUser';

interface PropsBarreRecherche {
  initialValue: string;
}

const SearchBar: React.FC<PropsBarreRecherche> = ({ initialValue }) => {
  const [searchText, setSearchText] = useState(initialValue);

  const handleSearch = async () => {
    const users = await searchUser();
    console.log(users);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Entrez le nom de l'utilisateur"
      />
      <button onClick={handleSearch}>Chercher</button>
    </div>
  );
};

export default SearchBar;








