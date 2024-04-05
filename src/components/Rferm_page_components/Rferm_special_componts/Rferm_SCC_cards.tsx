import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconAlertTriangle,
  IconHeartbeat,
  IconFirstAidKit,
  IconSum,
} from "@tabler/icons-react";
import React from "react";

interface DataItem {
  description: string;
  title: string;
  value: string | number;
}

interface IndividualCardProps {
  color: string;
  data: DataItem;
}

const IndividualCard: React.FC<IndividualCardProps> = ({ color, data }) => {
  //   console.log("data for individual cards", data);
  if (!data) {
    return <Paper p="md">Loading...</Paper>; // Or a custom message
  }
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <Text c="dimmed" fw={700} size="md">
        {data.description}
      </Text>
      <Group justify="space-between">
        {data.title === "Battery" ? (
          <Text c={color} fw={700} size="xl" style={{ fontSize: "2.5rem" }}>
            {data.value} %
          </Text>
        ) : (
          <Text c={color} fw={700} size="xl" style={{ fontSize: "2.5rem" }}>
            {data.value}
          </Text>
        )}
        {data.title === "Danger" && (
          <IconAlertTriangle
            stroke={2}
            width={40}
            height={40}
            color="#c51d31"
          />
        )}
        {data.title === "Healthy" && (
          <IconHeartbeat stroke={2} width={40} height={40} color="#24782c" />
        )}
        {data.title === "Un-Healthy" && (
          <IconFirstAidKit stroke={2} width={40} height={40} color="#d14d14" />
        )}
        {data.title === "Total Pits" && (
          <IconSum stroke={2} width={40} height={40} color="#1dbac5" />
        )}
      </Group>
      <Group justify="flex-start">
        <Text ta="center" fw={700} tt="uppercase">
          {data.title}
        </Text>
      </Group>
    </Paper>
  );
};

interface RfermCardsProps {
  data: DataItem[];
}

const Rferm_SCC_cards: React.FC<RfermCardsProps> = ({ data }) => {
  if (!data) {
    return <p>Please click on the pin</p>;
  }
  //   console.log("data in common cards", data);
  const colors = ["#c51d31", "#d14d14", "#24782c", "#1dbac5"];
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
      {colors.map((color, index) => (
        <IndividualCard key={index} color={color} data={data[index]} />
      ))}
    </SimpleGrid>
  );
};

export default Rferm_SCC_cards;
