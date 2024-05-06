import { useState, useEffect } from "react";

const useWebsocket = (email: string) => {
  const requestType = "filtered";
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  console.log("emial-websocket-", email);

  useEffect(() => {
    const socket = new WebSocket(`ws://52.172.4.41:7000`);

    socket.onopen = () => {
      console.log("Websocket connection established");
      socket.send(requestType);
      socket.send(email);
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      console.log("data-", newData);
      const lastTenData = newData.slice(-1);
      setChartData(lastTenData);
      console.log("Set chart Datra", chartData);
    };
    socket.close = () => {
      console.log("websocket Connection is closed");
    };

    return () => {
      socket.close();
    };
  }, []);
  return { data, chartData };
};

export default useWebsocket;
