import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TouchableIcon({
  action = () => console.log("Working!"),
  style,
  iconName = "attach",
  size = 50,
  color = "white",
}) {
  return (
    <>
      <TouchableOpacity style={style} onPress={action}>
        <Ionicons name={iconName} size={size} color={color} />
      </TouchableOpacity>
    </>
  );
}
