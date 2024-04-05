import { Button, Text, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import {
  Map,
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "react-map-gl";

import NormalReadingGraph from "./NormalReadingGraph";

import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

interface RfermMapData {
  lat: number;
  lon: number;
  status: string;
  name: string;
  unique_id: string;
}

export const Rferm_map: React.FC<{ data: RfermMapData[] }> = ({ data }) => {
  const [selectedMarker, setSelectedMarker] = useState<RfermMapData | null>(
    null
  );
  const [selectedMacId, setSelectedMacId] = useState<string | null>(null);

  const persona = localStorage.getItem("persona");

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const popupStyle = {
    // backgroundColor: "lightgray",
    padding: "12px",
    borderRadius: "10px",

    color: "black",
    boxColor: "red",
  };

  const markercolor = (status: string) => {
    console.log("color", status);
    if (status == "Danger") {
      return "#C51D31";
    } else if (status == "Unhealthy") {
      return "#FC8C0C";
    } else {
      return "#24782C";
    }
  };

  const handleDetailsClick = (macId: string) => {
    setSelectedMacId(macId);
    localStorage.setItem("selectedMacId", macId);
    if (persona === "pcc") {
      open();
    } else {
      navigate("/details");
    }
  };

  useEffect(() => {
    console.log("selectedmacid", selectedMacId);
  }, [selectedMacId]);

  return (
    <div>
      <LazyLoad>
        <Map
          style={{ width: "100%", height: 450 }}
          initialViewState={{
            latitude: 23.1957247,
            longitude: 77.7908816,
            zoom: 3.5,
          }}
          mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
          mapboxAccessToken={MAPBOX_TOKEN}
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
                  onClick={() => handleDetailsClick(selectedMarker.unique_id)}
                >
                  Detials
                </Button>
                {/* Add more details as needed */}
              </div>
            </Popup>
          )}
        </Map>
      </LazyLoad>
      <Modal opened={opened} onClose={close} size="calc(100vw - 3rem)">
        {persona == "pcc" && <NormalReadingGraph macid={selectedMacId} />}
        {persona == "scc" && <Text>SCC</Text>}
        {persona == "ccc" && <Text>CCC</Text>}
      </Modal>
    </div>
  );
};
