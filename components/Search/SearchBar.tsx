"use client";
import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/navigation";

const SearchBar = ({
  searchPath = "/search",
  placeholderText = "Enter a search term",
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (event: any) => {
    event.preventDefault();
    router.push(`${searchPath}/${searchText}`);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholderText}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
