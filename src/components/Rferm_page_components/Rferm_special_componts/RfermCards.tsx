import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconAlertTriangle,
  IconHeartbeat,
  IconFirstAidKit,
  IconSum,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  //   console.log("data for individual cards", data);
  if (!data) {
    return <Paper p="md">Loading...</Paper>; // Or a custom message
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseClick = () => {
    if (data.title === "Total Pits") {
      navigate(`/details`);
    } else if (data.title === "Un-Healthy") {
      data.title = "Unhealthy";
      localStorage.setItem("cardname", data.title);
      navigate(`/details`);
    } else {
      localStorage.setItem("cardname", data.title);
      navigate(`/details`);
    }
  };
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      style={{
        borderLeft: `6px solid ${color}`,
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.8s ease",
        boxShadow: isHovered ? `0px 0px 40px ${color && `${color}4D`}` : "none",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
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
          <Text
            c={color}
            fw={700}
            size="xl"
            style={{
              fontSize: "2.5rem",
              textShadow: isHovered
                ? `2px 2px 4px ${color && `${color}4D`}`
                : "none",
            }}
          >
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
        {(data.title === "Total Pits" ||
          data.title === "Total PCC's" ||
          data.title === "Total SCC's") && (
          <IconSum stroke={2} width={40} height={40} color="#1dbac5" />
        )}
      </Group>
      <Group justify="flex-start">
        <Text
          ta="center"
          fw={700}
          tt="uppercase"
          style={{
            textShadow: isHovered ? "2px 2px 4px rgba(0, 0, 0, 0.4)" : "none",
          }}
        >
          {data.title}
        </Text>
      </Group>
    </Paper>
  );
};

interface RfermCardsProps {
  data: DataItem[];
}

const RfermCards: React.FC<RfermCardsProps> = ({ data }) => {
  if (!data) {
    return <p>Data is not available yet.</p>;
  }
  //   console.log("data in common cards", data);
  const colors = ["#E60000", "#FF6A1A", "#00B34D", "#1dbac5"];
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
      {colors.map((color, index) => (
        <IndividualCard key={index} color={color} data={data[index]} />
      ))}
    </SimpleGrid>
  );
};

export default RfermCards;
