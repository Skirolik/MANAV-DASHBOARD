import React, { useState } from "react";
import { Button, Popover, Paper, ColorSwatch, Text } from "@mantine/core";

const Color_Swatch = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    "#ffffff",
    "#68DDAD",
    "#E3E4E9",
    "#2684FF",
    "#aaaaaa",
    "#FF8264",
    "#9384DC",
    "#172B4D",
    "#FFB319",
    "#DE350B",
    "#ffefcc",
    "#00A3BF",
    "#0052CC",
    "#36B37E",
    "#DCFFF1",
    "#E9F2FF",
    "#fff8e1",
    "#1F845A",
    "#0C66E4",
    "#4960D1",
    "#57D9A3",
    "#4C9AFF",
    "#164555",
    "#8EB021",
    "#6893C3",
    "#D04437",
  ];

  const handleColorSelect = (color) => {
    onSelect(color);
    setIsOpen(false);
  };
  return (
    <Popover
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      target={
        <Button onClick={() => setIsOpen((prev) => !prev)}>Select Color</Button>
      }
      position="bottom"
    >
      <Text>Pick a Colour:</Text>
      <Paper mt="lg">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
          }}
        >
          {colors.map((color) => (
            <ColorSwatch
              color={color}
              onClick={() => handleColorSelect(color)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </Paper>
    </Popover>
  );
};

export default Color_Swatch;
