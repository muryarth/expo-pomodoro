import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import defaultStyles from "./styles";

export default function countdownClock({
  color = "#000",
  hours: timeInHours = "00",
  minutes: timeInMinutes = "00",
  seconds: timeInSeconds = "00",
}) {
  // Formata o número que será exibido no relógio
  const formatArgument = (timeNumber, timeFormatCap = 59) => {
    let timeString;
    if (timeNumber >= 10 && timeNumber <= timeFormatCap) {
      return timeNumber.toString();
    } else if (timeNumber < 10 && timeNumber >= 1) {
      timeString = `0${timeNumber}`;
      return timeString;
    }
    return "00";
  };

  const [hours, setHours] = useState(formatArgument(timeInHours, 24));
  const [minutes, setMinutes] = useState(formatArgument(timeInMinutes));
  const [seconds, setSeconds] = useState(formatArgument(timeInSeconds));

  useEffect(() => {
    setHours(formatArgument(timeInHours, 24));
    setMinutes(formatArgument(timeInMinutes));
    setSeconds(formatArgument(timeInSeconds));
  }, [timeInHours, timeInMinutes, timeInSeconds]);

  return (
    <>
      <Text
        style={[defaultStyles.relogio, { color: color }]}
      >{`${hours}:${minutes}:${seconds}`}</Text>
    </>
  );
}
