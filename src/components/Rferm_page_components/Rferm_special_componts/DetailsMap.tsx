/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
// import { name } from "react-lorem-ipsum";
import {
  Map,
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "react-map-gl";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

interface DetailsMapData {
  lat: number;
  lon: number;
  status: string;
  name: string;
  unique_id: string;
}

const DetailsMap: React.FC<{
  data: DetailsMapData[];
  onPinClick: (macId: string) => void;
}> = ({ data, onPinClick }) => {
  console.log("Data in map", data);
  const [viewport, setViewport] = useState({
    latitude: 23.1957247,
    longitude: 77.7908816,
    zoom: 10,
    transitionDuration: 2000, // Adjust transition duration in milliseconds
  });
  const [selectedMarker, setSelectedMarker] = useState<DetailsMapData | null>(
    null
  );
  const [selectedMacId] = useState<string | null>(null);
  console.log("select", selectedMacId);

  const popupStyle = {
    // backgroundColor: "lightgray",
    padding: "12px",
    borderRadius: "10px",

    color: "black",
    boxColor: "red",
  };

  const markercolor = (status: string) => {
    if (status == "Danger") {
      return "#c51d31";
    } else if (status == "Unhealthy") {
      return "#d14d14";
    } else {
      return "#24782c";
    }
  };

  const handleDetailsClick = (macId: string, selectedName: string) => {
    onPinClick(macId);
    localStorage.setItem("slectedUserName", selectedName);
    localStorage.setItem("selectedMacId", macId);
  };

  useEffect(() => {
    // Zoom to marker location on initial data load
    console.log("in use Effect data", data);
    if (data.length > 0) {
      const firstMarker = data[0];
      console.log("first", firstMarker.lat);

      // Create a new viewport object with defaults
      let newViewport = {
        latitude: firstMarker.lat,
        longitude: firstMarker.lon,
        zoom: 10, // Adjust initial zoom level
        transitionDuration: 5000,
      };

      // Optionally, merge existing viewport properties if necessary
      if (viewport) {
        newViewport = {
          ...viewport, // Spread existing properties
          ...newViewport, // Override with new values
        };
      }

      setViewport(newViewport); // Update viewport state
      console.log("viewports", viewport);
    } else {
      console.log("not in if");
    }
  }, [data]);
  return (
    <div>
      <LazyLoad>
        <Map
          style={{ width: "100%", height: 450 }}
          mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={viewport}
          // onViewportChange={setViewport} // Update viewport state on map interactions
        >
          {data.map((entry) => (
            <Marker
              key={entry.unique_id}
              longitude={entry.lon}
              latitude={entry.lat}
              color={markercolor(entry.status)}
              onClick={() => setSelectedMarker(entry)}
            ></Marker>
          ))}
          <GeolocateControl position="top-left" />
          <NavigationControl position="top-left" />
          {selectedMarker && (
            <Popup
              latitude={selectedMarker.lat}
              longitude={selectedMarker.lon}
              style={popupStyle}
              closeButton={true}
              onClose={() => setSelectedMarker(null)} // To close the popup when the close button is clicked
              closeOnClick={false}
            >
              <div>
                <Button
                  size="compact-xs"
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "0px",
                  }}
                ></Button>
                <Text>{selectedMarker.name}</Text>
                <Text>Latitude: {selectedMarker.lat}</Text>
                <Text>Longitude: {selectedMarker.lon}</Text>
                <Text>Resistance: {selectedMarker.status}</Text>
                <Text hidden>{selectedMarker.unique_id}</Text>
                <Button
                  onClick={() =>
                    handleDetailsClick(
                      selectedMarker.unique_id,
                      selectedMarker.name
                    )
                  }
                >
                  Detials
                </Button>
                {/* Add more details as needed */}
              </div>
            </Popup>
          )}
        </Map>
      </LazyLoad>
    </div>
  );
};

export default DetailsMap;
