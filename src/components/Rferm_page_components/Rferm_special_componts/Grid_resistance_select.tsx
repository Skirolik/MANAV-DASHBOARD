import { Card, Grid, Group, Modal, SimpleGrid, Title } from "@mantine/core";
import React, { useState } from "react";
// import Grid_resistance_table from "./Grid_resistance_table";

// import { Button } from "@mantine/core";

// import PitCardData from "./PitCardData";
import { IconCircuitGround } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Fault_chart from "./Fault_chart";
import Grid_resistance_table from "./Grid_resistance_table";

export interface GripTable {
  Date: string;
  value: number;
}

const Grid_resistance_select: React.FC<{ data: GripTable[] }> = ({ data }) => {
  console.log("data", data);
  const lastEntry = data[data.length - 1];

  const [isHovered, setIsHovered] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const resistanceColor = (state: number) => {
    return state >= 1 ? "#F34141" : "#6BD731"; // Default to red if state is greater than or equal to 1
  };

  const handleOnClick = () => {
    open();
  };
  return (
    <>
      {/* <Grid_resistance_table data={data} /> */}
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <SimpleGrid cols={4}>
            <div>
              <Card
                p="xl"
                mt="xl"
                shadow="lg"
                withBorder
                radius="md"
                onClick={handleOnClick}
                style={{
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.8s ease",

                  boxShadow: isHovered
                    ? `0px 0px 40px ${
                        resistanceColor(lastEntry.value as number) &&
                        `${resistanceColor(lastEntry.value as number)}4D`
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
                      Pit Name: Transformer LV
                    </Title>
                    <IconCircuitGround
                      stroke={2}
                      style={{
                        width: `40px`, // Adjust width as needed
                        height: `40px`, // Adjust height as needed
                        borderRadius: "50%", // Make the container circular
                        backgroundColor: resistanceColor(
                          lastEntry.value as number
                        ),
                        // Apply the specified background color
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </Group>
                </Card.Section>
                <Card.Section>
                  <Group justify="space-between" mt="sm" mb="lg">
                    {" "}
                    <Title
                      order={4}
                      textWrap="wrap"
                      ml="sm"
                    >{`Date: ${lastEntry.Date}`}</Title>
                    <Title order={4} textWrap="wrap" ml="sm">
                      {`Value: ${lastEntry.value}`}Ω
                    </Title>
                  </Group>
                </Card.Section>
              </Card>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Modal
        opened={opened}
        onClose={close}
        size="calc(100vw - 3rem)"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Title order={4} ta="center" mt="lg" mb="xl">
          {" "}
          Parallel Resistance
        </Title>
        <Fault_chart data={data} color="#3A99FA" />
        <Grid_resistance_table data={data} />
      </Modal>
    </>
  );
};

export default Grid_resistance_select;
