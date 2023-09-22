"use client";
import React, { useState } from "react";
import styles from "./sales.module.scss";
import SalesByDaysChart from "@/components/charts/SalesByDaysChart";
import SalesByHourChart from "@/components/charts/SalesTimeChart";

type SalesProps = {
  data: any;
  data24h: any;
};

export default function Sales({ data, data24h }: SalesProps){
  const [selectedTime, setSelectedTime] = useState("allChart");

  return (
    <div className={styles["sales-hystory-container"]}>
      <div className={styles["sales-header"]}>
        <div className={styles["sales-title"]}>sales history</div>
        <div className={styles["radios-container"]}>
          <input
            type="radio"
            value="allChart"
            id="allChart"
            checked={selectedTime === "allChart"}
            onChange={() => setSelectedTime("allChart")}
          />
          <label htmlFor="allChart" className={styles.labels}>
            All Sales
          </label>

          <input
            type="radio"
            value="last30days"
            id="last30days"
            checked={selectedTime === "last30days"}
            onChange={() => setSelectedTime("last30days")}
          />
          <label htmlFor="last30days" className={styles.labels}>
            30 Days
          </label>

          <input
            type="radio"
            value="last7days"
            id="last7days"
            checked={selectedTime === "last7days"}
            onChange={() => setSelectedTime("last7days")}
          />
          <label htmlFor="last7days" className={styles.labels}>
            7 Days
          </label>
          <input
            type="radio"
            value="last24h"
            id="last24h"
            checked={selectedTime === "last24h"}
            onChange={() => setSelectedTime("last24h")}
          />
          <label htmlFor="last24h" className={styles.labels}>
            24 h
          </label>
        </div>
      </div>
      {selectedTime === "allChart" ? <SalesByDaysChart data={data}/> : null}
      {selectedTime === "last30days" ? <SalesByDaysChart data={data.slice(-30)}/> : null}
      {selectedTime === "last7days" ? <SalesByDaysChart data={data.slice(-7)}/> : null}
      {selectedTime === "last24h" ? <SalesByHourChart data24h={data24h}/> : null}
    </div>
  );
}
