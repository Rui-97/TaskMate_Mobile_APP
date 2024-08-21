import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { CalendarStackParamList } from "../../types";
import { paddingNmargin } from "../../../constants/styles";

type SelectViewIconButtonNavigation =
  NativeStackNavigationProp<CalendarStackParamList>;

const SelectViewIconButton = ({
  onPress,
}: {
  onPress: (visible: boolean) => void;
}) => {
  const navigation = useNavigation<SelectViewIconButtonNavigation>();

  return (
    <Pressable
      style={styles.viewIcon}
      //   onPress={() => navigation.navigate("CalendarMonthlyScreen")}
      onPress={() => onPress(true)}
    >
      <Icon name="view-module-outline" size={25} />
    </Pressable>
  );
};

export default SelectViewIconButton;

const styles = StyleSheet.create({
  viewIcon: {
    marginHorizontal: paddingNmargin.standard,
  },
});
