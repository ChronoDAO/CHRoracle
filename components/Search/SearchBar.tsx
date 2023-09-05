'use client'
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import { useRouter } from 'next/navigation';


const SearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (event:any) => {
    event.preventDefault();
    router.push(`/search/${searchText}`);
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








