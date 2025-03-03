import React from "react";
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { theme } from "../src/theme/theme";

const NotificationModal = ({ 
  visible, 
  title, 
  message, 
  icon = "alert-circle", 
  iconColor = theme.colors.warning, 
  isDisabled = false, 
  onPressed, 
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name={icon} size={50} color={iconColor} />
              </View>
              <Text style={[styles.title, { color: iconColor }]}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <Button mode="contained" onPress={onPressed} disabled={isDisabled} style={styles.button}>
                Okay
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 320,
    padding: 15,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    borderRadius: 15,
  },
});

export default React.memo(NotificationModal);
