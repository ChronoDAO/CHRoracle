import React from 'react';
import styles from './NFTCard.module.scss';

interface CardProps {
  totalNFTs: number;
  totalValue: number;
  totalDropNFT: number;
  proportion: number;
  uniqueNFTs: number;
  proportionUni: number;
}

const NFTCard: React.FC<CardProps> = ({
  totalNFTs,
  totalValue,
  totalDropNFT,
  proportion,
  uniqueNFTs,
  proportionUni,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.propertyContainer}>
        <div className={styles.property}>
          <h3>Nombre total de NFT</h3>
          <p>{totalNFTs}</p>
        </div>
        <div className={styles.property}>
          <h3>Valeur totale des NFT</h3>
          <p>{totalValue}</p>
        </div>
      </div>
      <div className={styles.propertyContainer}>
        <div className={styles.property}>
          <h3>Total de drop NFT</h3>
          <p>{totalDropNFT}</p>
          <p>Proportion: {proportion}%</p>
        </div>
        <div className={styles.property}>
          <h3>Nombre de NFT uniques</h3>
          <p>{uniqueNFTs}</p>
          <p>Proportion:{proportionUni}%</p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
