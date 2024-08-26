import { SafeAreaView, Text, StyleSheet, Pressable, View } from "react-native";
import {
  CountdownCircleTimer,
  TimeProps,
} from "react-native-countdown-circle-timer";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import StartButton from "../components/Pomo/StartButton";

const renderTime = ({ remainingTime }: TimeProps) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayTime =
    remainingTime < 60 ? remainingTime : `${displayMinutes}:${displaySeconds}`;

  return <Text style={styles.timeText}>{displayTime}</Text>;
};

const PomoScreen = () => {
  const [isTimerPlaying, setIstimerPlaying] = useState(false);
  const [isStartBtnVisible, setIsStartBtnVisible] = useState(true);
  const [key, setKey] = useState(0);

  const startButtonPressedHandler = () => {
    setIstimerPlaying(true);
    setIsStartBtnVisible(false);
  };

  const endButtonPressedHandler = () => {
    setKey((prevKey) => prevKey + 1);
    setIstimerPlaying(false);
    setIsStartBtnVisible(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text>Focus</Text>
      <CountdownCircleTimer
        isPlaying={isTimerPlaying}
        duration={60 * 25}
        size={260}
        colors={"#687dcc"}
        key={key} //used to restart timer if needed
      >
        {renderTime}
      </CountdownCircleTimer>
      {isStartBtnVisible ? (
        <StartButton onPress={startButtonPressedHandler} />
      ) : (
        <View style={styles.row}>
          {/* Pause and resuem buttons */}
          <Pressable
            onPress={() => setIstimerPlaying(!isTimerPlaying)}
            style={[
              styles.circle,
              { backgroundColor: "#687dcc", borderColor: "#687dcc" },
            ]}
          >
            {isTimerPlaying ? (
              <Icon name="pause" size={20} color="#ffffff" />
            ) : (
              <Icon name="play" size={20} color="#ffffff" />
            )}
          </Pressable>
          {/* End button */}
          <Pressable
            onPress={endButtonPressedHandler}
            style={[styles.circle, { borderColor: "#858585" }]}
          >
            <Icon name="square" size={20} color="#858585" />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PomoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 70,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
  },
  timeText: {
    fontSize: 40,
    fontWeight: 500,
  },
});
