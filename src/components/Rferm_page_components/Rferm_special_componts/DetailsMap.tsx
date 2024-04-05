import { Button, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
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
  pit_name: string;
  unique_id: string;
}

const DetailsMap: React.FC<{
  data: DetailsMapData[];
  onPinClick: (macId: string) => void;
}> = ({ data, onPinClick }) => {
  const [selectedMarker, setSelectedMarker] = useState<DetailsMapData | null>(
    null
  );
  const [selectedMacId] = useState<string | null>(null);

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

  const handleDetailsClick = (macId: string) => {
    onPinClick(macId);
    localStorage.setItem("selectedMacId", macId);
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
                <Text>{selectedMarker.pit_name}</Text>
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
    </div>
  );
};

export default DetailsMap;
