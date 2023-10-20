import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Audio } from "expo-av";

// áudio
import BellRing from "../../../assets/sounds/bell_single_ring_zapsplat.mp3";

// componentes globais
import Credits from "../../componentes/Credits";
import StyledButton from "../../componentes/StyledButton";
import TouchableIcon from "../../componentes/TouchableIcon";

// componentes
import Relogio from "./relogio";
import Schedule from "./schedule";

// estilos
import styles from "./styles";

export default function Pomodoro() {
  // Outras variáveis
  const iconSize = 50;
  const totalTimeInSeconds = 10; // Tempo da contagem

  // Hooks
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState(totalTimeInSeconds);
  const [isDisabled, setIsDisabled] = useState(false); // Referente ao estado do botão
  const [isActive, setIsActive] = useState(false); // Referente ao timer
  const [isPaused, setIsPaused] = useState(false);
  const [currentPausedTime, setCurrentPausedTime] = useState();

  const toggleDisabledButton = () => {
    setIsDisabled(!isDisabled);
  };

  const resetTimer = (totalTimeInSeconds) => {
    console.log("Reseting timer...");
    toggleDisabledButton();
    setIsActive(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(0);
    setSeconds(totalTimeInSeconds);
    setCurrentPausedTime(null);
  };

  const togglePause = () => {
    console.log(!isPaused ? "Pausing..." : "Unpausing...");
    setIsPaused(!isPaused);
  };

  const playTimer = () => {
    console.log("Playing timer...");
    toggleDisabledButton();
    setIsActive(true);
  };

  const handleTimer = (
    isActive,
    isPaused,
    currentPausedTime = null,
    totalTimeInSeconds
  ) => {
    let timeInSeconds =
      currentPausedTime == null ? totalTimeInSeconds : currentPausedTime;
    let interval;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        timeInSeconds--;
        console.log(timeInSeconds);
        if (timeInSeconds <= 0) {
          resetTimer();
          // playSound();
          return clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      setCurrentPausedTime(timeInSeconds);
      clearInterval(interval);
    };
  };

  // Roda sempre que os estado "isActive" for true
  useEffect(() => {
    return handleTimer(
      isActive,
      isPaused,
      currentPausedTime,
      totalTimeInSeconds
    );
  }, [isActive, isPaused]);

  // Renderiza os componentes da aplicação
  return (
    <>
      <View style={styles.container}>
        <View style={styles.clock}>
          <Relogio {...{ hours, minutes, seconds }} />
          {/* <Schedule subciclesLength={3} ciclesLength={3} /> */}
        </View>
        <View style={styles.buttonGroup}>
          {/* Pause */}
          <TouchableIcon
            style={styles.button}
            iconName="pause-circle-outline"
            size={iconSize}
            action={() => togglePause()}
            disabled={!isDisabled}
          />
          {/* Play */}
          <TouchableIcon
            style={styles.button}
            iconName="play-circle-outline"
            size={iconSize}
            action={() => playTimer()}
            disabled={isDisabled}
          />
          {/* Reset */}
          <TouchableIcon
            style={styles.button}
            iconName="stop-circle-outline"
            size={iconSize}
            action={() => resetTimer()}
            disabled={!isDisabled}
          />
        </View>
        <Credits />
      </View>
    </>
  );
}
