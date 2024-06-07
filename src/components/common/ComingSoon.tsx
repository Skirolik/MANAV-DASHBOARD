import { Card, Grid, Loader, Paper, Title } from "@mantine/core";
import React from "react";

const ComingSoon = () => {
  return (
    <div>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Card>
            <Paper bg="transparent" p="xl">
              <Title>WEBSITE</Title>
              <Title order={2} ta="center" td="underline">
                UNDER CONSTRUCTION
              </Title>
            </Paper>

            <Loader type="bars" size={50} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </div>
  );
};

export default ComingSoon;
