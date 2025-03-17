import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { theme } from '../../../theme/theme';
import Header from '../../../../shared/Header';

const ParkingHistoriesScreen = ({ navigation }) => {

  if (true) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const handlePress = (notification) => {
    //navigation.navigate('NotificationDetailScreen', { notification });
  };

  const renderItem = ({ item }) => (
    console.log()
  );

  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack} title={"Parking Histories"} />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
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
});

export default ParkingHistoriesScreen;
