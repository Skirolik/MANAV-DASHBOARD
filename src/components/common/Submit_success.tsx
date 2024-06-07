import { Button, Card, Grid, Table, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { Map, Marker } from "react-map-gl";
import Earthpit_calculator from "./Earthpit_calculator";
import { useMediaQuery } from "@mantine/hooks";

interface SubmitSuccessProps {
  setShowSubmitSuccess: (value: boolean) => void;
  setShowEarthpitSuccess: (value: boolean) => void;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

const Submit_success: React.FC<SubmitSuccessProps> = ({
  setShowSubmitSuccess,
  setShowEarthpitSuccess,
}) => {
  const [earthpitCal, setEarthPitCal] = useState(false);
  //Get local storage values
  const soil_rsistivity = window.localStorage.getItem("soil");
  const ionization_gradeint = window.localStorage.getItem("ion");
  const longitude = parseFloat(
    window.localStorage.getItem("long") ?? "0"
  ).toFixed(2);
  const latitude = parseFloat(
    window.localStorage.getItem("lat") ?? "0"
  ).toFixed(2);
  const temperature = window.localStorage.getItem("temp");
  const hum = window.localStorage.getItem("hum");
  const cal = window.localStorage.getItem("cal");
  const erosion = window.localStorage.getItem("erosion");
  const Soil_depth = window.localStorage.getItem("Soil_depth");
  const salinity = window.localStorage.getItem("salinity");
  const surface_texture = window.localStorage.getItem("surface_texture");
  const sodacity = window.localStorage.getItem("sodacity");
  const flooding = window.localStorage.getItem("flooding");
  const drainage = window.localStorage.getItem("drainage");
  const surface_stoniness = window.localStorage.getItem("surface_stoniness");
  const slope = window.localStorage.getItem("slope");

  ///For marker
  const longi = parseFloat(window.localStorage.getItem("long") ?? "0");
  const lati = parseFloat(window.localStorage.getItem("lat") ?? "0");

  //Acosiate soil
  const cal1 = window.localStorage.getItem("cal1");
  const erosion1 = window.localStorage.getItem("erosion1");
  const Soil_depth1 = window.localStorage.getItem("Soil_depth1");
  const salinity1 = window.localStorage.getItem("salinity1");
  const surface_texture1 = window.localStorage.getItem("surface_texture1");
  const sodacity1 = window.localStorage.getItem("sodacity1");
  const flooding1 = window.localStorage.getItem("flooding1");
  const drainage1 = window.localStorage.getItem("drainage1");
  const surface_stoniness1 = window.localStorage.getItem("surface_stoniness1");
  const slope1 = window.localStorage.getItem("slope1");

  const isLargeScreen = useMediaQuery("(min-width:1580px)");

  const handleBackClick = () => {
    setShowSubmitSuccess(false);
    setShowEarthpitSuccess(false);
  };

  const handleClick = () => {
    console.log("Have to show earthpit calculator");
    setShowEarthpitSuccess(true);
    setEarthPitCal(true);
  };

  const heading = [
    "Calcorusness",
    "Erosion",
    "Soil_depth",
    "Salinity",
    "Surface_texture",
    "Sodacity",
    "Flooding",
    "Drainage",
    "Surface Stoniness",
    "Slope",
  ];

  const valuesColumn1 = [
    cal,
    erosion,
    Soil_depth,
    salinity,
    surface_texture,
    sodacity,
    flooding,
    drainage,
    surface_stoniness,
    slope,
  ];
  const valuesColumn2 = [
    cal1,
    erosion1,
    Soil_depth1,
    salinity1,
    surface_texture1,
    sodacity1,
    flooding1,
    drainage1,
    surface_stoniness1,
    slope1,
  ];

  return (
    <>
      {earthpitCal ? (
        <Earthpit_calculator
          setShowEarthpitSuccess={setEarthPitCal}
          soilres={soil_rsistivity}
        />
      ) : (
        <Grid mt="xl">
          <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
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
                      Soil Resistivity: {soil_rsistivity} Ωm
                    </Table.Th>
                    <Table.Th style={{ width: "20%" }}>
                      Longitude: {longitude}
                    </Table.Th>
                    <Table.Th style={{ width: "20%" }}>
                      Latitude:{latitude}
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
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ width: "20%" }}>
                      {" "}
                      Temperature: {temperature}
                    </Table.Th>
                    <Table.Th style={{ width: "20%" }}>
                      Humidity: {hum}
                    </Table.Th>
                    <Table.Th style={{ width: "20%" }}>
                      Ionization Gradient:{ionization_gradeint}
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
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ width: "20%" }}></Table.Th>
                    <Table.Th style={{ width: "20%" }}>Main</Table.Th>
                    <Table.Th style={{ width: "20%" }}>Associate</Table.Th>
                  </Table.Tr>
                </Table.Thead>
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
              <Text mt="md" size="xs" c="dimmed">
                * All values are Predicted on the basis of data available in the
                NBSS book{" "}
              </Text>
            </Card>
            <Button onClick={handleBackClick} mt="xl" mb="xl">
              {" "}
              Back
            </Button>
            <Button
              mt="xl"
              ml="xl"
              variant="outline"
              onClick={handleClick}
              mb="xl"
            >
              Earthpit Calculator
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 6, xl: 5 }}>
            <Card withBorder radius="lg" shadow="lg" mb="lg">
              {" "}
              <Map
                initialViewState={{
                  latitude: 24.1195,
                  longitude: 81.115802,
                  zoom: 3.5,
                }}
                style={{ width: "100%", height: isLargeScreen ? 680 : 720 }}
                mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
                mapboxAccessToken={MAPBOX_TOKEN}
                onRender={(event) => event.target.resize()}
              >
                <Marker longitude={longi} latitude={lati} color="teal" />
              </Map>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 1, lg: 0, xl: 1 }}></Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default Submit_success;
