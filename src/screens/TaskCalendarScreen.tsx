import { View, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useState } from "react";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SimpleBtn from "../components/UI/SimpleBtn";
import type { TaskStackParamList } from "../types";
import { paddingNmargin } from "../../constants/styles";

// type TaskCalendarScreenNavigationProp = NativeStackNavigationProp<
//   TaskStackParamList,
//   "TaskCalendarScreen"
// >;
type Props = NativeStackScreenProps<TaskStackParamList, "TaskCalendarScreen">;

// type TaskCalendarScreenProps = {
//   navigation: TaskCalendarScreenNavigationProp;
// };
const TaskCalendarScreen = ({ navigation, route }: Props) => {
  const prevScreen = route.params.prevScreen;
  const [selectedDate, setSelectedDate] = useState("");
  const markedDate = {
    [selectedDate]: {
      selected: true,
      marked: true,
      selectedColor: "#687dcc",
    },
  };
  const doneHandler = () => {
    if (prevScreen === "AddTaskScreen") {
      navigation.navigate({
        name: "AddTaskScreen",
        params: { date: selectedDate },
        merge: true,
      });
    } else if (prevScreen === "UpdateTaskScreen") {
      navigation.navigate({
        name: "UpdateTaskScreen",
        params: { date: selectedDate },
        merge: true,
      });
    }
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
          <SimpleBtn buttonName="Done" border={false} onPress={doneHandler} />
        </View>
      </View>

      <Calendar
        onDayPress={(dateData: DateData) => {
          setSelectedDate(dateData.dateString);
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
