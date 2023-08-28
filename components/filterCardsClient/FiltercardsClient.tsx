'use client'
import React, { useState } from 'react';
import styles from '../filterCards/FilterCards.module.scss';

type FilterType = 'All' | 'Utility' | 'Cosmetics' | 'Space';

interface FilterCardsClientProps {
  filter: FilterType;
  onFilterChange?: (selectedFilter: FilterType) => void; 
}

const FilterCardsClient: React.FC<FilterCardsClientProps> = ({ filter, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');

  const handleFilterChangeInternal = (selected: FilterType) => {
    setSelectedFilter(selected);
    if(onFilterChange) {  
      onFilterChange(selected); 
    }
  };

  return (
    <div className={styles["labels"]}>
      <input
        type="radio"
        id={filter}
        value={filter}
        checked={selectedFilter === filter}
        onChange={() => handleFilterChangeInternal(filter)}
      />
      <label htmlFor={filter}>{filter}</label>
    </div>
  );
};

export default FilterCardsClient;

