"use client";
import React, { useState } from "react";
import styles from "./RecentSalesByCategory.module.scss";
import RecentSaleCard from "../salesCard/RecentSaleCard";

interface Sale {
  id: number;
  price: number;
  date: Date;
  fromUser: string;
  toUser: string;
  nft: {
    issuedId: number;
    item: {
      name: string;
      imageUrl: string;
      rarityName: string;
      categories: string[];
    };
  };
}

interface Category {
  name: string;
}

interface Props {
  data: Sale[];
  categories: Category[];
}

const RecentSalesByCategory: React.FC<Props> = ({ data, categories })  => {
  const [selectedOption, setSelectedOption] = useState("all");

  const filteredData =
    selectedOption === "all"
      ? data.slice(0, 5)
      : data.filter((item) => item.nft.item.categories.includes(selectedOption));

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
          {categories.map((category, index) => (
            <div
              key={index}
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
        {filteredData.map((sale, index) => (
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

export default RecentSalesByCategory;
