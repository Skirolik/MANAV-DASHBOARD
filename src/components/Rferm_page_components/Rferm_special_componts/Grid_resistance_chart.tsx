import React from "react";
import Chart from "react-apexcharts";
import { useComputedColorScheme } from "@mantine/core";

interface ResistanceData {
  Date: string;
  value: number;
}

interface GraphProp {
  data: ResistanceData[];
  color: string;
  warning_one: string;
  warning_two: string;
}

const Grid_resistance_chart: React.FC<GraphProp> = ({
  data,
  color,
  warning_one,
  warning_two,
}) => {
  const computedColorScheme = useComputedColorScheme("light");
  const warning_one_data = warning_one;
  const warning_two_data = warning_two;

  const options = {
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      hideEmptySeries: true,
      fillSeriesColor: false,
      theme: computedColorScheme === "dark" ? "dark" : "light",
      style: {
        fontSize: "15px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    legend: {
      show: true,
      labels: {
        colors: "yellow",
      },
    },
    markers: {
      size: 2,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle" as ApexMarkerShape | undefined,
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
        autoSelected: "zoom" as "zoom" | "selection" | "pan" | undefined,
      },
    },
    colors: [color],

    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: computedColorScheme === "dark" ? "#fff" : "000",
        },
      },
      title: {
        text: "Timestamp (YYYY-MM-DD HH:MM:SS)",
        style: {
          color: computedColorScheme === "dark" ? "#fff" : "000",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: computedColorScheme === "dark" ? "#fff" : "000",
        },
      },
      title: {
        text: "Resistance (Ω)",
        style: {
          color: computedColorScheme === "dark" ? "#fff" : "000",
        },
      },
    },

    annotations: {
      yaxis: [
        {
          y: warning_two_data,
          y2: null,
          strokeDashArray: 0,
          borderColor: "red",
          fillColor: "red",
          opacity: 1,
          offsetX: 1,
          offsetY: 0,
          width: "100%",
          yAxisIndex: 0,
        },
        {
          y: warning_one_data,
          y2: null,
          strokeDashArray: 0,
          borderColor: "#FC8C0C",
          fillColor: "#FC8C0C",
          opacity: 1,
          offsetX: 1,
          offsetY: 0,
          width: "100%",
          yAxisIndex: 0,
        },
      ],
    },
  };

  const series = [
    {
      name: "Resistance (Ω)",
      data: data.map(({ Date, value }) => ({ x: Date, y: value })),
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default Grid_resistance_chart;
