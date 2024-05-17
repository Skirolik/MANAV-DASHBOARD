import { Badge, Grid, Group, Text } from "@mantine/core";

interface GraphProp {
  warning_one: string;
  warning_two: string;
}

const Legned: React.FC<GraphProp> = ({ warning_one, warning_two }) => {
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Group justify="center" gap="xs">
            <Badge color="#3A99FA" size="xs" />
            <Text>Resistance</Text>
            <Badge color="red" size="xs" />
            <Text>Danger Threshold: {warning_two}Ω</Text>
            <Badge color="#FC8C0C" size="xs" />
            <Text>Unhealthy Threshold: {warning_one}Ω</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default Legned;
