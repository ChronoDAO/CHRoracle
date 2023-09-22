import React from "react";
import styles from "./notFound.module.scss";

const PlayerNameNotFound = ( {playername}:{playername : string} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <p>Player with username "{playername}" not found.</p>
        <p>Please check the username or go back to the players list.</p>
        {/* Add additional elements or links as needed */}
      </div>
    </div>
  );
};

export default PlayerNameNotFound;
