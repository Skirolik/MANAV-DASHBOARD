import {
  Badge,
  Card,
  Divider,
  Flex,
  Grid,
  Loader,
  Table,
  Text,
  Title,
  useComputedColorScheme,
} from "@mantine/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "@mantine/charts/styles.css";

import Polar_chart from "./Polar_chart";

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
  total_normal: number;

  total_measuments: number;
  warning_one: number;
  warning_two: number;
  data?: { product: string; value: number }[];
}

const Analysis_modal: React.FC<CardProps> = ({ pitData }) => {
  const [pitDetails, setPitDetails] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const computedColorScheme = useComputedColorScheme("dark");

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
        console.log("response data", response.data);
        setPitDetails({
          mean: response.data.Mean,
          variance: response.data.Variance,
          standard_deviation: response.data.Standard_Deviation,
          total_unsafe: response.data.Percentage_Unsafe,
          total_danger: response.data.Percentage_Danger_in_unsafe,
          total_leakage: response.data.Percentage_Leakage_current,
          total_normal: response.data.Percentage_Normal,
          total_measuments: response.data.Total_Measurments,
          warning_one: response.data.warning_one,
          warning_two: response.data.warning_two,

          data: response.data.data, // Assuming the response contains data for the chart
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error Ocuured", error);
      }
    };
    fetchAnalysisData();
  }, []);

  const getTextColor = (value: number, range: string) => {
    if (range === "0-20" && value < 20) return "red";
    if (range === "20-50" && value >= 20 && value <= 50) return "orange";
    if (range === "Above 50" && value > 50) return "green";
    return computedColorScheme === "dark" ? "white" : "black";
  };
  const getTextColors = (value: number, range: string) => {
    if (range === "0-20" && value < 20) return "green";
    if (range === "20-50" && value >= 20 && value <= 50) return "orange";
    if (range === "Above 50" && value > 50) return "red";
    return computedColorScheme === "dark" ? "white" : "black";
  };

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
      <Title order={2} td="underline" ta="center">
        Analysis:{pitData.pit_name}
        <Badge mr="lg" variant="outline">
          Beta
        </Badge>
      </Title>

      <Flex
        mih={50}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        mt="xl"
      >
        <Text size="xl" fw={700}>
          {" "}
          Current Status of pit: {pitData.status}
        </Text>
        <Text size="xl" fw={700}>
          Latest Resistance Value: {pitData.latest} Ω
        </Text>
        <Text size="xl" fw={700}>
          Threshold 1: {pitDetails?.warning_one} Ω
        </Text>
        <Text size="xl" fw={700}>
          Threshold 2: {pitDetails?.warning_one} Ω
        </Text>
      </Flex>

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card p="xl" mt="lg" withBorder shadow="xl" radius="lg">
            <Text ta="center" td="underline">
              Analyis
            </Text>
            <Table
              striped
              highlightOnHover
              withTableBorder
              withColumnBorders
              mt="lg"
            >
              <Table.Tbody>{pitDetails && <></>}</Table.Tbody>
            </Table>
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
                {pitDetails && (
                  <>
                    <Table.Tr>
                      <Table.Td>Mean</Table.Td>
                      <Table.Td>{pitDetails.mean} Ω</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Variance</Table.Td>
                      <Table.Td>{pitDetails.variance}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Standard Deviation</Table.Td>
                      <Table.Td>{pitDetails.standard_deviation}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Total Measurements</Table.Td>
                      <Table.Td>{pitDetails.total_measuments}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Percentage in Normal level</Table.Td>
                      <Table.Td>{pitDetails.total_normal}%</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Percentage in Unsafe zone</Table.Td>
                      <Table.Td>{pitDetails.total_unsafe}%</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        Readings in Danger zone from Unsafe zone
                      </Table.Td>
                      <Table.Td>{pitDetails.total_danger}%</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        Percentage Leakage/increment in resistance
                      </Table.Td>
                      <Table.Td>{pitDetails.total_leakage}%</Table.Td>
                    </Table.Tr>
                  </>
                )}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card mt="lg" withBorder shadow="xl" radius="lg">
            <Text ta="center" td="underline">
              Earthpit Value Distribution
            </Text>
            {pitDetails && <Polar_chart data={pitDetails.data || []} />}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Grid mt="xl" mb="lg">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 10 }}>
          <Card mt="lg" withBorder shadow="xl" radius="lg">
            <Card.Section p="lg">
              <Text>
                Out of the total readings {pitDetails?.total_unsafe}% the pit
                was in unsafe zone i.e. above the threshold level 1. Out of this
                percentage , {pitDetails?.total_danger}% was in danger zone. And
                normal level was seen for about {pitDetails?.total_normal}%. The
                resistance of pit has increased due to some leakage{" "}
                {pitDetails?.total_leakage} % times.
              </Text>
            </Card.Section>
            <Card.Section p="lg">
              <Divider />
              <Grid mt="md">
                <Grid.Col span={6}>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th ta="center">Normal Data</Table.Th>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Th>Explanation</Table.Th>
                        <Table.Th>Range</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <>
                        <Table.Tr
                          style={{
                            color: getTextColor(
                              pitDetails?.total_normal || 0,
                              "0-20"
                            ),
                          }}
                        >
                          <Table.Td>
                            Pit condition is not good, we recommend maintenance
                            and/or changing the pit to maintenance free.
                          </Table.Td>
                          <Table.Td>0-20 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColor(
                              pitDetails?.total_normal || 0,
                              "20-50"
                            ),
                          }}
                        >
                          <Table.Td>
                            Pit is in OK condition needs to be monitored to see
                            if it detoriates further.
                          </Table.Td>
                          <Table.Td>20-50 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColor(
                              pitDetails?.total_normal || 0,
                              "Above 50"
                            ),
                          }}
                        >
                          <Table.Td>
                            Pit is Good , just regular maintenance should be
                            sufficient.
                          </Table.Td>
                          <Table.Td>Above 50%</Table.Td>
                        </Table.Tr>
                      </>
                    </Table.Tbody>
                  </Table>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th ta="center">Danger Data</Table.Th>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Th>Explanation</Table.Th>
                        <Table.Th>Range</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_danger || 0,
                              "0-20"
                            ),
                          }}
                        >
                          <Table.Td>
                            Monitor the pit daily to see if the value increases
                          </Table.Td>
                          <Table.Td>0-20 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_danger || 0,
                              "20-50"
                            ),
                          }}
                        >
                          <Table.Td>
                            Regular maintenance should be conducted for this
                            pit.
                          </Table.Td>
                          <Table.Td>20-50 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_danger || 0,
                              "Above 50"
                            ),
                          }}
                        >
                          <Table.Td>
                            High amount of unsafe data is in danger zone we
                            recommend immediate maintenance, or locate the cause
                            of fault.
                          </Table.Td>
                          <Table.Td>Above 50%</Table.Td>
                        </Table.Tr>
                      </>
                    </Table.Tbody>
                  </Table>
                </Grid.Col>
              </Grid>
            </Card.Section>
            {/* Next */}
            <Card.Section p="lg">
              <Divider />
              <Grid mt="md">
                <Grid.Col span={6}>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th ta="center">Unsafe Data</Table.Th>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Th>Explanation</Table.Th>
                        <Table.Th>Range</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_unsafe || 0,
                              "0-20"
                            ),
                          }}
                        >
                          <Table.Td>Pit is in good condition</Table.Td>
                          <Table.Td>0-20 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_unsafe || 0,
                              "20-50"
                            ),
                          }}
                        >
                          <Table.Td>
                            Pit is a concern and needs to be monitored
                          </Table.Td>
                          <Table.Td>20-50 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_unsafe || 0,
                              "Above 50"
                            ),
                          }}
                        >
                          <Table.Td>
                            The pit is critical we recommend maintenance.
                          </Table.Td>
                          <Table.Td>Above 50%</Table.Td>
                        </Table.Tr>
                      </>
                    </Table.Tbody>
                  </Table>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th ta="center">Leakage Current</Table.Th>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Th>Explanation</Table.Th>
                        <Table.Th>Range</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_leakage || 0,
                              "0-20"
                            ),
                          }}
                        >
                          <Table.Td>
                            These amount of faults/variation is normal
                          </Table.Td>
                          <Table.Td>0-20 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_leakage || 0,
                              "20-50"
                            ),
                          }}
                        >
                          <Table.Td>
                            Pit needs to be montiored, currently not critical.
                          </Table.Td>
                          <Table.Td>20-50 %</Table.Td>
                        </Table.Tr>
                        <Table.Tr
                          style={{
                            color: getTextColors(
                              pitDetails?.total_leakage || 0,
                              "Above 50"
                            ),
                          }}
                        >
                          <Table.Td>
                            The pit is critical we recommend maintenance.
                          </Table.Td>
                          <Table.Td>Above 50%</Table.Td>
                        </Table.Tr>
                      </>
                    </Table.Tbody>
                  </Table>
                </Grid.Col>
              </Grid>
            </Card.Section>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default Analysis_modal;
