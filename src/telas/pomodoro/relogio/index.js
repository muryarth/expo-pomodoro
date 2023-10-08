import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Audio } from "expo-av";

import StyledButton from "../../../componentes/StyledButton";
import BellRing from "../../../../assets/sounds/bell_single_ring_zapsplat.mp3";

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

  // Toca o som
  const playSound = async (time) => {
    console.log("Loading sound...");

    const { sound } = await Audio.Sound.createAsync(BellRing);

    // Toca o som, após intervalo de tempo definido
    setTimeout(async function () {
      console.log("Playing sound!");
      await sound.playAsync();
    }, time);
  };

  // resetTimer();

  useEffect(() => {
    return runTimer(isActive, 0.1);
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

        if (timeInSeconds <= 0) {
          playSound(1);
          clearInterval(interval);
        }
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
