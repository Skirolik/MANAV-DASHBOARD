import {
  Button,
  Card,
  Grid,
  NumberInput,
  Paper,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { Map, Marker, GeolocateControl, NavigationControl } from "react-map-gl";
import Submit_success from "../components/common/Submit_success";
import Earthpit_calculator from "../components/common/Earthpit_calculator";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;
const OPENWEATHER_API = import.meta.env.VITE_API_KEY;

const Meseha = () => {
  const OPENWEATHER_CALL = import.meta.env.VITE_OPENWEATHER_API;
  const MESEHA_CALL = import.meta.env.VITE_MESEHA_API;
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [showEarthpitSuccess, setShowEarthpitSuccess] = useState(false);
  const [newPlace, setNewPlace] = useState({ lat: 0, lng: 0 });

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [, setName] = useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddClick = async (e: any) => {
    console.log(e.lngLat);
    const { lng, lat } = e.lngLat;
    setLatitude(lat);
    setLongitude(lng);
    setNewPlace({
      lat,
      lng,
    });
    const api_call = await fetch(
      `${OPENWEATHER_CALL}/?lat=${lat}&lon=${lng}&units=metric&APPID=${OPENWEATHER_API}`
    );
    const response = await api_call.json();
    // console.log("response:", response);
    // setData(response);
    setTemperature(response?.main?.temp);

    setHumidity(response?.main?.humidity);

    setName(response?.name);
  };

  const handleFormSubmit = async () => {
    console.log("Form submit pressed");
    console.log("Temperature", temperature);
    if (latitude === 0 || longitude === 0) {
      notifications.show({
        title: "Latitude or longitude empty",
        message: "Please Check the map on the map to confirm",
        color: "Red",
      });
    } else {
      try {
        const map_call = await fetch(
          `${MESEHA_CALL}customapi?lat=${latitude}&long=${longitude}&tempt=${temperature}&hum=${humidity}`
        );

        const responce_data = await map_call.json();
        console.log("value", responce_data[0]);
        console.log(responce_data[1]);
        console.log("ionization gradeint", responce_data[2]);
        const sr = responce_data[1];
        const ion_gradient = responce_data[2];

        // window.location.href = "/submit_success";

        localStorage.setItem("soil", sr);
        localStorage.setItem("temp", String(temperature));
        localStorage.setItem("hum", String(humidity));
        localStorage.setItem("long", String(longitude));
        localStorage.setItem("lat", String(latitude));
        localStorage.setItem("ion", ion_gradient);

        //soil_charateristics
        localStorage.setItem("cal", responce_data[0][0]);
        localStorage.setItem("erosion", responce_data[0][1]);
        localStorage.setItem("Soil_depth", responce_data[0][2]);
        localStorage.setItem("salinity", responce_data[0][3]);
        localStorage.setItem("surface_texture", responce_data[0][4]);
        localStorage.setItem("sodacity", responce_data[0][5]);
        localStorage.setItem("flooding", responce_data[0][6]);
        localStorage.setItem("drainage", responce_data[0][7]);
        localStorage.setItem("surface_stoniness", responce_data[0][8]);
        localStorage.setItem("slope", responce_data[0][9]);
        localStorage.setItem("cal1", responce_data[0][10]);
        localStorage.setItem("erosion1", responce_data[0][11]);
        localStorage.setItem("Soil_depth1", responce_data[0][12]);
        localStorage.setItem("salinity1", responce_data[0][13]);
        localStorage.setItem("surface_texture1", responce_data[0][14]);
        localStorage.setItem("sodacity1", responce_data[0][15]);
        localStorage.setItem("flooding1", responce_data[0][16]);
        localStorage.setItem("drainage1", responce_data[0][17]);
        localStorage.setItem("surface_stoniness1", responce_data[0][18]);
        localStorage.setItem("slope1", responce_data[0][19]);

        notifications.show({
          title: "Success !!",
          message:
            "Just view or Download the report. Contact us for further clarification",
          color: "teal",
        });
        setShowSubmitSuccess(true);
      } catch (error) {
        notifications.show({
          title: "Request Failed",
          message:
            "Check your Latitude and logitude , it looks like you are out of india",
          color: "red",
        });
      }
      notifications.show({
        title: "Latitude or longitude empty",
        message: "Please Check the map on the map to confirm",
        color: "teal",
      });
    }
  };

  const handleEarthpitClick = () => {
    setShowEarthpitSuccess(true);
  };

  return (
    <>
      {showSubmitSuccess ? (
        <Submit_success
          setShowSubmitSuccess={setShowSubmitSuccess}
          setShowEarthpitSuccess={setShowEarthpitSuccess}
        />
      ) : showEarthpitSuccess ? (
        <Earthpit_calculator
          setShowEarthpitSuccess={setShowEarthpitSuccess}
          soilres={"50"}
        />
      ) : (
        <>
          <Grid mt="xl">
            <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
            <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
              <Card withBorder radius="lg" shadow="lg">
                <Paper bg="transparent" p="xl">
                  <Title order={2} td="underline" ta="center" mt="md">
                    Surface Soil Resistivity
                  </Title>
                  <NumberInput
                    mt="xl"
                    label="Longitude"
                    id="longitude"
                    placeholder="Longitude"
                    name="longitude"
                    value={longitude}
                    onChange={(value) => {
                      setLongitude(Number(value));
                    }}
                    withAsterisk
                    min={90}
                    max={-90}
                    decimalScale={2}
                    required
                  />
                  <NumberInput
                    mt="xl"
                    label="Latitude"
                    id="latitude"
                    placeholder="Latitude"
                    name="latitude"
                    value={latitude}
                    onChange={(value) => {
                      setLatitude(Number(value));
                    }}
                    withAsterisk
                    min={90}
                    max={-90}
                    decimalScale={2}
                    required
                  />
                  <NumberInput
                    mt="xl"
                    label="Temperature"
                    id="temperature"
                    placeholder="Temperature"
                    name="temperature"
                    value={temperature}
                    onChange={(value) => {
                      setTemperature(Number(value));
                    }}
                    withAsterisk
                    required
                  />
                  <NumberInput
                    mt="xl"
                    label="Humidity"
                    id="humidity"
                    placeholder="Humidity"
                    name="humidity"
                    value={humidity}
                    onChange={(value) => {
                      setHumidity(Number(value));
                    }}
                    withAsterisk
                    required
                  />
                  <Button mt="xl" onClick={handleFormSubmit}>
                    Submit
                  </Button>
                  <Button
                    mt="xl"
                    ml="xl"
                    variant="outline"
                    onClick={handleEarthpitClick}
                  >
                    Earthpit Calculator
                  </Button>
                </Paper>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
              <Card withBorder radius="lg" shadow="lg">
                Map
                <Map
                  initialViewState={{
                    latitude: 23.1957247,
                    longitude: 77.7908816,
                    zoom: 3.5,
                  }}
                  style={{ width: "100%", height: 530 }}
                  mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
                  mapboxAccessToken={MAPBOX_TOKEN}
                  onClick={handleAddClick}
                  onRender={(event) => event.target.resize()}
                >
                  {newPlace && latitude >= -90 && latitude <= 90 && (
                    <Marker
                      longitude={longitude}
                      latitude={latitude}
                      color="teal"
                    />
                  )}
                  <GeolocateControl position="top-left" />
                  <NavigationControl position="top-left" />
                </Map>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
          </Grid>
          <Grid mt="lg">
            <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
            <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
              <Card withBorder radius="lg" shadow="lg" mt="md">
                <Title order={2} td="underline" ta="center" mb="xl" mt="sm">
                  Instructions
                </Title>
                <Timeline active={2} bulletSize={24} lineWidth={3}>
                  <Timeline.Item title="Step-1">
                    <Text size="sm">
                      Click on the Map or enter the Longitude , Latitude,
                      Temperature and Humidity.
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Step-2">
                    <Text size="sm">
                      Click on Submit and get the predicted live Surface Soil
                      Resistivity Value.
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Further Questions" lineVariant="dashed">
                    <Text size="sm">
                      Feel Free to contact us for assistance. Click on contact
                      page.
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
};

export default Meseha;
