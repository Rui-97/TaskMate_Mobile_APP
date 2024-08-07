import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import type { TaskStackParamList } from "../../types";
import { paddingNmargin } from "../../../constants/styles";

type SubmitTaskBtnNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "AddTaskScreen"
>;
type SubmitTaskBtnProps = {
  onSubmit: () => void;
};

const SubmitTaskBtn = ({ onSubmit }: SubmitTaskBtnProps) => {
  const navigation = useNavigation<SubmitTaskBtnNavigationProp>();

  const submitHandler = () => {
    onSubmit();
    navigation.goBack();
  };

  return (
    <Pressable style={styles.container} onPress={submitHandler}>
      <Icon name="arrow-up-circle" size={40} />
    </Pressable>
  );
};

export default SubmitTaskBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: paddingNmargin.standard,
  },
});
