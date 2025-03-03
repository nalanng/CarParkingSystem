import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme/theme';

export default function ResetPasswordLogo() {
  return (
    <FontAwesome
      name="lock" 
      size={75}
      color={theme.colors.primary}
      style={styles.icon}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 20,
  },
});