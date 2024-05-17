import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useComputedColorScheme } from "@mantine/core";

interface PieData {
  id: string;
  value: number;
}

interface PercentageChartNivoProps {
  data: PieData[];
}
interface CustomColors {
  [key: string]: string;
}

const Percentage_chart_nivo: React.FC<PercentageChartNivoProps> = ({
  data,
}) => {
  const computedColorScheme = useComputedColorScheme("dark");

  const customColors: CustomColors = {
    Danger: "#c51d31",
    Unhealthy: "#d14d14",
    Healthy: "#24782c",
  };
  const theme = {
    tooltip: {
      container: {
        background: computedColorScheme === "dark" ? "#333" : "#fff", // Background color of the tooltip
        color: computedColorScheme === "dark" ? "#fff" : "#333", // Text color of the tooltip
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.35}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={({ id }) => customColors[id]}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        theme={theme}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#999",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Percentage_chart_nivo;
