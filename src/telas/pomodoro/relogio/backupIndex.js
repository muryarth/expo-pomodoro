import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Audio } from "expo-av";

import StyledButton from "../../../componentes/StyledButton";
import BellRing from "../../../../assets/sounds/bell_single_ring_zapsplat.mp3";

import styles from "./styles";

// Formata a string para ficar no modelo do relógio
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
  const [sound, setSound] = useState();

  // Inicia o timer sempre que o estado "isActive" estiver setado como verdadeiro
  useEffect(() => {
    return runTimer(isActive, 0.2);
  }, [isActive]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading sound!");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Toca o som após intervalo de tempo definido
  const playSound = async (time) => {
    setTimeout(async function () {
      console.log("Loading sound...");
      const { sound } = await Audio.Sound.createAsync(BellRing);
      setSound(sound);

      console.log("Playing sound!");
      await sound.playAsync();
    }, time);
  };

  // Reseta o valor do timer na tela
  const resetTimer = () => {
    setHours("00");
    setMinutes(formatToTimeString(timeInMinutes));
    setSeconds("00");
  };

  // Controla a contagem do tempo
  const runTimer = (isActive, timeInMinutes) => {
    let timeInSeconds = timeInMinutes * 60;
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        timeInSeconds--;

        changeTimer(timeInSeconds);

        if (timeInSeconds <= 0) {
          clearInterval(interval);
          playSound(1);
          resetTimer();
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  };

  // Muda o valor do timer na tela, acompanhando o andamento do tempo
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
    </>
  );
}
