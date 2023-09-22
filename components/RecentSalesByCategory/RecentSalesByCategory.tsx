"use client";
import React, { useState } from "react";
import styles from "./RecentSalesByCategory.module.scss";
import RecentSaleCard from "../salesCard/RecentSaleCard";

interface Sale {
  id: number;
  price: number;
  date: Date;
  fromPlayer: string;
  toPlayer: string;
  nft: {
    issuedId: number;
    item: {
      name: string;
      imageUrl: string;
      rarityName: string;
      tags: string[];
    };
  };
}

interface Category {
  name: string;
}

interface Props {
  data: Sale[];
  tags: Category[];
}

const RecentSalesByCategory: React.FC<Props> = ({ data, tags })  => {
  const [selectedOption, setSelectedOption] = useState("all");

  const filteredData =
    selectedOption === "all"
      ? data
      : data.filter((item) => item.nft.item.tags.includes(selectedOption));

  const firstFiveItems = filteredData.slice(0, 5)

  return (
    <div className={styles["latest-sales-container"]}>
      <div className={styles["sales-header"]}>
        <div className={styles["sales-title"]}>RecentSales</div>
        <div className={styles["radios-container"]}>
          <div className={styles["input-and-label-container"]}>
            <input
              type="radio"
              value="all"
              id="all"
              checked={selectedOption === "all"}
              onChange={() => setSelectedOption("all")}
            />
            <label htmlFor="all"> All </label>
          </div>
          {/* {tags.map((tag, index) => (
            <div
              key={index}
              className={styles["input-and-label-container"]}
            >
              <input
                type="radio"
                value={tag.name}
                id={tag.name}
                checked={selectedOption === tag.name}
                onChange={() => setSelectedOption(tag.name)}
              />
              <label htmlFor={tag.name}>{tag.name}</label>
            </div>
          ))} */}
        </div>
      </div>
      <div className={styles["cards-container"]}>
        {firstFiveItems.map((sale, index) => (
          <RecentSaleCard
            key={index}
            price={sale.price}
            date={sale.date}
            toPlayer={sale.toPlayer}
            fromPlayer={sale.fromPlayer}
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
