import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatDate } from '../../../utils/DateFormatter';
import { theme } from '../../../theme/theme';

const NotificationCardComponent = ({ notification, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(notification)} style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <Text style={styles.title}>{notification.topic}</Text>
        {notification.importanceDegree === 1 && (
          <FontAwesome name="exclamation-circle" size={18} color="#f44336" style={styles.exclamationIcon} />
        )}
      </View>
      <Text style={styles.description} numberOfLines={1}>
        {notification.description}
      </Text>
      <Text style={styles.date}>{formatDate(notification.created)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationCard: {
    backgroundColor: theme.colors.background,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    flex: 1,
  },
  exclamationIcon: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: theme.colors.gray,
  },
});

export default NotificationCardComponent;
