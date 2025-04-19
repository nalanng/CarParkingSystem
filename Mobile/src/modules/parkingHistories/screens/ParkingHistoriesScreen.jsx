import {React, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { theme } from '../../../theme/theme';
import Header from '../../../../shared/Header';
import useParkRecords from '../hooks/useParkRecords';
import useUpdateRecordStatus from '../hooks/useUpdateRecordStatus';

const ParkingHistoriesScreen = ({ navigation }) => {
  
  const { parkRecords, loading, error, refetch } = useParkRecords();
  const { fetchUpdateRecordStatus } = useUpdateRecordStatus();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
        return 'Paid';
      case 3:
        return 'Pending Payment';
      default:
        return 'Unknown';
    }
  };
  
  const renderItem = ({ item }) => {
    const startTime = new Date(item.startTime).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  
    const endTime = item.endTime
      ? new Date(item.endTime).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Still Parked';
      
      const handlePayment = async () => {
        setPaymentModalVisible(true);
        setIsProcessingPayment(true);
        
        await fetchUpdateRecordStatus(item.id, 2);
      
        setTimeout(() => {
          setIsProcessingPayment(false);
          setPaymentModalVisible(false);
          refetch();
        }, 2500);
      };      
      
    return (
      <View style={styles.rowContainer}>
        <View style={styles.receiptContainer}>
          <Text style={styles.receiptTitle}>🧾 Parking Receipt</Text>
          <Text style={styles.receiptText}>Start: {startTime}</Text>
          <Text style={styles.receiptText}>End: {endTime}</Text>
          <Text style={styles.receiptText}>Fee: {item.statusId === 1 ? '--' : `${item.fee}₺`}</Text>
          <Text style={styles.receiptText}>Status: {getStatusLabel(item.statusId)}</Text>
        </View>

        {item.statusId === 3 && (
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.paymentButtonText}>Pay</Text>
          </TouchableOpacity>
        )}

        <Modal
          visible={paymentModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setPaymentModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {isProcessingPayment ? (
                <>
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                  <Text style={styles.modalText}>Processing payment...</Text>
                </>
              ) : (
                <Text style={styles.modalText}>Payment completed!</Text>
              )}
            </View>
          </View>
        </Modal>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack} title={"Parking Histories"} />
      <Text style={styles.infoText}>
        Parking fee starts from 50₺. Additional 100₺ per hour. Total fee is calculated based on parking duration.
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
  
  paymentButton: {
    position: 'absolute',
    right: 30,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  
  paymentButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },  
});

export default ParkingHistoriesScreen;
