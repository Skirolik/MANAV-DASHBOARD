/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { getTextColor } from "../components/utils";
import useWebsocket from "../components/customhooks/useWebsocket";
import { Card, Grid, Title } from "@mantine/core";
import Progress_bar from "../components/Lmas_components/Progress_bar";
import Field_values from "../components/Lmas_components/Field_values";
import CommonCards from "../components/Lmas_components/Common_cards";
import useVariablecount from "../components/customhooks/useVariablecount";
import useBatteryCal from "../components/customhooks/useBatteryCal";
import HomeTable from "../components/Lmas_components/HomeTable";
import Lmap from "../components/Lmas_components/Lmap";
import Calender from "../components/Lmas_components/Calender";

interface ChartDataItem extends Array<string | number | Date> {}

interface UniqueRow {
  id: number;
  name: string;
}

const LmasHome: React.FC<{ back: string }> = ({ back }) => {
  const useremail = localStorage.getItem("userEmail") || "";

  const { data, chartData, latestData, uniqueDataLast10Minutes } =
    useWebsocket(useremail);
  const username = localStorage.getItem("userFirstname");
  //@ts-expect-error
  const chartDataArray: ChartDataItem[] = chartData;

  const transformedData = latestData
    .map((row) => ({
      x: row[25],
      y: Number(row[9]),
      z: row[1],
    }))
    .reverse();

  // const transformeData = latestData
  //   .map((row) => ({
  //     x: Number(row[8]),
  //     y: row[1],
  //   }))
  //   .reverse();

  const batteryData = chartDataArray.map((row) => ({
    x: row[25],
    y: Number(row[24]),
    z: row[1],
  }));

  // const { totalBatteryCount } = useBatteryCal({ data: batteryData });

  const diaDataElectroStatic = latestData
    .map((row) => ({
      x: row[25],
      y: row[5],
    }))
    .reverse();

  const diaDataSpark = latestData
    .map((row) => ({
      x: row[25],
      y: row[6],
    }))
    .reverse();

  const diaDataEnvironment = latestData
    .map((row) => ({
      x: row[25],
      y: row[7],
    }))
    .reverse();

  // const transformerData = data.map((row) => ({
  //   x: row[25],
  //   y: Number(row[9]),
  // }));

  const mapData = chartDataArray.map((row) => ({
    x: Number(row[3]),
    y: Number(row[4]),
    z: Number(row[9]),
  }));

  const staticData = data.map((row) => ({
    x: row[25],
    y: row[5],
    z: row[1],
  }));
  const sparkData = data.map((row) => ({
    x: row[25],
    y: row[6],
    z: row[1],
  }));
  const envData = data.map((row) => ({
    x: row[25],
    y: row[7],
    z: row[1],
  }));
  const hoot = data.map((row) => ({
    x: row[25],
    y: row[8],
    z: row[1],
  }));

  const temp = data.map((row) => ({
    x: row[25],
    y: Number(row[14]),
  }));
  const pressure = data.map((row) => ({
    x: row[25],
    y: Number(row[15]),
  }));
  const humidity = data.map((row) => ({
    x: row[25],
    y: Number(row[16]),
  }));
  const calenderData = data.map((row) => ({
    x: row[25],
    y: Number(row[9]),
  }));

  // const { totalCount, progress } = useVariablecount({
  //   data: staticData,
  // });

  const totalCounts = [
    {
      title: "Count",
      value: useVariablecount({ data: hoot }),
      description: "Warning",
    },
    {
      title: "Static Count",
      value: useVariablecount({ data: staticData }),
      description: "Static",
    },

    {
      title: "Spark Count",
      value: useVariablecount({ data: sparkData }),
      description: "Spark",
    },
    {
      title: "Weather",
      value: useVariablecount({ data: envData }),
      description: "Environment ",
    },
    {
      title: "Battery",
      //@ts-expect-error
      value: useBatteryCal({ data: batteryData }),
      description: "Battery ",
    },
  ];

  // const { nameCounts } = useVariablecount({
  //   data: data.map((row) => ({ x: row[25], y: row[8], z: row[1] })),
  // });

  const transformedUniqueData: UniqueRow[] = uniqueDataLast10Minutes.map(
    (name, index) => ({
      id: index + 1,
      name,
    })
  );

  return (
    <>
      <Title order={2} td="underline" ta="center" c={getTextColor(back)}>
        Welcome,{username || "Guest"}
      </Title>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>

        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Card shadow="xl" withBorder radius="lg">
            <Title order={2} ta="center" td="underline">
              Live Lightning Status
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 0.5, lg: 0.5 }}></Grid.Col>{" "}
              <Grid.Col span={{ base: 12, md: 11, lg: 5 }}>
                <Progress_bar
                  data={transformedData}
                  temp={temp}
                  pressure={pressure}
                  humidity={humidity}
                />
              </Grid.Col>{" "}
              <Grid.Col span={{ base: 12, md: 0.5, lg: 0.5 }}></Grid.Col>
              <Grid.Col span={{ base: 12, md: 11, lg: 3 }}>
                <Field_values
                  data={diaDataElectroStatic}
                  color="yellow"
                  title="Electro-Static"
                />
                <Field_values data={diaDataSpark} color="green" title="Spark" />
                <Field_values
                  data={diaDataEnvironment}
                  color="blue"
                  title="Environment"
                />
              </Grid.Col>{" "}
              <Grid.Col span={{ base: 12, md: 5, lg: 3 }}></Grid.Col>
              <Grid.Col span={{ base: 12, md: 5, lg: 0.5 }}></Grid.Col>{" "}
            </Grid>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>

        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <CommonCards data={totalCounts} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>

        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card withBorder radius="lg" shadow="lg">
            <HomeTable data={data} uniqueValues={transformedUniqueData} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card p="xl" withBorder radius="lg" shadow="lg">
            <Lmap data={mapData} />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Grid mt="xl" mb="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>

        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Card p="xl" withBorder radius="lg" shadow="lg">
            <Calender data={calenderData} />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default LmasHome;
