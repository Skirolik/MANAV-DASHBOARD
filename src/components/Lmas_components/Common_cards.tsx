import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";

interface CardItem {
  title: string;
  value: string | number;
  description: string;
}

interface LmasCardProps {
  color: string;
  data: CardItem;
}

const IndividualCard: React.FC<LmasCardProps> = ({ color, data }) => {
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
      </Group>
      <Group justify="flex-start">
        <Text ta="center" fw={700} tt="uppercase">
          {data.title}
        </Text>
      </Group>
    </Paper>
  );
};

interface LmasDataProp {
  data: CardItem[];
}

const CommonCards: React.FC<LmasDataProp> = ({ data }) => {
  if (!data) {
    return <p>Data is not available yet.</p>;
  }
  //   console.log("data in common cards", data);
  const colors = ["#c51d31", "#d14d14", "#24782c", "#1dbac5", "#cf9a14"];

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 5 }}>
      {colors.map((color, index) => (
        <IndividualCard key={index} color={color} data={data[index]} />
      ))}
    </SimpleGrid>
  );
};

export default CommonCards;
