import React from "react";
import { Tabs, rem } from "@mantine/core";
import { IconPhoto, IconMessageCircle } from "@tabler/icons-react";
import { getTextColor } from "./components/utils";
import Device_details from "./components/common/Device_details";
import Device_entries from "./components/common/Device_entries";

const Earthpit_data: React.FC<{ back: string }> = ({ back }) => {
  const iconStyle = { width: rem(12), height: rem(12) };
  localStorage.removeItem("selectedMacId");
  localStorage.removeItem("slectedUserName");
  return (
    <div>
      <Tabs defaultValue="entry" variant="outline">
        <Tabs.List>
          <Tabs.Tab
            value="entry"
            leftSection={<IconPhoto style={iconStyle} />}
            c={getTextColor(back)}
          >
            Device Entry
          </Tabs.Tab>
          <Tabs.Tab
            value="details"
            leftSection={<IconMessageCircle style={iconStyle} />}
            c={getTextColor(back)}
          >
            Device Details
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel pt="xs" value="entry">
          <Device_details />
        </Tabs.Panel>
        <Tabs.Panel pt="xs" value="details">
          <Device_entries back={back} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Earthpit_data;
