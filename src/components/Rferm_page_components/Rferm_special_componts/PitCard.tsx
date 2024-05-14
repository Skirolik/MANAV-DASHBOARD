import React, { useState } from "react";
import {
  Card,
  Flex,
  Group,
  Text,
  Title,
  Tooltip,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconBolt,
  IconCircuitGround,
  IconWalk,
  IconHandFinger,
} from "@tabler/icons-react";
import LazyLoad from "react-lazy-load";

import BatteryGauge from "react-battery-gauge";

interface RfermPit {
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

interface RfermPitProps {
  pitData: RfermPit;
  onClick: () => void;
}

const PitCard: React.FC<RfermPitProps> = ({ pitData, onClick }) => {
  const {
    pit_name,
    status,
    battery,
    latest,
    fault_count,
    ground_step,
    ground_touch,
    lightning_step,
    lightning_touch,
  } = pitData;

  const computedColorScheme = useComputedColorScheme("light");
  const [isHovered, setIsHovered] = useState(false);

  const resistanceColor = (state: string) => {
    if (state == "Danger") {
      return "#F34141";
    } else if (state == "Unhealthy") {
      return "#FFB01B";
    } else {
      return "#6BD731";
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const faultColor = (fault: number) => {
    if (fault > 0) {
      return "red";
    } else {
      return;
    }
  };

  const gaugeColor = (batteryValue: number) => {
    if (batteryValue >= 80) {
      return "green";
    } else if (batteryValue >= 25) {
      return "orange";
    } else {
      return "red";
    }
  };
  const truncatedName =
    pit_name.length > 10 ? `${pit_name.substring(0, 10)}...` : pit_name;

  const truncatedGroundStep =
    ground_step > 999
      ? `${ground_step.toString().substring(0, 3)}..`
      : ground_step.toString();

  const truncatedGroundTouch =
    ground_touch > 999
      ? `${ground_touch.toString().substring(0, 3)}..`
      : ground_touch.toString();

  const truncatedLightningStep =
    lightning_step > 999
      ? `${lightning_step.toString().substring(0, 3)}..`
      : lightning_step.toString();

  const truncatedLightningTouch =
    lightning_touch > 999
      ? `${lightning_touch.toString().substring(0, 4)}...`
      : lightning_touch.toString();

  return (
    <>
      <LazyLoad>
        <Tooltip
          arrowOffset={10}
          arrowSize={4}
          label={pit_name}
          withArrow
          position="top-start"
        >
          <Card
            withBorder
            p="xl"
            radius="lg"
            mt="xl"
            shadow="xl"
            onClick={onClick}
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.8s ease",
              boxShadow: isHovered
                ? `0px 0px 40px ${
                    resistanceColor(status) && `${resistanceColor(status)}4D`
                  }`
                : "none",
              cursor: "pointer",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Section>
              <Group justify="space-between" mt="sm" mb="lg">
                <Title order={4} textWrap="wrap" ml="sm">
                  {truncatedName}
                </Title>

                <IconCircuitGround
                  stroke={2}
                  style={{
                    width: `40px`, // Adjust width as needed
                    height: `40px`, // Adjust height as needed
                    borderRadius: "50%", // Make the container circular
                    backgroundColor: resistanceColor(status), // Apply the specified background color
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Group>
            </Card.Section>

            <Card.Section>
              <Group justify="space-between" mt="sm" mb="lg">
                <BatteryGauge
                  value={battery}
                  size={60}
                  customization={{
                    batteryBody: {
                      fill: computedColorScheme == "dark" ? "#2E2E2E" : "white",
                      strokeColor:
                        computedColorScheme == "dark" ? "silver" : "black",
                      strokeWidth: 2,
                    },
                    batteryCap: {
                      fill: "none",
                      strokeWidth: 2,
                      strokeColor:
                        computedColorScheme == "dark" ? "silver" : "black",
                      cornerRadius: 3,
                      capToBodyRatio: 0.4,
                    },
                    batteryMeter: {
                      fill: gaugeColor(battery),
                    },
                    readingText: {
                      darkContrastColor: "black",
                      fontFamily: "Arial",
                      fontSize: 18,
                      lightContrastColor:
                        computedColorScheme == "dark" ? "white" : "black",
                      lowBatteryColor: "red",
                    },
                  }}
                />
                <Group>
                  <IconBolt stroke={2} color={faultColor(fault_count)} />
                  <Text>{fault_count}</Text>
                </Group>

                <Text>{latest}Ω</Text>
              </Group>
            </Card.Section>
            {/* <Tooltip
              arrowOffset={10}
              arrowSize={4}
              label={tooltipLabels}
              withArrow
              position="bottom-start"
            > */}
            <Card.Section>
              <Group justify="space-between">
                <Flex
                  mih={50}
                  gap="md"
                  justify="center"
                  align="center"
                  direction="column"
                  wrap="wrap"
                >
                  <Text c="red">Ground(kV)</Text>
                  <Flex
                    justify="space-between"
                    gap="md"
                    direction="row"
                    wrap="wrap"
                    align="center"
                  >
                    <IconWalk stroke={2} />

                    <IconHandFinger stroke={2} />
                  </Flex>
                  <Flex
                    justify="space-between"
                    gap="md"
                    direction="row"
                    wrap="wrap"
                    align="center"
                  >
                    <Tooltip
                      arrowOffset={10}
                      arrowSize={4}
                      label={ground_step}
                      withArrow
                      position="bottom-start"
                    >
                      <Text>{truncatedGroundStep}</Text>
                    </Tooltip>
                    <Tooltip
                      arrowOffset={10}
                      arrowSize={4}
                      label={ground_touch}
                      withArrow
                      position="bottom"
                    >
                      <Text>{truncatedGroundTouch}</Text>
                    </Tooltip>
                  </Flex>
                </Flex>
                <Flex
                  mih={50}
                  gap="md"
                  justify="center"
                  align="center"
                  direction="column"
                  wrap="wrap"
                >
                  <Text c="red">Lightning(kV)</Text>
                  <Flex
                    justify="space-between"
                    gap="md"
                    direction="row"
                    wrap="wrap"
                    align="center"
                  >
                    <IconWalk stroke={2} />

                    <IconHandFinger stroke={2} />
                  </Flex>
                  <Flex
                    justify="space-between"
                    gap="md"
                    direction="row"
                    wrap="wrap"
                    align="center"
                  >
                    <Tooltip
                      arrowOffset={10}
                      arrowSize={4}
                      label={lightning_step}
                      withArrow
                      position="bottom"
                    >
                      <Text>{truncatedLightningStep}</Text>
                    </Tooltip>
                    <Tooltip
                      arrowOffset={10}
                      arrowSize={4}
                      label={lightning_touch}
                      withArrow
                      position="bottom"
                    >
                      <Text>{truncatedLightningTouch}</Text>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Group>
            </Card.Section>
            {/* </Tooltip> */}
          </Card>
        </Tooltip>
      </LazyLoad>
    </>
  );
};

export default PitCard;
