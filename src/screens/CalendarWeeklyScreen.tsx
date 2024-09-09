import { View, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
} from "react-native-calendars";
import { groupBy } from "lodash";

import { formatDate } from "../utils/utils";
import SelectViewIconButton from "../components/Calendar/SelectViewIconButton";
import SelectViewModal from "../components/Calendar/SelectViewModal";

const INITIAL_TIME = { hour: 9, minutes: 0 };

const events = [
  {
    id: "1",
    date: "2024-09-08",
    start: "2024-09-08 11:00:00",
    end: "2024-09-08 12:00:00",
    title: "Grocery Shopping",
    color: "#9ea9ce",
  },
  {
    id: "2",
    date: "2024-09-08",
    start: "2024-09-08 14:00:00",
    end: "2024-09-08 15:00:00",
    title: "Do laurary",
    color: "#9ea9ce",
  },
];

const CalendarWeeklyScreen = () => {
  const initialDate = CalendarUtils.getCalendarDateString(new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const eventsByDate = groupBy(events, (e) =>
    CalendarUtils.getCalendarDateString(e.start)
  );
  console.log(eventsByDate);
  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <SelectViewIconButton onPress={setIsModalVisible} />

      <CalendarProvider
        date={formatDate(new Date())}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          firstDay={1}
          theme={{
            calendarBackground: "#f1f1f1",
            selectedDayBackgroundColor: "#687dcc",
            arrowColor: "#687dcc",
          }}
        />
        <View style={styles.container}>
          <TimelineList
            events={eventsByDate}
            initialTime={INITIAL_TIME}
            timelineProps={{
              format24h: true,
            }}
            showNowIndicator
            scrollToFirst
          />
        </View>
      </CalendarProvider>
      <SelectViewModal
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </SafeAreaView>
  );
};

export default CalendarWeeklyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
