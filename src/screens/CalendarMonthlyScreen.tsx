import { View, SafeAreaView, Text } from "react-native";
import { CalendarList, CalendarUtils, DateData } from "react-native-calendars";
import { Dimensions } from "react-native";
import { useState } from "react";

import MonthlyViewDateItem from "../components/Calendar/MonthlyViewDateItem";

const CalendarMonthlyScreen = () => {
  const initialDate = CalendarUtils.getCalendarDateString(new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView>
      <CalendarList
        dayComponent={({ date, state }) => (
          <MonthlyViewDateItem
            date={date}
            state={state}
            selecteDate={selectedDate}
            onSelect={setSelectedDate}
          />
        )}
        calendarHeight={(screenHeight / 7) * 6}
      />
    </SafeAreaView>
  );
};

export default CalendarMonthlyScreen;
