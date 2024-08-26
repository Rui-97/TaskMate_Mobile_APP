import { SafeAreaView, Text, StyleSheet, Pressable, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

import StartButton from "../components/Pomo/StartButton";

const renderTime = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayTime =
    remainingTime < 60 ? remainingTime : `${displayMinutes}:${displaySeconds}`;
  return <Text>{displayTime}</Text>;
};

const PomoScreen = () => {
  const [isTimerPlaying, setIstimerPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const endButtonPressedHandler = () => {
    setKey((prevKey) => prevKey + 1);
    setIstimerPlaying(false);
  };

  console.log(isTimerPlaying);
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Focus</Text>
      <CountdownCircleTimer
        isPlaying={isTimerPlaying}
        duration={240}
        size={260}
        colors={"#687dcc"}
        // colorsTime={[7, 5, 2, 0]}
        key={key}
      >
        {renderTime}
      </CountdownCircleTimer>
      {!isTimerPlaying ? (
        <StartButton onPress={() => setIstimerPlaying(true)} />
      ) : (
        <View style={styles.row}>
          <StartButton onPress={() => setIstimerPlaying(false)} />
          {/* End button */}
          <Pressable onPress={endButtonPressedHandler}>
            <Text>restart</Text>
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
    gap: 50,
  },
  row: {
    flexDirection: "row",
  },
});
