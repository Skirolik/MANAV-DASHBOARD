import React from "react";
import { Paper, Text } from "@mantine/core";
import { Link as RouterLink } from "react-router-dom";

interface ActivityData {
  danger_count: number;
  unhealthy_count: number;
  healthy: number;
  total: number;
  first_R_a: { date: string; status: string; area: string };
  second_R_a: { date: string; status: string; area: string };
  third_R_a: { date: string; status: string; area: string };
  fourth_R_a: { date: string; status: string; area: string };
  fifth_R_a: { date: string; status: string; area: string };
  sixth_R_a: { date: string; status: string; area: string };
  seventh_R_a: { date: string; status: string; area: string };
  eight_R_a: { date: string; status: string; area: string };
  nineth_R_a: { date: string; status: string; area: string };
  tenth_R_a: { date: string; status: string; area: string };
  Grid_resistance: { Date: string; value: number }[];
}

interface RecentActivityProps {
  data: ActivityData[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ data }) => {
  console.log("data in recent activity", data);

  // const [count, SetCount] = useState(0);

  // const handleCount = () => {
  //   console.log("we in count");
  //   SetCount(count + 1);
  // };

  const linkStyles = {
    color: "#206AD2",
    textDecoration: "underline",
  };

  return (
    <div style={{ minHeight: "400px", maxHeight: "400px", overflowY: "auto" }}>
      {Object.entries(data[0]).map(([key, value]) => {
        if (
          typeof value === "object" &&
          value.date &&
          value.status &&
          value.area
        ) {
          return (
            <>
              {value.status === "none" ? null : (
                <Paper key={key} p="md" radius="md" bg="transparent">
                  <Text size="xl" ml="sm">
                    On {value.date}, {value.status} occurred in :{" "}
                    <RouterLink
                      to="/details"
                      style={linkStyles}
                      className="link"
                    >
                      {value.area}
                    </RouterLink>
                  </Text>
                </Paper>
              )}
            </>
          );
        } else {
          return null; // Skip non-object properties
        }
      })}
    </div>
  );
};

export default RecentActivity;
