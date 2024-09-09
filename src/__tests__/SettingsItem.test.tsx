import React from "react";
import { render, screen } from "@testing-library/react-native";

import SettingsItem from "../components/Account/SettingsItem";
import { capitalizeWord } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";

// Mock the Icon component to avoid rendering issues during tests
jest.mock("react-native-vector-icons/FontAwesome5", () => "Icon");

// Mock the capitalizeWord function
jest.mock("../../utils/utils", () => ({
  capitalizeWord: jest.fn((word: string) => word.toUpperCase()),
}));

describe("SettingsItem", () => {
  test("renders icon and text", () => {
    render(<SettingsItem icon="home" name="settings" />);

    // Check if the icon and text are rendered
    expect(screen.getByText("SETTINGS")).toBeTruthy();
    expect(screen.getByTestId("icon")).toBeTruthy(); // Assuming you add testID to Icon if needed
  });

  test("applies correct styles", () => {
    const { getByText } = render(<SettingsItem icon="home" name="settings" />);

    // Check if the text has the correct font size
    const textElement = getByText("SETTINGS");
    expect(textElement.props.style.fontSize).toBe(16);

    // Check if the container has correct padding
    // Assuming paddingNmargin.standard is a known value in your test environment
    const containerStyle = getByText("SETTINGS").parent.props.style;
    expect(containerStyle.padding).toBe(paddingNmargin.standard);
  });

  test("capitalizeWord function is called with correct arguments", () => {
    render(<SettingsItem icon="home" name="settings" />);

    expect(capitalizeWord).toHaveBeenCalledWith("settings");
  });
});
