import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import styles from "./styles";

export default function countdownClock({
  hours: timeInHours = "00",
  minutes: timeInMinutes = "00",
  seconds: timeInSeconds = "00",
}) {
  // Formata o número que será exibido no relógio
  const formatArgument = (timeNumber) => {
    let timeString;
    if (timeNumber >= 10 && timeNumber <= 60) {
      return timeNumber.toString();
    } else if (timeNumber < 10 && timeNumber >= 1) {
      timeString = `0${timeNumber}`;
      return timeString;
    }
    return "00";
  };

  const [hours, setHours] = useState(formatArgument(timeInHours));
  const [minutes, setMinutes] = useState(formatArgument(timeInMinutes));
  const [seconds, setSeconds] = useState(formatArgument(timeInSeconds));

  useEffect(() => {
    setHours(formatArgument(timeInHours));
    setMinutes(formatArgument(timeInMinutes));
    setSeconds(formatArgument(timeInSeconds));
  }, [timeInHours, timeInMinutes, timeInSeconds]);

  return (
    <>
      <Text style={styles.relogio}>{`${hours}:${minutes}:${seconds}`}</Text>
    </>
  );
}
