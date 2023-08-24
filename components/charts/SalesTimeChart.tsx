import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";

export default function SalesTimeChart({ data24h }: { data24h: any }) {
  useEffect(() => {
    const createChart = () => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelY: "zoomX",
          layout: root.verticalLayout,
          pinchZoomX: true,
        })
      );

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 1,
          renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          groupData: true,
          maxDeviation: 0.5,
          baseInterval: { timeUnit: "minute", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 50,
            pan: "zoom",
          }),
        })
      );

      // xAxis.get("dateFormats")["day"] = "MM/dd";
      // xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

      //data
      // Generate random data

      let data = data24h;

      // Create series
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}",
          }),
        })
      );

      series.strokes.template.set("strokeWidth", 2);
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.4,
      });

      series.data.setAll(data);

      // Add cursor
      chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "none",
          xAxis: xAxis,
        })
      );

      xAxis.set("tooltip", am5.Tooltip.new(root, {}));

      yAxis.set("tooltip", am5.Tooltip.new(root, {}));

      let scrollbarX = am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50,
      });

      chart.set("scrollbarX", scrollbarX);

      let sbxAxis = scrollbarX.chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: "minute", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            opposite: false,
            strokeOpacity: 0,
          }),
        })
      );

      let sbyAxis = scrollbarX.chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      let sbseries = scrollbarX.chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis: sbxAxis,
          yAxis: sbyAxis,
          valueYField: "value",
          valueXField: "date",
        })
      );
      sbseries.data.setAll(data);
    };
    createChart();
  }, []);

  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
}
