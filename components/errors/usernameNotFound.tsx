import React from "react";
import styles from "./notFound.module.scss";



const UsernameNotFound = ( {username}:{username : string} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <p>User with username "{username}" not found.</p>
        <p>Please check the username or go back to the users list.</p>
        {/* Add additional elements or links as needed */}
      </div>
    </div>
  );
};

export default UsernameNotFound;
