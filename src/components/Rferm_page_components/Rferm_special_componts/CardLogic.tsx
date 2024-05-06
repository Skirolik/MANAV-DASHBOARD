import { Card, Grid, Text } from "@mantine/core";
import React from "react";
import { useDrag } from "react-dnd";

interface CardData {
  id: number;
  name: string;
}

const CardLogic: React.FC<CardData> = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <>
      <Grid>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
          <Card
            style={{ border: isDragging ? "5px solid pink" : "0px" }}
            ref={drag}
          >
            <Text>{id}</Text>
            <Text>{name}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}></Grid.Col>
      </Grid>
    </>
  );
};

export default CardLogic;
