import { Chip } from "@mui/material";
import React from "react";
import { TYPE } from "../themeContext/MThemeProvider";

export const PokeType = ({
  type,
  size = "small",
  color,
  border,
  sx,
  onClick,
}) => {
  if (!type) {
    console.log("something wrong");
    return null;
  }

  const formattedType = type.toLowerCase();

  return (
    <Chip
      onClick={onClick}
      sx={{
        ...sx,
        borderRadius: 1,
        paddingX: 1,
        height: 20,
        border: border ? "2px solid #a4a4a4" : "none",
        fontSize: size === "small" ? 12 : 16,
        width: size === "small" ? "4.5rem" : "8rem",
        padding: size === "large" ? 2 : 0,
        background: TYPE[formattedType],
        color: color || TYPE[`${formattedType}Text`],
      }}
      size="small"
      label={size === "small" ? type : type[0].toUpperCase() + type.slice(1)}
    />
  );
};
