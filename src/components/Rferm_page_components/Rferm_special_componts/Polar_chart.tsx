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
  const color = ["#F34141", "#6BD731", "#FFB01B"];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "polarArea",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: data.map(({ product }) => product),
    series: data.map(({ value }) => value),

    fill: {
      opacity: 0.5,
      colors: color,
    },
    stroke: {
      width: 2,
      colors: color,
    },
    responsive: [
      {
        breakpoint: 1024, // Added breakpoint for tablets
        options: {
          chart: {
            width: "100%",
            height: 500,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
            height: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
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

      marker: {
        show: false,
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },

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
      markers: {
        fillColors: color,
      },

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
