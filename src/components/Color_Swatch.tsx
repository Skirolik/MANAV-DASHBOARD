import React, { useState, useEffect } from "react";
import {
  Popover,
  Paper,
  ColorSwatch,
  Text,
  CheckIcon,
  rem,
} from "@mantine/core";

interface ColorSwatchProps {
  onSelect: (color: string) => void; // Define the type of onSelect
}

const Color_Swatch: React.FC<ColorSwatchProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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

  useEffect(() => {
    // Load selected color from localStorage when component mounts
    const storedColor = localStorage.getItem("selectedColor");
    if (storedColor && colors.includes(storedColor)) {
      setSelectedColor(storedColor);
    }
  }, []); // Empty dependency array to run the effect only once when component mounts

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelect(color);
    setIsOpen(false);
    // Save selected color to localStorage
    localStorage.setItem("selectedColor", color);
  };

  return (
    <Popover opened={isOpen} onClose={() => setIsOpen(false)} position="bottom">
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
              key={color}
              color={color}
              onClick={() => handleColorSelect(color)}
              style={{ cursor: "pointer" }}
            >
              {selectedColor === color && (
                <CheckIcon style={{ width: rem(12), height: rem(12) }} />
              )}
            </ColorSwatch>
          ))}
        </div>
      </Paper>
    </Popover>
  );
};

export default Color_Swatch;
