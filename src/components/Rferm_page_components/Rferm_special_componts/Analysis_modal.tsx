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
import { BarChart } from "@mantine/charts";
import { notifications } from "@mantine/notifications";

import Polar_chart from "./Polar_chart";
import ProgressBar from "./ProgressBar";

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
  const [percentageFault, setPercentageFault] = useState<number>(0);
  const [percentageNeagativeAffect, setPercentageNegativeAffect] =
    useState<number>(0);
  const [percentageNoAffect, setPercentageNoAffect] = useState<number>(0);
  const [totalFault, setTotalFault] = useState<number>(0);
  const [percentageAboveFifty, setPercentageAboveFifty] = useState<number>(0);
  const [percentageZeroToTwenty, setPercentageZeroToTwenty] =
    useState<number>(0);
  const [percentageTwentyToFifty, setPercentageTwentyToFifty] =
    useState<number>(0);

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
        console.log("response data", response.data.fault[0]);
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
        setPercentageFault(response.data.fault[0].percentage_fault_affect);
        setPercentageNegativeAffect(
          response.data.fault[0].percentage_neagtive_affect
        );
        setPercentageNoAffect(response.data.fault[0].percentage_no_affect);
        setTotalFault(response.data.fault[0].total_fault);
        setPercentageAboveFifty(response.data.fault[0].percentage_above_fifty);
        setPercentageTwentyToFifty(
          response.data.fault[0].percentage_twenty_to_fifty
        );
        setPercentageZeroToTwenty(
          response.data.fault[0].percentage_zero_to_twenty
        );
        setIsLoading(false);
        notifications.show({
          title: "Success !!",
          message:
            "Just view or Download the report. Contact us for further clarification",
          color: "teal",
        });
      } catch (error) {
        console.error("Error Ocuured in call", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
        });
      }
    };
    fetchAnalysisData();
  }, [pitData.mac_id]);

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

  const getTextColorsNew = (value: number, range: string) => {
    if (range === "0-5" && value < 5) return "green";
    if (range === "5-25" && value >= 5 && value <= 25) return "orange";
    if (range === "Above 25" && value > 25) return "red";
    return computedColorScheme === "dark" ? "white" : "black";
  };

  const data = [
    {
      name: "Percentage Fault Affect",

      AboveFiftyPercentageChange: percentageAboveFifty,
      BetweenTwentyandFiftyPercentageChange: percentageTwentyToFifty,
      LessThanTwentyPercentage: percentageZeroToTwenty,
    },
    {
      name: "Percentage Neagtive ",
      Total: percentageNeagativeAffect,
    },
    {
      name: "Percentage No affect",

      Total: percentageNoAffect,
    },
  ];

  const totalLeakage = pitDetails?.total_leakage || 0;
  const totalDanger = pitDetails?.total_danger || 0;
  const totalUnsafe = pitDetails?.total_unsafe || 0;
  const totalNormal = pitDetails?.total_normal || 0;

  // Count how many values fall into each range
  let lessThan20Count = 0;
  let between20And50Count = 0;
  let above50Count = 0;

  if (totalLeakage < 20) lessThan20Count++;
  else if (totalLeakage >= 20 && totalLeakage <= 50) between20And50Count++;
  else above50Count++;

  if (totalDanger < 20) lessThan20Count++;
  else if (totalDanger >= 20 && totalDanger <= 50) between20And50Count++;
  else above50Count++;

  if (totalUnsafe < 20) lessThan20Count++;
  else if (totalUnsafe >= 20 && totalUnsafe <= 50) between20And50Count++;
  else above50Count++;

  if (totalNormal < 20) above50Count++;
  else if (totalNormal >= 20 && totalNormal <= 50) between20And50Count++;
  else lessThan20Count++;

  // Determine the majority range
  let majorityRange = "";

  if (lessThan20Count > between20And50Count && lessThan20Count > above50Count) {
    majorityRange = "lessThan20";
  } else if (
    between20And50Count > lessThan20Count &&
    between20And50Count > above50Count
  ) {
    majorityRange = "between20And50";
  } else if (
    lessThan20Count == between20And50Count &&
    lessThan20Count == above50Count
  ) {
    majorityRange = "between20And50";
  } else {
    majorityRange = "above50";
  }

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
          Threshold 2: {pitDetails?.warning_two} Ω
        </Text>
      </Flex>
      <Divider />
      <Title order={2} ta="center" td="underline" mt="lg">
        Pit Analysis
      </Title>

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, sm: 1, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, sm: 5, md: 5, lg: 5 }}>
          <Card p="xl" mt="lg" withBorder shadow="xl" radius="lg">
            <Title order={2} ta="center" td="underline">
              Analysis
            </Title>

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
                      <Table.Td>{pitDetails.variance} Ω²</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Standard Deviation</Table.Td>
                      <Table.Td>{pitDetails.standard_deviation} Ω</Table.Td>
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
        <Grid.Col span={{ base: 12, sm: 5, md: 5, lg: 5 }}>
          <Card mt="lg" withBorder shadow="xl" radius="lg">
            <Title order={2} ta="center" td="underline">
              Resistance Distribution
            </Title>
            {pitDetails && <Polar_chart data={pitDetails.data || []} />}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 1, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Grid mt="xl" mb="lg">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Title order={2} ta="center" td="underline">
            Explanation and Recommendation
          </Title>
          <Card mt="lg" withBorder shadow="xl" radius="lg">
            <Card.Section p="lg">
              <Text>
                Out of the total readings {pitDetails?.total_unsafe}% times the
                pit was in unsafe zone i.e. above the threshold level 1. Out of
                this percentage , {pitDetails?.total_danger}% was in danger
                zone. And normal level was seen for about{" "}
                {pitDetails?.total_normal}%. The resistance of pit has increased
                due to some leakage {pitDetails?.total_leakage} % times.
              </Text>
            </Card.Section>
            <Card.Section p="lg">
              <Divider />
              <Title order={2} ta="center" td="underline">
                Pit Condition
              </Title>
              <Grid mt="md">
                <Table
                  striped
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                >
                  <Table.Thead>
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
                          Pit is in OK condition needs to be monitored to see if
                          it detoriates further.
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
                </Table>{" "}
              </Grid>
            </Card.Section>
            {/* Next */}
            <Card.Section p="lg">
              <Divider mt="lg" mb="lg" />
              <Title order={2} ta="center" td="underline">
                Device Condition
              </Title>
              <Grid mt="md">
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  {" "}
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    mb="lg"
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th ta="center">Device Stability</Table.Th>
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
                            The device appears to be safe, regular maintenance
                            should be sufficent.
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
                            The device and pit require's monitoring. We
                            recommend checking the device and pit health and
                            scheduling maintenance to prevent future issues.
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
                            The device is under threat. with most of unsafe data
                            recorded falls under the danger zone. This indicates
                            the device behaviour has a sizable affect on the
                            pits condition.We recommend conducting a root cause
                            analysis (RCA) and addressing the problem promptly.
                          </Table.Td>
                          <Table.Td>Above 50%</Table.Td>
                        </Table.Tr>
                      </>
                    </Table.Tbody>
                  </Table>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    mb="lg"
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th ta="center">Device Reliability</Table.Th>
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
                          <Table.Td>
                            The devices appear to be safe, regular maintenance
                            should be sufficent.
                          </Table.Td>
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
                            Device require monitoring. we recommend checking the
                            device and pit health and scheduling maintenance to
                            prevent further issues.
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
                            Device under threat, with a major portion of
                            reacorded data in unsafe zone. It can be concluded
                            that the device is causing the resistance of the pit
                            to increase. We recommend a root cause analysis
                            (RCA) ro prevent device degradation or malfuntion.
                          </Table.Td>
                          <Table.Td>Above 50%</Table.Td>
                        </Table.Tr>
                      </>
                    </Table.Tbody>
                  </Table>
                </Grid.Col>
              </Grid>
              <Grid mt="xl">
                <Divider />
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    mb="lg"
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th ta="center">Fluctuations</Table.Th>
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
                            These amount of leakage current/variation is normal.
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
                            The pit requires monitoring. While it is not
                            currently critical, there is a high probability of
                            further deterioration. The leakage current from the
                            device is not at an alarming rate at this time, but
                            we recommend checking the device's health and
                            scheduling maintenance to prevent future issues.
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
                            The pit is in a critical condition, with a high
                            amount of leakage current flow. Although the pit's
                            resistance may be low, there are significant
                            fluctuations and variations. This indicates
                            potential faults within the device. If this issue
                            persists, the device may degrade or malfunction,
                            potentially causing a trip. We recommend conducting
                            a root cause analysis (RCA) and addressing the
                            problem promptly.
                          </Table.Td>
                          <Table.Td>Above 50%</Table.Td>
                        </Table.Tr>
                      </>
                    </Table.Tbody>
                  </Table>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                  <Card p="xl" withBorder shadow="xl" radius="lg">
                    <Title order={2} ta="center" td="underline" mb="lg">
                      Plan of action:
                    </Title>
                    <Text>Normal Scheduled maintenance:</Text>
                    <ProgressBar
                      value={majorityRange === "lessThan20" ? 100 : 0}
                      color={"green"}
                    />
                    <Text>Expedited Maintenance:</Text>
                    <ProgressBar
                      value={majorityRange === "between20And50" ? 100 : 0}
                      color={"orange"}
                    />
                    <Text>Root Cause Analysis (RCA):</Text>
                    <ProgressBar
                      value={majorityRange === "above50" ? 100 : 0}
                      color={"red"}
                    />
                  </Card>
                </Grid.Col>
              </Grid>
            </Card.Section>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      {totalFault !== 0 && (
        <>
          {" "}
          <Divider />
          <Title order={2} ta="center" td="underline" mt="lg">
            {" "}
            Fault Analysis
          </Title>
          <Grid mt="xl" mb="lg">
            <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
            <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
              <Card mt="lg" withBorder shadow="xl" radius="lg">
                <Title order={2} ta="center" td="underline">
                  Analysis & recommendation
                </Title>
                <Table
                  striped
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                  mt="lg"
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Td>Description</Table.Td>{" "}
                      <Table.Td>Value</Table.Td>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Total Faults</Table.Td>
                      <Table.Td>{totalFault}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        Percentage Faults affecting pit resistance
                      </Table.Td>
                      <Table.Td>{percentageFault} %</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Percentage Faults which had no affect</Table.Td>
                      <Table.Td>{percentageNoAffect} %</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        Percentage Faults after which resistance reduced
                      </Table.Td>
                      <Table.Td>{percentageNeagativeAffect} %</Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
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
                      <Table.Th>
                        {" "}
                        Percentage Falt affecting pit : Explanation
                      </Table.Th>
                      <Table.Th>Range</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <>
                      <Table.Tr
                        style={{
                          color: getTextColorsNew(percentageFault || 0, "0-5"),
                        }}
                      >
                        <Table.Td>
                          Monitor the device statuses for any fluctuations or
                          anomalies.
                        </Table.Td>
                        <Table.Td>0-5 %</Table.Td>
                      </Table.Tr>
                      <Table.Tr
                        style={{
                          color: getTextColorsNew(percentageFault || 0, "5-25"),
                        }}
                      >
                        <Table.Td>
                          Conduct a comprehensive assessment of the devices to
                          ensure optimal functionality.
                        </Table.Td>
                        <Table.Td>5-25 %</Table.Td>
                      </Table.Tr>
                      <Table.Tr
                        style={{
                          color: getTextColorsNew(
                            percentageFault || 0,
                            "Above 25"
                          ),
                        }}
                      >
                        <Table.Td>
                          Facilitate a Root Cause Analysis (RCA) conducted by a
                          specialized team of experts.
                        </Table.Td>
                        <Table.Td>Above 25%</Table.Td>
                      </Table.Tr>
                    </>
                  </Table.Tbody>
                </Table>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
              {" "}
              <Card mt="lg" withBorder shadow="xl" radius="lg">
                <Title order={2} ta="center" mb="lg" td="underline">
                  {" "}
                  Fault Affect % distribution
                </Title>
                <BarChart
                  mt="lg"
                  h={330}
                  data={data}
                  dataKey="name"
                  type="stacked"
                  unit="%"
                  series={[
                    { name: "AboveFiftyPercentageChange", color: "#F34141" },
                    {
                      name: "BetweenTwentyandFiftyPercentageChange",
                      color: "#FFB01B",
                    },
                    { name: "LessThanTwentyPercentage", color: "#6BD731" },
                    { name: "Total", color: "indigo.6" },
                  ]}
                  fillOpacity={0.7}
                  tickLine="y"
                />
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
          </Grid>
        </>
      )}
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Card mt="lg" withBorder shadow="xl" radius="lg">
            <Text>
              Note: The recommendations above are designed to safeguard your
              equipment and optimize the performance and health of your devices.
              Implementing these measures will enhance the safety of your
              infrastructure and contribute to uninterrupted plant operations.
              For further assistance or a more detailed analysis, please contact
              us. Your proactive approach to maintenance and monitoring will
              help prevent downtime and ensure smooth operations.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default Analysis_modal;
