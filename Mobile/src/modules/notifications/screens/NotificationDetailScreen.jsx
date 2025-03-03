import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../../theme/theme';
import { formatDate } from '../../../utils/DateFormatter';
import Header from '../../../../shared/Header';

const NotificationDetailScreen = ({ navigation, route }) => {
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack} title={"Notification Detail"} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{notification.topic}</Text>
        
        {/* Importance Badge */}
        {notification.importanceDegree === 1 && (
          <View style={styles.importanceBadge}>
            <FontAwesome name="exclamation-circle" size={14} color="#fff" style={styles.importanceIcon} />
            <Text style={styles.importanceText}>High Importance</Text>
          </View>
        )}

        <View style={styles.dateContainer}>
          <FontAwesome name="clock-o" size={24} color={theme.colors.primary} style={styles.icon} />
          <Text style={styles.date}>{formatDate(notification.created)}</Text>
        </View>
        
        <Text style={styles.description}>{notification.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    left: 10,
  },
  icon: {
    marginRight: 8,
  },
  date: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  
  importanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.highImportance, 
    paddingVertical: 4,
    paddingHorizontal: 10, 
    borderRadius: 20,
    marginBottom: 12,
    maxWidth: '40%', 
  },
  importanceIcon: {
    marginRight: 6, 
  },
  importanceText: {
    fontSize: 12, 
    color: theme.colors.white,
    fontWeight: 'bold',
  },
});

export default NotificationDetailScreen;
