import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { paddingNmargin } from "../../../constants/styles";
import { capitalizeWord } from "../../utils/utils";

const SettingsItem = ({ icon, name }: { icon: string; name: string }) => {
  return (
    <Pressable style={styles.container}>
      <Icon name={icon} size={18} style={{ flex: 1 }} color={"#f09b11"} />
      <Text style={{ flex: 10, fontSize: 16 }}>{capitalizeWord(name)}</Text>
    </Pressable>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: paddingNmargin.standard,
    alignItems: "center",
  },
});
