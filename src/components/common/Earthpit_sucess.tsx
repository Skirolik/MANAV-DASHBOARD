import { Button, Card, Grid, Spoiler, Table, Title } from "@mantine/core";
import React from "react";

interface EarthpitsucsessProps {
  setEarthpitSuccess: (value: boolean) => void;
}

const Earthpit_sucess: React.FC<EarthpitsucsessProps> = ({
  setEarthpitSuccess,
}) => {
  const soil_rsistivity = window.localStorage.getItem("soil");
  const couplers = window.localStorage.getItem("couplers");
  const pit = window.localStorage.getItem("pit");
  const no_of_rods = window.localStorage.getItem("no_of_rods");
  const rounded_len = window.localStorage.getItem("rounded_len");
  const curec_plus = window.localStorage.getItem("curec_plus");
  const curec_con = window.localStorage.getItem("curec_con");
  const earth_bar = window.localStorage.getItem("earth_bar");
  const hardware_set = window.localStorage.getItem("hardware_set");
  const diameter = window.localStorage.getItem("diameter");
  const target_resistance = window.localStorage.getItem("target_resistance");

  const handleBackClick = () => {
    setEarthpitSuccess(false);
  };

  const heading = [
    "Couplers",
    "No of Rods",
    "Curec Plus",
    "Curec Con",
    "Earth Bar",
    "Hardware Set",
  ];
  const valuesColumn1 = [
    couplers,
    no_of_rods,
    curec_plus,
    curec_con,
    earth_bar,
    hardware_set,
  ];
  const valuesColumn2 = ["TBD", "TBD", "TBD", "TBD", "TBD", "TBD"];
  return (
    <>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 7, lg: 7 }}>
          <Card withBorder radius="lg" shadow="lg">
            <Title order={2} td="underline" ta="center">
              Report
            </Title>
            <Table
              mt="lg"
              verticalSpacing="xs"
              striped
              withTableBorder
              withRowBorders
              withColumnBorders
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: "20%" }}>
                    {" "}
                    Soil Resistivity: {soil_rsistivity} Ωm
                  </Table.Th>
                  <Table.Th style={{ width: "20%" }}>
                    {" "}
                    Target Resistance: {target_resistance} Ω
                  </Table.Th>
                  <Table.Th style={{ width: "20%" }}>
                    {" "}
                    Diameter: {diameter} m
                  </Table.Th>
                  <Table.Th style={{ width: "20%" }}>
                    {" "}
                    Earth Pit Required: {pit} nos.
                  </Table.Th>
                  <Table.Th style={{ width: "20%" }}>
                    {" "}
                    Conductor Length: {rounded_len} m
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
            </Table>
            <Table
              mt="lg"
              verticalSpacing="xs"
              striped
              withTableBorder
              withRowBorders
              withColumnBorders
            >
              <Table.Tr>
                <Table.Th style={{ width: "20%" }}></Table.Th>
                <Table.Th style={{ width: "20%" }}>Quantity</Table.Th>
                <Table.Th style={{ width: "20%" }}>Product Code</Table.Th>
              </Table.Tr>
              <Table.Tbody>
                {valuesColumn1.map((value, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{heading[index]}</Table.Td>
                    <Table.Td>{value}</Table.Td>
                    <Table.Td>{valuesColumn2[index]}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
          <Button mt="xl" onClick={handleBackClick}>
            Back
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
          <Card withBorder radius="lg" shadow="lg">
            <Title order={2} td="underline" ta="center" mb="xl">
              Note:
            </Title>
            <Spoiler showLabel="Show more" hideLabel="Hide" maxHeight={200}>
              This Lorem ipsum odor amet, consectetuer adipiscing elit.
              Adipiscing nulla leo commodo egestas facilisi placerat lobortis
              massa. Ornare viverra quam leo ex penatibus taciti. Taciti
              vulputate fames metus magnis mi natoque. Rhoncus scelerisque vel
              lacus eleifend volutpat leo. Adipiscing arcu eros ultrices at
              ipsum. Ut a nascetur, vulputate blandit sem magnis malesuada.
              Praesent inceptos consequat imperdiet lectus mus. Est vulputate
              sed vulputate ut mauris venenatis morbi. Accumsan tellus tempor
              maximus efficitur sagittis faucibus. Tempus dignissim hac magna,
              tempor hendrerit pharetra. Phasellus mattis dignissim sollicitudin
              turpis suscipit a. Tincidunt finibus consequat habitasse porttitor
              vel nam. Accumsan torquent lorem vitae interdum sociosqu aliquam
              inceptos adipiscing lacinia.
            </Spoiler>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default Earthpit_sucess;
