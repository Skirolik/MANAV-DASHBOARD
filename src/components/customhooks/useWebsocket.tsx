import React, { useState, useEffect } from "react";

const useWebsocket = (email) => {
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3500`);

    socket.onopen = () => {
      console.log("Websocket connection established");
      socket.send(email);
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      const lastTenData = newData.slice(-1);
      setChartData(lastTenData);
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
