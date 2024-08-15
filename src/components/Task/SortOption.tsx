import { Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";

import { paddingNmargin } from "../../../constants/styles";
import { capitalizeWord } from "../../utils/utils";

const SortOption = ({
  option,
  selectedOption,
  onSelect,
}: {
  option: string;
  selectedOption: string;
  onSelect: () => void;
}) => {
  const isSelect = selectedOption === option;
  return (
    <Pressable
      onPress={() => onSelect()}
      style={[
        styles.container,
        { backgroundColor: isSelect ? "#687dcc" : "#eeeeee" },
      ]}
    >
      <Text style={[styles.text, { color: isSelect ? "#ffffff" : "#7a7878" }]}>
        {capitalizeWord(option)}
      </Text>
    </Pressable>
  );
};

export default SortOption;
const styles = StyleSheet.create({
  container: {
    paddingVertical: paddingNmargin.small,
    paddingHorizontal: paddingNmargin.standard,
    borderRadius: 20,
    width: "30%",
    marginVertical: paddingNmargin.small,
  },
  text: {
    textAlign: "center",
  },
});
