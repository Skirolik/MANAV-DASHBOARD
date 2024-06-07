import {
  Button,
  Card,
  Grid,
  NumberInput,
  Paper,
  Select,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import Earthpit_sucess from "./Earthpit_sucess";

interface EarthpitProps {
  setShowEarthpitSuccess: (value: boolean) => void;
  soilres: string | null;
}
interface SelectOption {
  value: number;
  label: string;
}

const Earthpit_calculator: React.FC<EarthpitProps> = ({
  setShowEarthpitSuccess,
  soilres,
}) => {
  const [earthpitSuccess, setEarthpitSuccess] = useState(false);
  const [targetResistance, setTargetResstance] = useState(10);
  const [diameter, setDiameter] = useState(0.2);
  const [soilResistance, setSoilResistance] = useState(soilres);
  const [selectValues] = useState<SelectOption[]>([
    { value: 0.02, label: "0.02" },
    { value: 0.04, label: "0.04" },
    { value: 0.08, label: "0.08" },
    { value: 0.1, label: "0.1" },
    { value: 0.25, label: "0.25" },
    { value: 0.5, label: "0.5" },
  ]);

  const handleBackClick = () => {
    setShowEarthpitSuccess(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("in Submit");
    console.log("sr", soilResistance);
    console.log("Diameter", diameter);
    console.log("Target Resistance", targetResistance);
    const t_r = targetResistance;

    try {
      const map_call = await fetch(
        `http://192.168.10.251:4000/verticalapi?resistance=${t_r}&sr=${soilResistance}&dia=${diameter}`
      );
      const responce_data = await map_call.json();
      const couplers = responce_data[0];
      const pit = responce_data[1];
      const no_of_rods = responce_data[2];
      const rounded_len = responce_data[3];
      const curec_plus = responce_data[4];
      const curec_con = responce_data[5];
      const earth_bar = responce_data[6];
      const hardware_set = responce_data[7];
      //Local storage
      localStorage.setItem("couplers", couplers);
      localStorage.setItem("pit", pit);
      localStorage.setItem("no_of_rods", no_of_rods);
      localStorage.setItem("rounded_len", rounded_len);
      localStorage.setItem("curec_plus", curec_plus);
      localStorage.setItem("curec_con", curec_con);
      localStorage.setItem("earth_bar", earth_bar);
      localStorage.setItem("hardware_set", hardware_set);
      localStorage.setItem("target_resistance", targetResistance.toString());
      localStorage.setItem("diameter", diameter.toString());
      localStorage.setItem("soil", soilResistance ?? "");

      setEarthpitSuccess(true);
      notifications.show({
        title: "Success !!",
        message:
          "Just view or Download the report. Contact us for further clarification",
        color: "teal",
      });
    } catch (error) {
      notifications.show({
        title: "Request Failed",
        message:
          "An Error has occured , try again if not please contact us by clicking on contact us page",
        color: "red",
      });
    }
  };

  console.log("diameter", diameter);
  return (
    <>
      {earthpitSuccess ? (
        <Earthpit_sucess setEarthpitSuccess={setEarthpitSuccess} />
      ) : (
        <Grid mt="xl">
          <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
            <Card withBorder radius="lg" shadow="lg" mt="md">
              <Title order={2} td="underline" ta="center">
                Earth pit calculator
              </Title>
              <Paper bg="transparent" p="lg">
                {" "}
                <Select
                  label="Diameter of rod (m)"
                  mt="xl"
                  placeholder={diameter.toString()}
                  searchable
                  onChange={(value: string | null) => {
                    if (value !== null) {
                      setDiameter(Number(value));
                    }
                  }}
                  clearable
                  data={selectValues.map((option) => ({
                    value: option.value.toString(),
                    label: option.label,
                  }))}
                />
                <NumberInput
                  mt="lg"
                  label="Soil Resistivity (Ωm)"
                  id="soil_resistivity"
                  name="soil_resistivity"
                  value={
                    soilResistance !== null ? Number(soilResistance) : undefined
                  }
                  onChange={(value) => {
                    if (value !== undefined) {
                      setSoilResistance(value.toString());
                    }
                  }}
                  withAsterisk
                  min={0}
                  decimalScale={2}
                />
                <NumberInput
                  mt="lg"
                  label="Target Resistance (Ω)"
                  id="target_resitance"
                  name="target_resistance"
                  value={targetResistance}
                  onChange={(value) => {
                    setTargetResstance(Number(value));
                  }}
                  withAsterisk
                  min={0}
                  decimalScale={2}
                />
                <Button mt="lg" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button mt="lg" onClick={handleBackClick} ml="xl">
                  Back
                </Button>
              </Paper>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
            <Card withBorder radius="lg" shadow="lg" mt="md">
              <Title order={2} td="underline" ta="center" mb="xl" mt="sm">
                Instructions
              </Title>
              <Paper bg="transparent" p="lg">
                <Timeline active={5} bulletSize={15} lineWidth={3}>
                  <Timeline.Item title="Step-1">
                    <Text size="sm">
                      Choose the Diameter of the rod for the earthpit design.
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Step-2">
                    <Text size="sm">
                      If you dont know the value go back and use our soil
                      resistivity predictor to get an approximate value.
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Step-3">
                    <Text size="sm">
                      Enter the Target or the desired Resistance of the earhtpit
                      you wnat to make.
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Step-4">
                    <Text size="sm">
                      Click submit and get the earthpit design.
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Paper>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default Earthpit_calculator;
