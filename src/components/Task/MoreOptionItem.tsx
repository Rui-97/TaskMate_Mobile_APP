import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const MoreOptionItem = ({
  icon,
  text,
  needCheckIcon,
  showCheckIcon,
  onPress,
}: {
  icon: string;
  text: string;
  needCheckIcon: boolean;
  showCheckIcon: boolean | null;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name={icon} size={15} color="#737272" />
      <Text style={styles.text}>{text}</Text>
      {needCheckIcon && showCheckIcon && (
        <Icon name="check" size={13} color="#687dcc" />
      )}
    </Pressable>
  );
};

export default MoreOptionItem;

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
});
