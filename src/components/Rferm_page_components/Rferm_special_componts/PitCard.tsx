import React, { useState } from "react";
import {
  Card,
  Flex,
  Group,
  Text,
  Title,
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

  return (
    <>
      <LazyLoad>
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
                {pit_name}
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
                  <Text>{ground_step}</Text>
                  <Text>{ground_touch}</Text>
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
                  <Text>{lightning_step}</Text>
                  <Text>{lightning_touch}</Text>
                </Flex>
              </Flex>
            </Group>
          </Card.Section>
        </Card>
      </LazyLoad>
    </>
  );
};

export default PitCard;
