import React, { useState } from "react";
import {
  TextInput,
  Button,
  NumberInput,
  Grid,
  Card,
  Textarea,
  Loader,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

import { Map, Marker, GeolocateControl, NavigationControl } from "react-map-gl";
import { MapMouseEvent } from "mapbox-gl";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

const Device_details = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [resistance, setResistance] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [dateCollected, setDateCollected] = useState<Date | null>(null);
  const [nextCollection, setNextCollection] = useState<Date | null>(null);
  const plantName = localStorage.getItem("plantName");

  const [description, setDescription] = useState("");
  const [newPlace, setNewPlace] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLoading] = useState(false);
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedDateCollected =
      dateCollected && dateCollected.toISOString().substr(0, 10);
    const formattedNextCollection =
      nextCollection && nextCollection.toISOString().substr(0, 10);

    // Form data to be sent to the backend
    const formData = {
      latitude,
      longitude,
      resistance,
      name,
      title,
      dateCollected: formattedDateCollected,
      nextCollection: formattedNextCollection,
      description,
      plant_name: plantName,
    };

    // Send the form data to the backend server

    try {
      const response = await axios.post("api/submit-form", formData);
      console.log("response", response);
      setLatitude(0);
      setLongitude(0);
      setResistance(0);
      setName("");
      setTitle("");
      setDateCollected(null);
      setNextCollection(null);
      setDescription("");
      notifications.show({
        title: "Form Submited",
        message: "Check Data tab ",
        color: "teal",
        icon: <CircleCheck size={24} color="white" />,
      });
    } catch (error) {
      console.error("Error Sending dorm data", error);
      notifications.show({
        title: "Network Error",
        message: "Check Network or Contact us",
        color: "red",
        icon: <AlertCircle size={24} color="black" />,
      });
    }

    // axios
    //   .post("http://192.168.10.251:3000/api/submit-form", formData)
    //   .then(() => {
    //     // console.log(response.data.message); // Success message from the backend
    //     // Reset form fields after successful submission
    //     setLatitude(0);
    //     setLongitude(0);
    //     setResistance(0);
    //     setName("");
    //     setTitle("");
    //     setDateCollected(null);
    //     setNextCollection(null);
    //     setDescription("");
    //     notifications.show({
    //       title: "Form Submited",
    //       message: "Check Data tab ",
    //       color: "teal",
    //       icon: <CircleCheck size={24} color="white" />,
    //     });
    //   })

    //   .catch((error) => {
    //     console.error("Error submitting form:", error);
    //     // Handle error here, show error message to the user, etc.
    //     notifications.show({
    //       title: "Network Error",
    //       message: "Check Network or Contact us",
    //       color: "red",
    //       icon: <AlertCircle size={24} color="black" />,
    //     });
    //   });
  };

  const handleAddClick = (e: MapMouseEvent) => {
    // console.log("map clicked");
    const { lng, lat } = e.lngLat;
    // console.log("lng", lng);
    setLatitude(lat);
    setLongitude(lng);
    setNewPlace({ lat, lng });
  };

  return (
    <Grid mt="xl">
      <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <TextInput
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.currentTarget.value))}
              label="Latitude"
              placeholder="Latitude"
              required
            />
            <TextInput
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.currentTarget.value))}
              label="Longitude"
              placeholder="Longitude"
              required
            />
            <NumberInput
              value={resistance}
              onChange={(value) => setResistance(parseFloat(value.toString()))}
              label="Resistance"
              withAsterisk
            />
            <TextInput
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              label="Pit Name/Number"
              placeholder="Pit Name/Number"
              required
            />
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              label="Title"
              placeholder="Title"
              required
            />

            <DateInput
              value={dateCollected}
              onChange={setDateCollected}
              label="Date Collected"
              required
            />

            <DateInput
              value={nextCollection}
              onChange={setNextCollection}
              label="Next Collection"
              required
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              required
            />
            {isLoading ? (
              <Loader
                size="md"
                style={{ display: "inline-block", marginLeft: "8px" }}
              />
            ) : null}
            <Button type="submit" mt="xl" radius="xl">
              Submit
            </Button>
          </form>
        </Card>{" "}
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
        <Map
          initialViewState={{
            latitude: 23.1957247,
            longitude: 77.7908816,
            zoom: 3.5,
          }}
          style={{ width: "100%", height: 620 }}
          mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
          mapboxAccessToken={MAPBOX_TOKEN}
          onClick={handleAddClick}
          onRender={(event) => event.target.resize()}
        >
          {newPlace && (
            <Marker longitude={longitude} latitude={latitude} color="blue" />
          )}
          <GeolocateControl position="top-left" />
          <NavigationControl position="top-left" />
        </Map>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
    </Grid>
  );
};

export default Device_details;
