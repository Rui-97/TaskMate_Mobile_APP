import { View, Text, Pressable, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SimpleBtn from "../components/SimpleBtn";
import type { TaskStackParamList } from "../types";
import { paddingNmargin } from "../../constants/styles";

type TaskCalendarScreenNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "TaskCalendarScreen"
>;

type TaskCalendarScreenProps = {
  navigation: TaskCalendarScreenNavigationProp;
};
const TaskCalendarScreen = ({ navigation }: TaskCalendarScreenProps) => {
  const [selectedDayString, setSelectedDayString] = useState("");
  const markedDate = {
    [selectedDayString]: {
      selected: true,
      marked: true,
      selectedColor: "#687dcc",
    },
  };

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.cancelBtnContainer}>
          <SimpleBtn
            buttonName="Cancel"
            border={false}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.doneBtnContainer}>
          <SimpleBtn
            buttonName="Done"
            border={false}
            onPress={() =>
              navigation.navigate({
                name: "AddTaskScreen",
                params: { date: selectedDayString },
                merge: true,
              })
            }
          />
        </View>
      </View>

      <Calendar
        onDayPress={(day: { dateString: string }) => {
          setSelectedDayString(day.dateString);
        }}
        markedDates={markedDate}
        theme={{
          calendarBackground: "#f1f1f1",
          todayTextColor: "#687dcc",
          arrowColor: "#687dcc",
        }}
      />
    </View>
  );
};

export default TaskCalendarScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    marginTop: paddingNmargin.standard,
  },
  cancelBtnContainer: {
    flex: 1,
  },
  doneBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
