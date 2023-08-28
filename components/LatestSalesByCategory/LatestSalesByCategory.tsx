"use client";
import React, { useState } from "react";
import styles from "./latestSales.module.scss";
import RecentSaleCard from "../salesCard/RecentSaleCard";

const LatestSalesByCategory = ({ data, categories }) => {
  const [selectedOption, setSelectedOption] = useState("all");

  const filteredData =
    selectedOption === "all"
      ? data
      : data.filter((item) => item.nft.item.categories.includes(selectedOption));


  const firstFiveItems = filteredData.slice(0, 5)
console.dir(firstFiveItems, {depth: null})

  return (
    <div className={styles["latest-sales-container"]}>
      <div className={styles["sales-header"]}>
        <div className={styles["sales-title"]}>RecentSales</div>

        <div className={styles["radios-container"]}>
        <div
              className={styles["input-and-label-container"]}
            >
              <input
                type="radio"
                value="all"
                id="all"
                checked={selectedOption === "all"}
                onChange={() => setSelectedOption("all")}
              />
              <label htmlFor="all"> All </label>
            </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles["input-and-label-container"]}
            >
              <input
                type="radio"
                value={category.name}
                id={category.name}
                checked={selectedOption === category.name}
                onChange={() => setSelectedOption(category.name)}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles["cards-container"]}>
        {firstFiveItems.map((sale, index) => (
          <RecentSaleCard
          key={index}
          price={sale.price}
          date={sale.date}
          toUser={sale.toUser}
          fromUser={sale.fromUser}
          issuedId={sale.nft.issuedId}
          itemName={sale.nft.item.name}
          imageUrl={sale.nft.item.imageUrl}
        />
        ))}
      </div>
    </div>
  );
};

export default LatestSalesByCategory;
