import { View, SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { Calendar, CalendarUtils, DateData } from "react-native-calendars";
import { useContext } from "react";

import { TasksContext } from "../../context/TasksContext";
import TaskItem from "../components/Task/TaskItem";
import { paddingNmargin } from "../../constants/styles";
import AddTaskBtn from "../components/Task/AddTaskBtn";
import { formatDateToMonthDay } from "../utils/utils";
import NoTasks from "../components/Task/NoTasks";
import SelectViewIconButton from "../components/Calendar/SelectViewIconButton";
import SelectViewModal from "../components/Calendar/SelectViewModal";

const CalendarDefaultScreen = () => {
  const initialDate = CalendarUtils.getCalendarDateString(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { getTasksByDateAndCompletion, getDatesAssignedWithTasks } =
    useContext(TasksContext);
  const tasks = getTasksByDateAndCompletion(selectedDate, false);
  const assignedDates = getDatesAssignedWithTasks();
  const assignedDatesSettings = assignedDates.reduce((acc, key) => {
    acc[key] = {
      marked: true,
      dotColor: "#687dcc",
    };
    return acc;
  }, {});

  const markedDates = {
    ...assignedDatesSettings,
    [selectedDate]: {
      selected: true,
      selectedColor: "#687dcc",
    },
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <SelectViewIconButton onPress={setIsModalVisible} />
      <Calendar
        theme={{
          calendarBackground: "#f1f1f1",
          todayTextColor: "#687dcc",
          arrowColor: "#687dcc",
        }}
        onDayPress={(dateData: DateData) => {
          setSelectedDate(dateData.dateString);
        }}
        markedDates={markedDates}
        enableSwipeMonths
      />

      {tasks.length === 0 ? (
        <NoTasks />
      ) : (
        <View style={styles.tasksContainer}>
          <Text style={styles.dateTitle}>
            {formatDateToMonthDay(selectedDate)}
          </Text>

          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TaskItem task={item} showDetails={false} />
            )}
          />
        </View>
      )}
      <AddTaskBtn date={selectedDate} />
      <SelectViewModal
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </SafeAreaView>
  );
};

export default CalendarDefaultScreen;

const styles = StyleSheet.create({
  viewIcon: {
    marginHorizontal: paddingNmargin.standard,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: paddingNmargin.standard,
  },
  dateTitle: {
    paddingHorizontal: 12,
    paddingTop: paddingNmargin.standard,
    paddingBottom: paddingNmargin.small,
  },
  tasksContainer: {
    margin: paddingNmargin.standard,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
});
