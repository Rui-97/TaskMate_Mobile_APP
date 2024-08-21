import Modal from "react-native-modal";
import { FlatList, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { paddingNmargin } from "../../../constants/styles";
import type { CalendarStackParamList } from "../../types";

type SelectViewModalNavigation =
  NativeStackNavigationProp<CalendarStackParamList>;
const SelectViewModal = ({
  isVisible,
  setIsModalVisible,
}: {
  isVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
}) => {
  const navigation = useNavigation<SelectViewModalNavigation>();

  const viewOptions = [
    {
      viewName: "Default(List) View",
      pressHandler: () => navigation.navigate("CalendarDefaultScreen"),
    },
    {
      viewName: "Month View",
      pressHandler: () => navigation.navigate("CalendarMonthlyScreen"),
    },
    {
      viewName: "Week View",
      pressHandler: () => navigation.navigate("CalendarWeeklyScreen"),
    },
  ];
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={{ position: "relative" }}
    >
      <FlatList
        data={viewOptions}
        renderItem={({ item }) => (
          <Pressable
            style={styles.container}
            onPress={() => {
              item.pressHandler();
              setIsModalVisible(false);
            }}
          >
            {/* <Icon name={icon} size={15} color="#737272" /> */}
            <Text style={styles.text}>{item.viewName}</Text>
          </Pressable>
        )}
        style={styles.modalContentContainer}
      />
    </Modal>
  );
};

export default SelectViewModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 15,
  },
  text: {
    flex: 1,
  },
  modalContentContainer: {
    width: 200,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: paddingNmargin.standard,
    position: "absolute",
    top: 70,
    left: 0,
  },
});
