// import { useEffect, useState } from "react";
// import axios from "axios";

// const usePitData = () => {
//   const [data, setData] = useState([]);
//   const [countDanger, setCountDanger] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [countSafe, setCountSafe] = useState(0);
//   const [unhealthy, setUnHealthy] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/pit_details`);
//         console.log("response for pit", response);
//         setData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fecthing data in PCC_User", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     //Count unique mac_ids
//     const uniqueMacIds = [...new Set(data.map((item) => item.mac_id))];
//     const macIdCount = uniqueMacIds.length;
//     setTotal(macIdCount);

//     // Count occurrences of different pit statuses
//     let dangerCount = 0;
//     let safeCount = 0;
//     let warningCount = 0;
//     data.forEach((item) => {
//       if (item.pit_status === "danger") {
//         dangerCount++;
//       } else if (item.pit_status === "safe") {
//         safeCount++;
//       } else if (item.pit_status === "warning") {
//         warningCount++;
//       }
//     });

//     setCountDanger(dangerCount);
//     setCountSafe(safeCount);
//     setUnHealthy(warningCount);
//   }, [data]);

//   console.log("total in pit", total);

//   return { data, total, countDanger, countSafe, unhealthy, loading };
// };

// export default usePitData;
