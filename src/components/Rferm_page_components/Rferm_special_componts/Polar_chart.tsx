import { useComputedColorScheme } from "@mantine/core";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface ResistanceData {
  product: string;
  value: number;
}

interface GraphProp {
  data: ResistanceData[];
}

const Polar_chart: React.FC<GraphProp> = ({ data }) => {
  const computedColorScheme = useComputedColorScheme("light");
  console.log("polar_chart", data);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "polarArea",
    },
    labels: data.map(({ product }) => product),
    series: data.map(({ value }) => value),
    fill: {
      opacity: 0.4,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],

    yaxis: {
      labels: {
        offsetX: 10,
        offsetY: 7,
        style: {
          colors: computedColorScheme === "dark" ? "#fff" : "#000",
        },
      },
    },

    plotOptions: {
      radar: {
        polygons: {
          connectorColors: "red",
        },
      },
    },
    legend: {
      show: true,
      labels: {
        colors: computedColorScheme === "dark" ? "#fff" : "#000",
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="polarArea"
        height={400}
      />
    </div>
  );
};

export default Polar_chart;
