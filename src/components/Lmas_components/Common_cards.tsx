import { Group, Loader, Paper, SimpleGrid, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface CardItem {
  title: string;
  value: { name: string; totalCount: number }[];
  description: string;
}

interface LmasCardProps {
  color: string;
  data: CardItem;
}

const IndividualCard: React.FC<LmasCardProps> = ({ color, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.value.length - 1 ? 0 : prevIndex + 1
      );
    }, 30000); // Flip every 30 seconds

    return () => clearInterval(interval);
  }, [data.value.length]);

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      style={{
        borderLeft: `6px solid ${color}`,
        transition: "transform 1s ease", // CSS transition
        transform: `rotateY(${currentIndex % 2 === 0 ? 0 : -360}deg)`, // Apply flip based on currentIndex
        boxShadow: `0px 0px 40px ${color && `${color}4D`}`, // Add boxShadow directly
        cursor: "pointer",
      }}
    >
      {data.value.length > 0 ? (
        <>
          <Text c="dimmed" fw={700} size="md">
            {data.value[currentIndex].name} : {data.description}
          </Text>
          <Group justify="space-between">
            <Text
              c={color}
              fw={700}
              size="xl"
              style={{
                fontSize: "2.5rem",
                textShadow: `2px 2px 4px ${color && `${color}4D`}`,
              }}
            >
              {data.value[currentIndex].totalCount}
            </Text>
          </Group>
        </>
      ) : (
        <Loader />
      )}
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
  const colors = ["#c51d31", "#d14d14", "#24782c", "#1dbac5", "#cf9a14"];
  console.log("Data in cards", data);
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 5 }}>
      {colors.map((color, index) => (
        <IndividualCard key={index} color={color} data={data[index]} />
      ))}
    </SimpleGrid>
  );
};

export default CommonCards;
