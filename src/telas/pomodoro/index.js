import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Audio } from "expo-av";

// Áudio
import BellRing from "../../../assets/sounds/bell_single_ring_zapsplat.mp3";

// Componentes globais
import Credits from "../../componentes/Credits";
import TouchableIcon from "../../componentes/TouchableIcon";

// Componentes internos
import Relogio from "./relogio";
import Schedule from "./schedule";

// Estilos
import styles from "./styles";

export default function Pomodoro({ totalTimeInSeconds = 1800 }) {
  // Outras variáveis
  const iconSize = 50;

  // Hooks
  const [sound, setSound] = useState();
  const [hours, setHours] = useState("00"); // Somente para renderização dos estados no relógio
  const [minutes, setMinutes] = useState("00"); // Somente para renderização dos estados no relógio
  const [seconds, setSeconds] = useState("00"); // Somente para renderização dos estados no relógio
  const [isDisabled, setIsDisabled] = useState(false); // Referente ao estado do botão
  const [isActive, setIsActive] = useState(false); // Referente ao timer
  const [isPaused, setIsPaused] = useState(false); // Referente ao timer
  const [currentTime, setCurrentTime] = useState(totalTimeInSeconds); // Estado referente à progressão da contagem do tempo

  // Toca som da notificação após intervalo de tempo definido
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
  const resetTimer = () => {
    console.log("Reseting timer...");
    toggleDisabledButton();
    setIsActive(false);
    setIsPaused(false);
    setCurrentTime(totalTimeInSeconds);
    updateTimerRender(totalTimeInSeconds);
  };

  // Pausa o andamento do timer
  const togglePause = () => {
    console.log(!isPaused ? "Pausing..." : "Unpausing...");
    setIsPaused(!isPaused);
  };

  // Inicia o andamento do timer
  const playTimer = () => {
    // Captura o momento em que o timer é acionado
    // let date = new Date();
    // let dateTime = date.toLocaleString();
    // console.log(`${dateTime}`);

    if (currentTime > 0 && currentTime <= 86400) {
      // Impede que o usuário dê play com um tempo menor ou igual a 0 segundos
      console.log("Playing timer...");
      toggleDisabledButton();
      setIsActive(true);
    }
  };

  // Muda o valor do timer na tela, acompanhando o andamento do tempo (em segundos)
  const updateTimerRender = (timeInSeconds) => {
    let totalTimeInSeconds = timeInSeconds;

    // Calcula horas, minutos e segundos restantes baseado no tempo total (que é recebido em segundos)
    // Formatando o relógio sempre da maneira correta
    let hoursLeft = Math.floor(totalTimeInSeconds / 3600);
    let minutesLeft = Math.floor(totalTimeInSeconds / 60) - hoursLeft * 60;
    let secondsLeft = totalTimeInSeconds - minutesLeft * 60 - hoursLeft * 3600;

    // Usado somente para desenvolvimento
    // let date = new Date();
    // let dateTime = date.toLocaleString();
    // console.log(`${dateTime}: ${minutesLeft}:${secondsLeft}`);

    if (totalTimeInSeconds >= 0) {
      setHours(hoursLeft);
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
        updateTimerRender(timeInSeconds);
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

  // Executa quando componente é montado
  useEffect(() => {
    // Limita um máximo de 24h
    const displayedTime = totalTimeInSeconds <= 86400 ? totalTimeInSeconds : 0;

    setCurrentTime(displayedTime);
    updateTimerRender(displayedTime);
  }, []);

  // Renderiza os componentes da aplicação
  return (
    <>
      <View style={styles.container}>
        <View style={styles.clock}>
          {/* Exibição do relógio */}
          <Relogio {...{ hours, minutes, seconds }} />

          {/* Exibição dos ciclos do pomodoro */}
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
