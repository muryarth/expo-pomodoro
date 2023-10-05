import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import StyledButton from "../../../componentes/StyledButton";

import styles from "./styles";

const formatToTimeString = (timeNumber) => {
  let timeString;
  if (timeNumber < 10) {
    timeString = `0${timeNumber}`;
    return timeString;
  }
  return timeNumber.toString();
};

export default function countdownClock({ timeInMinutes }) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState(formatToTimeString(timeInMinutes));
  const [seconds, setSeconds] = useState("00");

  const countdownTime = (timeInMinutes) => {
    let timeInSeconds = timeInMinutes * 60;

    const interval = setInterval(async () => {
      timeInSeconds--;

      changeTimer(timeInSeconds);

      if (timeInSeconds < 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const changeTimer = (timeInSeconds) => {
    let totalTimeInSeconds = timeInSeconds;
    let minutesLeft = Math.floor(totalTimeInSeconds / 60);
    let secondsLeft = totalTimeInSeconds - minutesLeft * 60;

    let date = new Date();
    let dateTime = date.toLocaleString();

    console.log(`${dateTime}: ${minutesLeft}:${secondsLeft}`);

    if (totalTimeInSeconds >= 0) {
      setMinutes(formatToTimeString(minutesLeft));
      setSeconds(formatToTimeString(secondsLeft));
    }
  };

  return (
    <>
      <Text style={styles.relogio}>{`${hours}:${minutes}:${seconds}`}</Text>
      <StyledButton
        title="Acionar"
        action={() => countdownTime(timeInMinutes)}
        style="secondaryButton"
      />
    </>
  );
}
