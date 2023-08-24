"use client";
import React, { useEffect, useState } from "react";
import styles from "./sales.module.scss";
import SalesByDaysChart from "@/components/charts/SalesByDaysChart";
// import SalesByHourChart from "@/components/charts/SalesTimeChart";

type SalesProps = {
    data: any;
    data24h: any;
  };


export default function Sales({ data, data24h }: SalesProps){
  const [selectedOption, setSelectedOption] = useState("all");

  return (
    <div className={styles["sales-hystory-container"]}>
      <div className={styles["sales-header"]}>
        <div className={styles["sales-title"]}>sales history</div>

        <div className={styles["radios-container"]}>
          <input
            type="radio"
            value="all"
            id="all"
            checked={selectedOption === "all"}
            onChange={() => setSelectedOption("all")}
          />
          <label htmlFor="all" className={styles.labels}>
            All Sales
          </label>

          <input
            type="radio"
            value="last30days"
            id="last30days"
            checked={selectedOption === "last30days"}
            onChange={() => setSelectedOption("last30days")}
          />
          <label htmlFor="last30days" className={styles.labels}>
            30 Days
          </label>

          <input
            type="radio"
            value="last7days"
            id="last7days"
            checked={selectedOption === "last7days"}
            onChange={() => setSelectedOption("last7days")}
          />
          <label htmlFor="last7days" className={styles.labels}>
            7 Days
          </label>
          <input
            type="radio"
            value="last24h"
            id="last24h"
            checked={selectedOption === "last24h"}
            onChange={() => setSelectedOption("last24h")}
          />
          <label htmlFor="last24h" className={styles.labels}>
            24 h
          </label>
        </div>
      </div>
      {selectedOption === "all" ? <SalesByDaysChart data={data}/> : null}
      {selectedOption === "last30days" ? <SalesByDaysChart data={data.slice(-30)}/> : null}
      {selectedOption === "last7days" ? <SalesByDaysChart data={data.slice(-7)}/> : null}
      {/* {selectedOption === "last24h" ? <SalesByHourChart data24h={data24h}/> : null} */}
    </div>
  );
}
