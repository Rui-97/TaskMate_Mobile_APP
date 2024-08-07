import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Ionicons";

import { MiniDropdownOption, TaskValueIdentifer } from "../../types";
import { paddingNmargin } from "../../../constants/styles";

type MiniDropdownProps = {
  placeholder: string;
  val?: string;
  iconName: string;
  options: MiniDropdownOption[];
  onValueChange: (valueIdentifer: TaskValueIdentifer, value: string) => void;
  taskValueIdentifier: TaskValueIdentifer;
};

const MiniDropdown = ({
  placeholder,
  val = "",
  iconName,
  options,
  onValueChange,
  taskValueIdentifier,
}: MiniDropdownProps) => {
  const [value, setValue] = useState(val);
  const [isFocus, setIsFocus] = useState(false);

  const valueChangeHandler = (value: string) => {
    setValue(value);
    onValueChange(taskValueIdentifier, value);
  };
  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus || value ? { borderColor: "#687dcc" } : null,
        ]}
        iconStyle={styles.iconStyle}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => valueChangeHandler(item.value)}
        renderLeftIcon={() => (
          <Icon
            name={iconName}
            style={styles.icon}
            size={15}
            color={isFocus || value ? "#687dcc" : "#636363"}
          />
        )}
      />
    </View>
  );
};

export default MiniDropdown;

const styles = StyleSheet.create({
  container: {
    marginRight: paddingNmargin.small,
  },
  dropdown: {
    width: 120,
    borderColor: "#636363",
    borderWidth: 0.9,
    borderRadius: 8,
    paddingHorizontal: paddingNmargin.small,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  placeholder: {
    fontSize: 14,
    color: "#636363",
  },
  selectedText: {
    fontSize: 14,
    color: "#687dcc",
  },
});
