import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { theme } from '../../../theme/theme';
import Header from '../../../../shared/Header';
import useParkRecords from '../hooks/useParkRecords';

const ParkingHistoriesScreen = ({ navigation }) => {
  
  const {parkRecords, loading, error } = useParkRecords();

  if (loading) {
    return (
      <View style={styles.container}>
      <Header goBack={navigation.goBack} title={"Parking Histories"} />
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
    );
  }  

  const getStatusLabel = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Active';
      case 2:
        return 'Completed';
      case 3:
        return 'Pending Payment';
      default:
        return 'Unknown';
    }
  };
  
  const renderItem = ({ item }) => {

    const startTime = new Date(item.startTime).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const endTime = item.endTime
      ? new Date(item.endTime).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'Still Parked';

    return (
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptTitle}>🧾 Parking Receipt</Text>
        <Text style={styles.receiptText}>Start: {startTime}</Text>
        <Text style={styles.receiptText}>End: {endTime}</Text>
        <Text style={styles.receiptText}>Fee: {item.statusId === 1 ? '--' : `${item.fee}₺`}</Text>
        <Text style={styles.receiptText}>Status: {getStatusLabel(item.statusId)}</Text>
        </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack} title={"Parking Histories"} />
      <Text style={styles.infoText}>
       Parking fee is 100₺ per hour. Total fee is calculated based on parking duration.
      </Text>
      <FlatList
        data={parkRecords}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No parking history.</Text>
      }
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.gray,
    textAlign: 'center',
    marginTop: 50
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: theme.colors.gray,
  },
  receiptContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.primary,
  },
  receiptText: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: 12,
    marginHorizontal: 16,
  },
  
});

export default ParkingHistoriesScreen;
