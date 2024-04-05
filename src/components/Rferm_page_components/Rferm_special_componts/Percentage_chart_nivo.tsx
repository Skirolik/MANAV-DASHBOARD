import React from "react";
import { ResponsivePie } from "@nivo/pie";

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
  const customColors: CustomColors = {
    Danger: "#c51d31",
    Unhealthy: "#d14d14",
    Healthy: "#24782c",
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
          modifiers: [["darker", 0]],
        }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        arcLinkLabelsSkipAngle={6}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={2}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsRadiusOffset={0.65}
        arcLabelsSkipAngle={9}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        // fill={[
        //   {
        //     match: {
        //       id: "Danger",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "go",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "python",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "scala",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "lisp",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "elixir",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "javascript",
        //     },
        //     id: "lines",
        //   },
        // ]}
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
