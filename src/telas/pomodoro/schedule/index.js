import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

const renderSchedule = (
  size,
  color,
  cyclesLength,
  subcyclesLength,
  currentCyclesProgress
) => {
  const cycles = [];
  let currentCyclesProgressCount = currentCyclesProgress;
  // console.log(currentCyclesProgressCount);

  for (let countCycles = 0; countCycles < cyclesLength; countCycles++) {
    let row = [];
    for (
      let countSubcycles = 0;
      countSubcycles < subcyclesLength;
      countSubcycles++
    ) {
      row.push(
        <FontAwesome
          style={{ marginHorizontal: 1 }}
          name={currentCyclesProgressCount > 0 ? "circle" : "circle-o"}
          size={size}
          color={color}
        />
      );
      currentCyclesProgressCount--;
    }
    cycles.push(<View style={styles.cicle}>{row}</View>);
  }

  return cycles;
};

export default function Schedule({
  size = 13,
  color = "#000",
  cyclesLength = 3,
  subcyclesLength = 4,
  currentCyclesProgress,
}) {
  const dinamicImageSize = cyclesLength > 3 || subcyclesLength > 4 ? 10 : size;
  const totalSubcycles = cyclesLength * subcyclesLength;

  return (
    <>
      {totalSubcycles > 16 ? (
        <View>
          <Text>16+</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {renderSchedule(
            dinamicImageSize,
            color,
            cyclesLength,
            subcyclesLength,
            currentCyclesProgress
          )}
        </View>
      )}
    </>
  );
}
