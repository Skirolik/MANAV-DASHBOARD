import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Grid, Text, Divider, useComputedColorScheme } from "@mantine/core";

interface CalenderData {
  x: "string";
  y: number;
}
interface CalendarProps {
  data: CalenderData[];
}

const Calender: React.FC<CalendarProps> = ({ data }) => {
  // console.log("calender.data", data);

  const computedColorScheme = useComputedColorScheme();

  const countCallsByDate = () => {
    const callCounts: { [key: string]: number } = {}; // Type assertion here

    // Iterate through the call data
    data.forEach((row) => {
      if (row.y >= 40) {
        const dateTime = new Date(row.x); // Assuming `row.x` contains the date and time information
        const date = dateTime.toISOString().substring(0, 10);

        // Increment the count for the corresponding date
        if (callCounts[date]) {
          callCounts[date]++;
        } else {
          callCounts[date] = 1;
        }
      }
    });

    return callCounts;
  };

  // Count the calls by date
  const callCounts = countCallsByDate();
  const calendarData = Object.keys(callCounts).map((date) => ({
    value: callCounts[date],
    day: date,
  }));
  // console.log(calendarData);

  return (
    <div>
      <Text fz="xl" ta="center" fw="bold">
        History
      </Text>
      <Divider />
      <Grid>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }} mt="xl">
          <div
            className="calendar-wrapper"
            style={{ height: 600, width: "100%" }}
          >
            <ResponsiveCalendar
              data={calendarData}
              from="2023-07-01"
              to="2025-12-31"
              tooltip={(value) => (
                <div
                  style={{ background: "#333", color: "#fff", padding: "8px" }}
                >
                  Date:{value.day} <span> Count: {value.value}</span>
                </div>
              )}
              emptyColor={
                computedColorScheme === "dark" ? "#656a7e" : "#e4e6ed"
              }
              colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
              margin={{
                right: 40,
                bottom: 40,
                left: 40,
              }}
              yearSpacing={40}
              monthBorderColor={
                computedColorScheme === "dark" ? "white" : "#909296"
              }
              dayBorderWidth={2}
              dayBorderColor={
                computedColorScheme === "dark" ? "#f5f5f5" : "#f5f5f5"
              }
            />

            <style>
              {`
        .calendar-wrapper text {
          fill: ${
            computedColorScheme === "dark" ? "white" : "black"
          } !important;
        }
      `}
            </style>
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 2, lg: 2 }} mt="xl">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#61cdbb",
                  marginRight: "5px",
                }}
              />
              <span>Low</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#97e3d5",
                  marginRight: "5px",
                }}
              />
              <span>Mid</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#e8c1a0",
                  marginRight: "5px",
                }}
              />
              <span>High</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#f47560",
                  marginRight: "5px",
                }}
              />
              <span>Very High</span>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Calender;
