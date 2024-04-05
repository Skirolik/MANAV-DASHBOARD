export const getTextColor = (bgColor:string) => {
    // Convert the background color to RGB
    const rgb = hexToRgb(bgColor);
    // Calculate brightness using a standard formula
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    // Choose text color based on brightness
    return brightness > 128 ? "#000000" : "#FFFFFF";
};

export const hexToRgb = (hex:string) => {
    // Remove the hash if it's present
    hex = hex.replace(/^#/, "");
    // Parse the hex values into RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
};