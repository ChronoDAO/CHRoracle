import React from "react";
import styles from "./notFound.module.scss";

interface ItemNotFoundProps {
  archetypeId: string;
}

const ItemNotFound: React.FC<ItemNotFoundProps> = ({ archetypeId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <p>Item with id "{archetypeId}" not found.</p>
        <p>Please check the Id or go back to the items list.</p>
        {/* Add additional elements or links as needed */}
      </div>
    </div>
  );
};

export default ItemNotFound;