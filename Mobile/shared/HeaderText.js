import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { theme } from "../src/theme/theme"; 

export default function HeaderText(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
