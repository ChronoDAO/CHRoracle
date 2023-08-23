'use client'
import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark"; // Import the dark theme

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

export default function SalesByDayChart({ data }:{data: any}) {
   useEffect(() => {
      const createChart = () => {
         let chart = am4core.create("chartdiv", am4charts.XYChart);

         chart.data = data ;

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
   }, []);

   return (
       <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      // <p>sales by day here.</p>
      );
};
