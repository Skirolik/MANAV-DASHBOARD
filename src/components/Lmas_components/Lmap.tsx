import { useState, useEffect } from "react";
import { FullscreenControl, Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LazyLoad from "react-lazy-load";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2tpcm8iLCJhIjoiY2w1aTZjN2x2MDI3ODNkcHp0cnhuZzVicSJ9.HMjwHtHf_ttkh_aImSX-oQ";

interface MapData {
  x: number;
  y: number;
  z: number;
}

interface MapProp {
  data: MapData[];
}

interface NewViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

const Lmap: React.FC<MapProp> = (data) => {
  console.log("map", data.data);

  const initialPercentage = data.data.length > 0 ? data.data[0].z : 0;
  const [viewState, setViewState] = useState<NewViewState | null>(null);

  const [, setPercentage] = useState(initialPercentage);

  const getColor = (perval: number) => {
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
      const firstMarker = data.data[0];
      console.log(firstMarker);

      const newViewState = {
        latitude: firstMarker.x,
        longitude: firstMarker.y,
        zoom: 15,
        pitch: 0,
        bearing: 4,
      };
      setViewState(newViewState);
    }
  }, [data.data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMove = (event: any) => {
    setViewState(event.viewState);
    console.log("VSADB", viewState);
  };

  // console.log("latitudel", lat);
  return (
    <div>
      <LazyLoad>
        <Map
          {...viewState}
          onMove={onMove}
          style={{ width: "100%", height: 450 }}
          mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {data.data.map((markerData, index) => (
            <Marker
              key={index}
              longitude={markerData.y}
              latitude={markerData.x}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="60"
                viewBox="0 0 24 24"
                fill={getColor(markerData.z)}
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-map-pin"
              >
                <path d="M12 2c-3.313 0-6 2.687-6 6 0 5.25 6 12 6 12s6-6.75 6-12c0-3.313-2.687-6-6-6zm0 9c-1.656 0-3-1.344-3-3s1.344-3 3-3 3 1.344 3 3-1.344 3-3 3z"></path>
              </svg>
            </Marker>
          ))}
          <FullscreenControl />
        </Map>
      </LazyLoad>
    </div>
  );
};

export default Lmap;
