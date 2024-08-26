import { SafeAreaView } from "react-native";
import { CalendarList, CalendarUtils } from "react-native-calendars";
import { Dimensions } from "react-native";
import { useState } from "react";

import MonthlyViewDateItem from "../components/Calendar/MonthlyViewDateItem";
import SelectViewIconButton from "../components/Calendar/SelectViewIconButton";
import SelectViewModal from "../components/Calendar/SelectViewModal";

const CalendarMonthlyScreen = () => {
  const initialDate = CalendarUtils.getCalendarDateString(new Date());
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView>
      <SelectViewIconButton onPress={setIsModalVisible} />
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
        theme={{
          calendarBackground: "#f1f1f1",
        }}
      />
      <SelectViewModal
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </SafeAreaView>
  );
};

export default CalendarMonthlyScreen;
