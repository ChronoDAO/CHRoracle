"use client";
import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import styles from "./salesByDay.module.scss";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

export default function SalesByDayChart({ data }: { data: any }) {
  const [selectedOption, setSelectedOption] = useState("all");

  useEffect(() => {
    const filteredData =
      selectedOption === "last7days"
        ? data.slice(-7)
        : selectedOption === "last30days"
        ? data.slice(-30)
        : data;

    const createChart = () => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.data = filteredData;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip = new am4core.Tooltip();
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      return () => {
        if (chart) {
          chart.dispose();
        }
      };
    };

    createChart();
  }, [selectedOption]);

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
        </div>
      </div>

      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
}
