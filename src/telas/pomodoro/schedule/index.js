import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

const renderSchedule = (
  size,
  color,
  cyclesLength,
  subcyclesLength,
  subcyclesProgress
) => {
  const cycles = [];
  let currentSubcyclesProgressCount = subcyclesProgress;

  for (let countCycles = 0; countCycles < cyclesLength; countCycles++) {
    let row = [];
    for (
      let countSubcycles = 0;
      countSubcycles < subcyclesLength;
      countSubcycles++
    ) {
      row.push(
        <FontAwesome
          key={countSubcycles}
          style={{ marginHorizontal: 1 }}
          name={currentSubcyclesProgressCount > 0 ? "circle" : "circle-o"}
          size={size}
          color={color}
        />
      );
      currentSubcyclesProgressCount--;
    }
    cycles.push(
      <View key={countCycles} style={styles.cicle}>
        {row}
      </View>
    );
  }

  return cycles;
};

export default function Schedule({
  size = 13,
  color = "#000",
  cyclesLength = 4,
  subcyclesLength = 4,
  currentSubcyclesProgress = 0,
}) {
  const dinamicImageSize = cyclesLength > 3 || subcyclesLength > 4 ? 10 : size;
  const totalSubcycles = cyclesLength * subcyclesLength;

  return (
    <>
      <View style={styles.container}>
        {totalSubcycles > 16 ? (
          <>
            {renderSchedule(
              size,
              color,
              (cyclesLength = 1),
              subcyclesLength,
              (subcyclesProgress = (() => {
                const currentSubcyclesRounded =
                  Math.floor(currentSubcyclesProgress / 4) * 4;
                const subcyclesLeft =
                  currentSubcyclesProgress - currentSubcyclesRounded;
                return subcyclesLeft;
              })())
            )}
            <View style={styles.progress}>
              <Text>
                {currentSubcyclesProgress < 10
                  ? `0${currentSubcyclesProgress}`
                  : currentSubcyclesProgress}{" "}
                | {totalSubcycles}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.content}>
            {renderSchedule(
              dinamicImageSize,
              color,
              cyclesLength,
              subcyclesLength,
              (subcyclesProgress = currentSubcyclesProgress)
            )}
          </View>
        )}
      </View>
    </>
  );
}
