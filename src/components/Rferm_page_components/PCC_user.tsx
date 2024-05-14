import React, { useState, useEffect } from "react";
import RfermCards from "./Rferm_special_componts/RfermCards";
import { Card, Grid, Text } from "@mantine/core";
import "@mantine/charts/styles.css";
import axios from "axios";
import RecentActivity from "./Rferm_special_componts/RecentActivity";
import PercentageCalculator from "./Rferm_special_componts/PercentageCalculator";
// import { Map_data } from "../testingData/Map_data";
import { Rferm_map } from "./Rferm_special_componts/Rferm_map";
import Fault_chart from "./Rferm_special_componts/Fault_chart";

export interface RfermHomeData {
  danger_count: number;
  unhealthy_count: number;
  healthy: number;
  total: number;
  first_R_a: { date: string; status: string; area: string };
  second_R_a: { date: string; status: string; area: string };
  third_R_a: { date: string; status: string; area: string };
  fourth_R_a: { date: string; status: string; area: string };
  fifth_R_a: { date: string; status: string; area: string };
  sixth_R_a: { date: string; status: string; area: string };
  seventh_R_a: { date: string; status: string; area: string };
  eight_R_a: { date: string; status: string; area: string };
  nineth_R_a: { date: string; status: string; area: string };
  tenth_R_a: { date: string; status: string; area: string };
  Grid_resistance: { Date: string; value: number }[];
  activity: number;
}

interface Props {
  data: RfermHomeData[];
  back: string;
}

const PCC_user: React.FC<Props> = ({ data }) => {
  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;
  const [mapData, setMapData] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  const persona = localStorage.getItem("persona");
  const useremail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.post("/api/rferm/mapdata", {
          email: useremail,
          persona: persona,
        });
        setMapData(response.data.data);
        console.log("mapData", response.data.data);
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1);
      } catch (error) {
        console.error("Error fetching map data:", error);
        // setIsLoading(false);
      }
    };

    fetchMapData();
  }, []);

  console.log("Data PCC_user", data);

  const {
    danger_count = 0,
    unhealthy_count = 0,
    healthy = 0,
    total = 0,
  } = data[0];

  localStorage.setItem("totalpits", total.toString());
  console.log("total-", typeof total);

  const totalData = [
    {
      title: "Danger",
      value: danger_count,
      description: "Pits",
    },
    {
      title: "Un-Healthy",
      value: unhealthy_count,
      description: "Pits ",
    },
    {
      title: "Healthy",
      value: healthy,
      description: "Pits ",
    },
    {
      title: "Total Pits",
      value: total,
      description: "Total ",
    },
  ];

  // if (isLoading) {
  //   return (
  //     <div>
  //       {" "}
  //       <Loader
  //         style={{
  //           position: "absolute",
  //           top: "50%",
  //           left: "50%",
  //           transform: "translate(-50%, -50%)",
  //         }}
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <RfermCards data={totalData} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card withBorder radius="lg">
            <Text ta="center" size="xl" fw={800}>
              Recent Activity
            </Text>
            <RecentActivity data={data} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card withBorder radius="lg" shadow="lg">
            <Text ta="center" size="xl" fw={800}>
              Percentage Distribution
            </Text>
            <PercentageCalculator
              dangerCount={danger_count}
              unhealthyCount={unhealthy_count}
              healthyCount={healthy}
              totalCount={total}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      {/* <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Card withBorder radius="lg" shadow="lg">
            <Text ta="center" size="xl" fw={800} td="underline">
              Grid Resistance
            </Text>
            <Fault_chart data={Grid_resistance} color="#3A99FA" />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid> */}
      <Grid mt="xl" mb="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Card withBorder radius="lg" shadow="lg">
            <Rferm_map data={mapData} />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default PCC_user;
