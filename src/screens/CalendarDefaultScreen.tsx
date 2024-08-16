import { View, SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { Calendar, CalendarUtils, DateData } from "react-native-calendars";
import { useContext } from "react";

import { TasksContext } from "../../context/TasksContext";
import TaskItem from "../components/Task/TaskItem";
import { paddingNmargin } from "../../constants/styles";

const CalendarDefaultScreen = () => {
  const initialDate = CalendarUtils.getCalendarDateString(new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { getTasksByDateAndCompletion } = useContext(TasksContext);
  const tasks = getTasksByDateAndCompletion(selectedDate, false);

  const markedDate = {
    [selectedDate]: {
      selected: true,
      marked: true,
      selectedColor: "#687dcc",
    },
  };

  return (
    <SafeAreaView>
      <Calendar
        theme={{
          calendarBackground: "#f1f1f1",
          todayTextColor: "#687dcc",
          arrowColor: "#687dcc",
        }}
        onDayPress={(dateData: DateData) => {
          setSelectedDate(dateData.dateString);
        }}
        markedDates={markedDate}
      />
      <View style={styles.tasksContainer}>
        <Text style={styles.dateTitle}>{selectedDate}</Text>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem task={item} showDetails={false} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarDefaultScreen;

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: paddingNmargin.standard,
  },
  dateTitle: {
    paddingHorizontal: paddingNmargin.small,
    paddingTop: paddingNmargin.standard,
    paddingBottom: paddingNmargin.small,
  },
  tasksContainer: {
    margin: paddingNmargin.standard,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
});
