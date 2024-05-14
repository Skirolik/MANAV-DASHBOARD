/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";

const useWebsocket = (email: string) => {
  const requestType = "filtered";
  const [chartData, setChartData] = useState<(string | number | Date)[]>([]);

  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState([]);
  const [uniqueDataLast10Minutes, setUniqueDataLast10Minutes] = useState<
    string[]
  >([]);
  console.log("emial-websocket-", email);

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:7000`);

    socket.onopen = () => {
      console.log("Websocket connection established");
      socket.send(requestType);
      socket.send(email);
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      const latestValuesMap = new Map();

      newData.forEach((item: (string | number | Date)[]) => {
        const name = item[1]; // Assuming position 1 contains the name
        const existingValue = latestValuesMap.get(name);
        if (
          !existingValue ||
          new Date(item[25]) > new Date(existingValue[25])
        ) {
          latestValuesMap.set(name, item);
        }
      });

      const latestValuesArray = Array.from(latestValuesMap.values());

      setData(newData);
      console.log("valuesi nget ", newData);
      const lastTenData = newData.slice(-1);
      setChartData(latestValuesArray);
      console.log("Set chart Datra", chartData);
      setLatestData(lastTenData);

      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      console.log("10m in", tenMinutesAgo);
      const uniqueNamesSet = new Set<string>();

      newData.forEach((item: (string | number | Date)[]) => {
        const name = item[1]; // Assuming position 1 contains the name
        //@ts-ignore
        uniqueNamesSet.add(name);
      });
      const uniqueNamesArray = Array.from(uniqueNamesSet);

      // console.log("unique data", uniqueData);
      setUniqueDataLast10Minutes(uniqueNamesArray);
    };
    socket.close = () => {
      console.log("websocket Connection is closed");
    };

    return () => {
      socket.close();
    };
  }, []);
  return { data, chartData, latestData, uniqueDataLast10Minutes };
};

export default useWebsocket;
