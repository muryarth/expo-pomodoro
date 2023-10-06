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

export default function countdownClock({ timeInMinutes, isActive, isPaused }) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState(formatToTimeString(timeInMinutes));
  const [seconds, setSeconds] = useState("00");

  // resetTimer();

  useEffect(() => {
    return runTimer(isActive, timeInMinutes);
  }, [isActive]);

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

  const runTimer = (isActive, timeInMinutes) => {
    let timeInSeconds = timeInMinutes * 60;
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        timeInSeconds--;

        changeTimer(timeInSeconds);

        timeInSeconds < 0 ? clearInterval(interval) : null;
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  };

  return (
    <>
      <Text style={styles.relogio}>{`${hours}:${minutes}:${seconds}`}</Text>
    </>
  );
}
