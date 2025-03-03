import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../../theme/theme';

export default function LoginLogo() {
  return (
    <FontAwesome
      name="user" 
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