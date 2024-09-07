import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  View,
  Image,
  FlatList,
} from "react-native";
import {
  CountdownCircleTimer,
  TimeProps,
} from "react-native-countdown-circle-timer";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";

import StartButton from "../components/Pomo/StartButton";

const DURATIONS = [
  { label: "25:00", value: 25 * 60 },
  { label: "30:00", value: 30 * 60 },
  { label: "40:00", value: 40 * 60 },
  { label: "60:00", value: 60 * 60 },
  // { label: "1", value: 1 },
];

const PomoScreen = () => {
  const [isTimerPlaying, setIstimerPlaying] = useState(false);
  const [isStartBtnVisible, setIsStartBtnVisible] = useState(true);
  const [isPomoEndModalVisible, setIsPomoEndModalVisible] = useState(false);
  const [isSelectDurationModalVisible, setIsSelectDurationModalVisible] =
    useState(false);
  const [key, setKey] = useState(0);
  const [durationInSecs, setDurationInSecs] = useState(25 * 60);

  const startButtonPressedHandler = () => {
    setIstimerPlaying(true);
    setIsStartBtnVisible(false);
  };

  const endSession = () => {
    setKey((prevKey) => prevKey + 1);
    setIstimerPlaying(false);
    setIsStartBtnVisible(true);
  };

  const timerCompleteHandler = () => {
    endSession();
    setIsPomoEndModalVisible(true);
  };

  const renderTime = ({ remainingTime }: TimeProps) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayTime =
      remainingTime < 60
        ? remainingTime
        : `${displayMinutes}:${displaySeconds}`;

    return (
      <Pressable onPress={() => setIsSelectDurationModalVisible(true)}>
        <Text style={styles.timeText}>{displayTime}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text>Focus</Text>
      <CountdownCircleTimer
        isPlaying={isTimerPlaying}
        duration={durationInSecs}
        size={260}
        colors={"#687dcc"}
        key={key} //used to restart timer if needed
        onComplete={timerCompleteHandler}
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
            onPress={endSession}
            style={[styles.circle, { borderColor: "#858585" }]}
          >
            <Icon name="square" size={20} color="#858585" />
          </Pressable>
        </View>
      )}

      {/* Pomo End Modal===================== */}
      <Modal
        isVisible={isPomoEndModalVisible}
        onBackdropPress={() => setIsPomoEndModalVisible(false)}
        style={{ position: "relative" }}
      >
        <View style={styles.modalContentContiner}>
          <View>
            <Text style={styles.endModalTitle}>Great job!</Text>
            <Text style={styles.endModalDescription}>
              You just completed a Pomodoro session
            </Text>
          </View>
          <Image source={require("../../assets/pomo.png")} />
          <Pressable onPress={() => setIsPomoEndModalVisible(false)}>
            <Text>OK</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Select Duration Modal===================== */}
      <Modal
        isVisible={isSelectDurationModalVisible}
        onBackdropPress={() => setIsSelectDurationModalVisible(false)}
        style={{ position: "relative" }}
      >
        <View style={styles.modalContentContiner}>
          <Text style={styles.durationModalTitle}>Pomo Options</Text>
          <FlatList
            data={DURATIONS}
            renderItem={({ item, index }) => (
              <Pressable
                style={styles.timeContainer}
                onPress={() => {
                  setDurationInSecs(item.value);
                  setIsSelectDurationModalVisible(false);
                }}
              >
                <Text>{item.label}</Text>
              </Pressable>
            )}
            numColumns={2}
          />
        </View>
      </Modal>
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
  modalContentContiner: {
    width: "70%",
    marginHorizontal: "auto",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "center",
    gap: 20,
    marginBottom: "10%",
  },
  endModalTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 6,
  },
  endModalDescription: {
    textAlign: "center",
    fontSize: 12,
    color: "#3f3f3f",
  },
  timeContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: "15%",
    backgroundColor: "#ebebeb",
    marginVertical: "1%",
    marginHorizontal: "2%",
  },
  durationModalTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
