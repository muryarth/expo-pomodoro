import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function countdownClock({ onFocusTime, timeInMiliseconds }) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("30");
  const [seconds, setSeconds] = useState("00");

  return (
    <>
      <Text style={styles.relogio}>{`${hours}:${minutes}:${seconds}`}</Text>
    </>
  );
}
