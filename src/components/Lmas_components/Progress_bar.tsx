import React, { useEffect, useState } from "react";
import { Progress, Card, Text, Grid, Title } from "@mantine/core";
// import Field_values from "./Field_values";

interface ProgressProps {
  data: { x: number; y: number; z: string }[];
  temp: { x: number; y: number }[];
  pressure: { x: number; y: number }[];
  humidity: { x: number; y: number }[];
}

const Progress_bar: React.FC<ProgressProps> = ({
  data,
  temp,
  pressure,
  humidity,
}) => {
  // console.log("nar", data);
  // console.log("val", temp);
  const initialYValue = data.length > 0 ? data[0].y : 0;
  //   console.log("yval", initialYValue);
  const initialTempValue = temp.length > 0 ? temp[0].y : 0;
  // console.log("initial Temp Value", initialTempValue);
  const initialPressureValue = pressure.length > 0 ? pressure[0].y : 0;
  // console.log("initial Temp Value", initialPressureValue);
  const initialHumidityValue = humidity.length > 0 ? humidity[0].y : 0;
  // console.log("initial Temp Value", initialHumidityValue);

  const [latestTempValue, setLatestTempValue] = useState(initialTempValue);
  // const [tempValue, setTempValue] = useState(0);
  const [latestPressureValue, setLatestPressureValue] =
    useState(initialPressureValue);
  const [latestHumidityValue, setLatestHumidityValue] =
    useState(initialHumidityValue);

  const [latestYValue, setLatestYValue] = useState(initialYValue);
  const latestName = data.length > 0 ? data[0].z : "";

  //Temperature Display
  useEffect(() => {
    // Function to update temperature value based on the 10-minute threshold
    const updateTemperatureValue = () => {
      if (temp.length > 0) {
        const lastTempPoint = temp[temp.length - 1];
        let latestTempValue = lastTempPoint.y - 272.15;
        latestTempValue = Math.round(latestTempValue * 100) / 100;
        const zeroTime = 10 * 60 * 1000; // 10 minutes in milliseconds
        const timeNow = new Date().getTime();
        const savedTime = new Date(lastTempPoint.x).getTime();
        const difference = timeNow - savedTime;

        if (difference >= zeroTime) {
          setLatestTempValue(0);
        } else {
          setLatestTempValue(latestTempValue);
        }
      }
    };

    updateTemperatureValue();

    const intervalId = setInterval(updateTemperatureValue, 60 * 1000); // Every minute

    return () => clearInterval(intervalId);
  }, [temp]);

  //Pressure Display
  useEffect(() => {
    const updatePressureValue = () => {
      if (pressure.length > 0) {
        const lastPressurePoint = pressure[pressure.length - 1];
        // console.log("latest Temp", lastPressurePoint.y);
        const latestPresValue = lastPressurePoint.y;
        const timeReq = 10 * 60 * 1000;

        const time = new Date().getTime();
        const trigtime = new Date(lastPressurePoint.x).getTime();
        const tD = time - trigtime;

        if (tD >= timeReq) {
          setLatestPressureValue(0);
        } else {
          setLatestPressureValue(latestPresValue);
        }
      }
    };

    updatePressureValue();
    const intervalId = setInterval(updatePressureValue, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [pressure]);

  //humidity Display
  useEffect(() => {
    const updateHumidityValue = () => {
      if (humidity.length > 0) {
        const lastHumidityPoint = humidity[humidity.length - 1];
        // console.log("latest Temp", lastHumidityPoint.y);
        const latestHumValue = lastHumidityPoint.y;
        //const initialPercentage = lastDataPoint.y; // Initial percentage
        const timeToReduce = 10 * 60 * 1000; // 10 minutes in milliseconds

        const currentTime = new Date().getTime();
        const triggerTime = new Date(lastHumidityPoint.x).getTime();
        // console.log("triggertime", triggerTime);
        const timeDifference = currentTime - triggerTime;
        // console.log("TD", timeDifference);

        if (timeDifference >= timeToReduce) {
          setLatestHumidityValue(0);
        } else {
          setLatestHumidityValue(latestHumValue);
        }

        // Calculate the reduced percentage based on time difference
      }
    };

    updateHumidityValue();

    const id = setInterval(updateHumidityValue, 60 * 1000);
    return () => clearInterval(id);
  }, [humidity]);

  const getColor = (yValue: number) => {
    if (yValue < 50) {
      return "green";
    } else if (yValue >= 50 && yValue <= 60) {
      return "yellow";
    } else {
      return "red";
    }
  };
  useEffect(() => {
    if (data.length > 0) {
      const lastDataPoint = data[data.length - 1];
      const initialPercentage = lastDataPoint.y; // Initial percentage
      const timeToReduce = 10 * 60 * 1000; // 10 minutes in milliseconds

      // Calculate the percentage reduction required per minute
      const percentageReductionPerMinute =
        initialPercentage / (timeToReduce / (1000 * 60));

      const currentTime = new Date().getTime();
      const triggerTime = new Date(lastDataPoint.x).getTime();
      const timeDifference = currentTime - triggerTime;

      // Calculate the reduced percentage based on time difference
      const calculatedPercentage = Math.max(
        initialPercentage -
          percentageReductionPerMinute * (timeDifference / (1000 * 60)),
        0
      );
      setLatestYValue(calculatedPercentage);

      const intervalId = setInterval(() => {
        setLatestYValue((prevYValue) =>
          Math.max(prevYValue - percentageReductionPerMinute, 0)
        );
      }, 1 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [data]);

  // Calculate the color based on the latestYValue
  const color = getColor(latestYValue);

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Title order={2} ta="center" td="underline">
            {latestName}
          </Title>

          <Progress
            value={latestYValue}
            color={color}
            animated
            striped
            size="xl"
            mb="xl"
            mt="xl"
            style={{ borderRadius: "50px", width: "100%" }}
          />
          <Grid mt="xl">
            <Grid.Col span={{ base: 12, md: 7, lg: 4 }}>
              <Card withBorder shadow="xl" radius="lg">
                <Text mb="md" fz="xl" ta="center">
                  Temp
                </Text>
                <Text fz="lg" ta="center">
                  {latestTempValue}
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7, lg: 4 }}>
              <Card withBorder shadow="xl" radius="lg">
                <Text mb="md" ta="center" fz="xl">
                  Pressure
                </Text>
                <Text fz="lg" ta="center">
                  {latestPressureValue}
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7, lg: 4 }}>
              <Card
                withBorder
                shadow="xl"
                radius="lg"
                style={{ height: "100%" }}
              >
                <Text mb="md" ta="center" fz="xl">
                  Humidity
                </Text>
                <Text fz="lg" ta="center">
                  {latestHumidityValue}
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>{" "}
      </Grid>
    </>
  );
};

export default Progress_bar;

// style={{ borderLeft: "2px solid #AEAEAE" }}
