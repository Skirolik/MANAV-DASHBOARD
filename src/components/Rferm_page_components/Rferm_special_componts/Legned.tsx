import { Badge, Grid, Group, Text } from "@mantine/core";

const Legned = () => {
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Group justify="center" gap="xs">
            <Badge color="#3A99FA" size="xs" />
            <Text>Resistance</Text>
            <Badge color="red" size="xs" />
            <Text>Danger Threshold</Text>
            <Badge color="#FC8C0C" size="xs" />
            <Text>Unhealthy Threshold</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default Legned;
