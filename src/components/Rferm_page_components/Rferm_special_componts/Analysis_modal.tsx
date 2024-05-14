import { Badge, Card, Grid, Loader, Table, Text, Title } from "@mantine/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "@mantine/charts/styles.css";
import { RadarChart } from "@mantine/charts";

interface PitDeatails {
  pit_name: string;
  status: string;
  battery: number;
  latest: number;
  fault_count: number;
  ground_step: number;
  ground_touch: number;
  lightning_step: number;
  lightning_touch: number;
  mac_id: string;
}

interface CardProps {
  pitData: PitDeatails;
}

interface AnalysisData {
  mean: number;
  variance: number;
  standard_deviation: number;
  total_unsafe: number;
  total_danger: number;
  total_leakage: number;
  in_danger: number;
  in_unsafe: number;
  in_normal: number;
  data?: { product: string; value: number }[];
}

const Analysis_modal: React.FC<CardProps> = ({ pitData }) => {
  console.log("data", pitData.mac_id);

  const [pitDetails, setPitDetails] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        console.log("Fetching analysis Data");
        const response = await axios.post(
          "http://localhost:6124/calculate_leakage_current",
          {
            mac_id: pitData.mac_id,
          }
        );
        console.log(response.data);
        setPitDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error Ocuured", error);
      }
    };
    fetchAnalysisData();
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

  return (
    <>
      <Title>
        <Badge mr="lg">Beta</Badge>
        Analysis:{pitData.pit_name}
      </Title>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card p="xl" mt="lg" withBorder shadow="xl" radius="lg">
            <Text ta="center" td="underline">
              Analyis values
            </Text>
            <Table
              striped
              highlightOnHover
              withTableBorder
              withColumnBorders
              mt="lg"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Data Type</Table.Th>
                  <Table.Th>Value</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {pitDetails &&
                  Object.entries(pitDetails).map(([key, value]) => {
                    if (key !== "data") {
                      return (
                        <Table.Tr key={key}>
                          <Table.Td>{key}</Table.Td>
                          <Table.Td>
                            {key === "Mean"
                              ? `${value} Ω`
                              : key.includes("Percentage")
                              ? `${value} %`
                              : typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </Table.Td>
                        </Table.Tr>
                      );
                    }
                    return null;
                  })}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card mt="lg" withBorder shadow="xl" radius="lg">
            <Text ta="center" td="underline">
              Earthpit Value Distribution
            </Text>
            {pitDetails && (
              <RadarChart
                h={300}
                data={pitDetails.data || []}
                dataKey="product"
                withPolarRadiusAxis
                series={[{ name: "value", color: "blue.4", opacity: 0.2 }]}
              />
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      {pitDetails?.total_unsafe}
    </>
  );
};

export default Analysis_modal;
