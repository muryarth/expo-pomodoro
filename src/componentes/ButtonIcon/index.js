import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ButtonIcon({
  iconName = "emoticon-happy-outline",
  action = () => console.log("Working!"),
}) {
  return (
    <TouchableOpacity onPress={action}>
      <Ionicons name={iconName} size={30} color={color} />
    </TouchableOpacity>
  );
}
