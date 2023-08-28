import React from 'react';
import styles from './FilterCards.module.scss';
import FilterCardsClient from '../filterCardsClient/FiltercardsClient';

type FilterType = 'All' | 'Utility' | 'Cosmetics' | 'Space';

const FilterCards: React.FC = () => {
  const filters: FilterType[] = ['All', 'Utility', 'Cosmetics', 'Space'];

  return (
    <div className={styles["radios-container"]}>
      {filters.map(filter => (
        <FilterCardsClient filter={filter} key={filter} />
      ))}
    </div>
  );
};

export default FilterCards;





