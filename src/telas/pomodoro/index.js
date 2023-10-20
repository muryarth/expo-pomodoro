import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Audio } from "expo-av";

// áudio
import BellRing from "../../../assets/sounds/bell_single_ring_zapsplat.mp3";

// componentes globais
import Credits from "../../componentes/Credits";
import TouchableIcon from "../../componentes/TouchableIcon";
import StyledButton from "../../componentes/StyledButton";

// componentes
import Relogio from "./relogio";
import Schedule from "./schedule";

// estilos
import styles from "./styles";

export default function Pomodoro() {
  // Outras variáveis
  const iconSize = 50;
  const totalTimeInSeconds = 60; // Tempo da contagem

  // Hooks
  const [sound, setSound] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState(totalTimeInSeconds);
  const [isDisabled, setIsDisabled] = useState(false); // Referente ao estado do botão
  const [isActive, setIsActive] = useState(false); // Referente ao timer
  const [isPaused, setIsPaused] = useState(false); // Referente ao timer
  const [currentTime, setCurrentTime] = useState(totalTimeInSeconds);

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

  const toggleDisabledButton = () => {
    setIsDisabled(!isDisabled);
  };

  // Reseta os estados de cada hook
  const resetTimer = (totalTimeInSeconds) => {
    console.log("Reseting timer...");
    toggleDisabledButton();
    setIsActive(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(0);
    setSeconds(totalTimeInSeconds);
    setCurrentTime(totalTimeInSeconds);
  };

  // Pausa o andamento do timer
  const togglePause = () => {
    console.log(!isPaused ? "Pausing..." : "Unpausing...");
    setIsPaused(!isPaused);
  };

  // Inicia o andamento do timer
  const playTimer = () => {
    console.log("Playing timer...");
    toggleDisabledButton();
    setIsActive(true);
  };

  // Muda o valor do timer na tela, acompanhando o andamento do tempo
  const updateTimer = (timeInSeconds) => {
    let totalTimeInSeconds = timeInSeconds;
    let minutesLeft = Math.floor(totalTimeInSeconds / 60);
    let secondsLeft = totalTimeInSeconds - minutesLeft * 60;

    let date = new Date();
    let dateTime = date.toLocaleString();

    console.log(`${dateTime}: ${minutesLeft}:${secondsLeft}`);

    if (totalTimeInSeconds >= 0) {
      setMinutes(minutesLeft);
      setSeconds(secondsLeft);
    }
  };

  // Controla o comportamento do timer
  const handleTimer = () => {
    // Tempo total em segundos
    // Dependendo, pode pegar o tempo baseado no tempo restante após a pausa do timer
    // ou do tempo total configurado no timer inicialmente
    let timeInSeconds = currentTime;

    // Variável referente ao intervalo de tempo rodando na app
    let interval;

    // Executa a função de acordo com o andamento do tempo
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        timeInSeconds--;
        updateTimer(timeInSeconds);
        setCurrentTime(timeInSeconds);

        if (timeInSeconds <= 0) {
          resetTimer(totalTimeInSeconds);
          playSound();
          return clearInterval(interval);
        }
      }, 1000);
    }

    // Limpa o intervalo
    return () => {
      if (!isActive) setCurrentTime(totalTimeInSeconds); // Reseta o timer
      clearInterval(interval);
    };
  };

  // Roda sempre que os estados [isActive] forem alterados
  useEffect(() => {
    return handleTimer();
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
            action={() => resetTimer(totalTimeInSeconds)}
            disabled={!isDisabled}
          />
        </View>
        <Credits />
      </View>
    </>
  );
}
