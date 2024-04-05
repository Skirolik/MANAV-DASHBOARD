import _React, { useState, useEffect } from "react";
import Legned from "./Legned";
import axios from "axios";
// import { Normal_reading } from "../../testingData/Normal_reading";
import { Card, Group, Title, Loader } from "@mantine/core";
import Grid_resistance_chart from "./Grid_resistance_chart";

const NormalReadingGraph = ({ macid }: { macid: string | null }) => {
  console.log("mac_id", macid);
  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;
  const [pitData, setPitData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPitData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.post("/api/rferm/pit/data", {
          macId: macid,
          fromDate: "",
          toDate: "",
        });
        setPitData(response.data.data);
        console.log("mapData", response.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 10);
      } catch (error) {
        console.error("Error fetching map data:", error);
        setIsLoading(false);
      }
    };

    fetchPitData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "500px", position: "relative" }}>
        {" "}
        <Loader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  const {
    current_status,
    latest_reading,
    pit_name,
    resistance,
    warning_one,
    warning_two,
  } = pitData[0];

  return (
    <>
      <Title order={2} ta="center" td="underline">
        Details:
      </Title>
      <Card p="xl" mt="xl">
        <Card.Section>
          <Group justify="space-between">
            <Title order={3}>Pit Name : {pit_name}</Title>
            <Title order={3}>Current Status: {current_status}</Title>
            <Title order={3}>Latest Reading: {latest_reading} Ω</Title>
          </Group>
        </Card.Section>
        <Card.Section mt="xl">
          <Grid_resistance_chart
            data={resistance}
            color="#2E93fA"
            warning_one={warning_one}
            warning_two={warning_two}
          />
        </Card.Section>
        <Card.Section>
          <Legned />
        </Card.Section>
      </Card>
    </>
  );
};

export default NormalReadingGraph;
