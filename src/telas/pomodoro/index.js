import React, { useState } from "react";
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
  const iconSize = 50;
  const [time, setTime] = React.useState(10);
  const [onFocusTime, setOnFocusTime] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

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

  // Alternar para o modo de foco
  const toggleFocusTime = (onFocusTime) => {
    if (!onFocusTime) {
      console.log("Modo de foco ativado!");
    } else {
      console.log("Modo de foco desativado!");
    }
    setOnFocusTime(!onFocusTime);
  };

  // Pausar contagem do tempo
  const togglePause = (isPaused) => {
    console.log("Pausado...");
    setIsPaused(!isPaused);
  };

  // Renderiza componentes
  return (
    <>
      <View style={styles.container}>
        <View style={styles.clock}>
          <Relogio timeInMinutes={30} isActive={onFocusTime} />
          <Schedule subciclesLength={4} ciclesLength={3} />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableIcon
            style={styles.button}
            iconName="pause-circle-outline"
            size={iconSize}
            action={() => togglePause(isPaused)}
          />
          <TouchableIcon
            style={styles.button}
            iconName="play-circle-outline"
            size={iconSize}
            action={() => toggleFocusTime(onFocusTime)}
          />
          <TouchableIcon
            style={styles.button}
            size={iconSize}
            iconName="stop-circle-outline"
            action={() => toggleFocusTime(onFocusTime)}
          />
        </View>
        <Credits />
      </View>
    </>
  );
}
