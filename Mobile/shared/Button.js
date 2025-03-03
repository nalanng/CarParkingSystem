import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

import { theme } from "../src/theme/theme"; 

export default function Button({ mode, style, disabled, ...props }) {
  const getBackgroundColor = () => {
    if (disabled) {
      return mode === "contained"
        ? theme.colors.primary + "99"
        : theme.colors.surface + "99";
    }
    return mode === "contained" ? theme.colors.primary : theme.colors.surface;
  };

  return (
    <PaperButton
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      labelStyle={[styles.text, disabled]}
      mode={mode}
      disabled={disabled}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  }
});
