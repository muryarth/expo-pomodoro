import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

const renderSchedule = (
  size,
  color,
  ciclesLength,
  subciclesLength,
  currentProgress
) => {
  const cicles = [];

  for (let countCicles = 0; countCicles < ciclesLength; countCicles++) {
    let row = [];
    for (
      let countSubcicles = 0;
      countSubcicles < subciclesLength;
      countSubcicles++
    ) {
      row.push(
        <FontAwesome
          style={{ marginHorizontal: 1 }}
          name="circle-o"
          size={size}
          color={color}
        />
      );
    }
    cicles.push(<View style={styles.cicle}>{row}</View>);
  }

  return cicles;
};

export default function Schedule({
  size = 16,
  color = "black",
  ciclesLength = 3,
  subciclesLength = 4,
  currentProgress,
}) {
  return (
    <View style={styles.content}>
      {renderSchedule(
        size,
        color,
        ciclesLength,
        subciclesLength,
        currentProgress
      )}
    </View>
  );
}
