import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";

exporting(Highcharts);

export const BarChart = () => {
  const options = {
    chart: { type: "bar" },
    title: { text: "Bar Chart Example" },
    xAxis: { categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"] },
    yAxis: { title: { text: "Fruit Eaten" } },
    series: [
      { name: "John", data: [5, 3, 4, 7, 2] },
      { name: "Jane", data: [2, 2, 3, 2, 1] },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export const LineChart = () => {
  const options = {
    chart: { type: "line" },
    title: { text: "Line Chart Example" },
    xAxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
    yAxis: { title: { text: "Values" } },
    series: [
      { name: "2023", data: [1, 3, 2, 4, 6] },
      { name: "2024", data: [2, 5, 3, 7, 8] },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export const PieChart = () => {
  const options = {
    chart: { type: "pie" },
    title: { text: "Pie Chart Example" },
    credits: { enabled: false },
    series: [
      {
        name: "Share",
        data: [
          { name: "Chrome", y: 61.41 },
          { name: "Edge", y: 11.84 },
          { name: "Firefox", y: 10.85 },
          { name: "Safari", y: 4.67 },
          { name: "Other", y: 11.23 },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export const ScatterPlot = () => {
  const options = {
    chart: { type: "scatter", zoomType: "xy" },
    title: { text: "Scatter Plot Example" },
    credits: { enabled: false },
    xAxis: { title: { text: "Height (cm)" } },
    yAxis: { title: { text: "Weight (kg)" } },
    series: [
      {
        name: "Male",
        color: "rgba(119, 152, 191, 0.5)",
        data: [
          [174, 65],
          [175, 66],
          [176, 67],
          [177, 68],
          [178, 70],
        ],
      },
      {
        name: "Female",
        color: "rgba(223, 83, 83, 0.5)",
        data: [
          [162, 51],
          [163, 54],
          [164, 55],
          [165, 57],
          [166, 59],
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
