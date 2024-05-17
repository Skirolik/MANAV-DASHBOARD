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
interface NewViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

const DetailsMap: React.FC<{
  data: DetailsMapData[];
  onPinClick: (macId: string) => void;
}> = ({ data, onPinClick }) => {
  // console.log("Data in map", data);
  const [viewState, setViewState] = useState<NewViewState | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<DetailsMapData | null>(
    null
  );
  // const [selectedMacId] = useState<string | null>(null);
  // console.log("select", selectedMacId);

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
    if (data.length > 0) {
      const firstMarker = data[0];
      console.log(firstMarker);

      const newViewState = {
        latitude: firstMarker.lat,
        longitude: firstMarker.lon,
        zoom: 4,
        pitch: 0,
        bearing: 4,
      };
      setViewState(newViewState);

      // Optionally, merge existing viewport properties if necessary
    }
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMove = (event: any) => {
    setViewState(event.viewState);
    console.log("VSADB", viewState);
  };

  return (
    <div>
      <LazyLoad>
        <Map
          {...viewState}
          onMove={onMove}
          style={{ width: "100%", height: 450 }}
          mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
          mapboxAccessToken={MAPBOX_TOKEN}

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
