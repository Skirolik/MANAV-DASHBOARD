import { useState, useEffect } from "react";
import { Map, Marker, GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, Text } from "@mantine/core";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2tpcm8iLCJhIjoiY2w1aTZjN2x2MDI3ODNkcHp0cnhuZzVicSJ9.HMjwHtHf_ttkh_aImSX-oQ";

const Lmap = (data) => {
  console.log("map", data);
  const lat = data.data.length > 0 ? data.data[0].x : 0;
  const long = data.data.length > 0 ? data.data[0].y : 0;
  const initialPercentage = data.data.length > 0 ? data.data[0].z : 0;

  const [percentage, setPercentage] = useState(initialPercentage);

  const getColor = (perval) => {
    if (perval < 50) {
      return "green";
    } else if (perval >= 50 && perval <= 60) {
      return "yellow";
    } else {
      return "red";
    }
  };

  useEffect(() => {
    if (data.data.length > 0) {
      setPercentage(data.data[data.data.length - 1].z);
    }
  }, [data.data]);

  const color = getColor(percentage);

  // console.log("latitudel", lat);
  return (
    <div>
      <Map
        initialViewState={{
          latitude: 23.1957247,
          longitude: 77.7908816,
          zoom: 3.5,
        }}
        style={{ width: "100%", height: 450 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={long} latitude={lat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="60"
            viewBox="0 0 24 24"
            fill={color}
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-map-pin"
          >
            <path d="M12 2c-3.313 0-6 2.687-6 6 0 5.25 6 12 6 12s6-6.75 6-12c0-3.313-2.687-6-6-6zm0 9c-1.656 0-3-1.344-3-3s1.344-3 3-3 3 1.344 3 3-1.344 3-3 3z"></path>
          </svg>
        </Marker>
      </Map>
    </div>
  );
};

export default Lmap;
