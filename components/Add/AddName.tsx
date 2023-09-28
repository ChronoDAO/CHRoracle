"use client";
import React, { useState } from "react";
import styles from "./AddName.module.scss";

const AddNameComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    console.log("Value to add:", inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.addNameContainer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a name"
        className={styles.input} // Si vous avez défini un style pour l'input dans votre SCSS
      />
      <button onClick={handleAddClick} className={styles.button}>
        Add
      </button>
    </div>
  );
};

export default AddNameComponent;
