import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TouchableIcon({
  action = () => console.log("Working!"),
  style,
  iconName = "attach",
  size = 50,
  color = "white",
  disabled = false,
}) {
  return (
    <>
      <TouchableOpacity style={style} onPress={action} disabled={disabled}>
        <Ionicons
          name={iconName}
          size={size}
          color={disabled ? "grey" : color}
        />
      </TouchableOpacity>
    </>
  );
}
