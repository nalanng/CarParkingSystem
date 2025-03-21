import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../theme/theme";
import ProfileScreen from "../../profile/screens/ProfileScreen";
import ParkingHistoriesScreen from "../../parkingHistories/screens/ParkingHistoriesScreen";
import useParkAreas from '../hooks/useParkAreas'
import useCreateParkRecord from "../hooks/useCreateParkRecord";

const Tab = createBottomTabNavigator();

function CustomHomeScreen() {
  const { parkingSpots, loading, error } = useParkAreas();
  const { data, succeeded, errors, recordLoading, fetchCreateParkRecord } = useCreateParkRecord();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const getParkingIcon = (status) => {
    if (status === 1) {
      return <FontAwesome5 name="car" size={70} color="red" />;
    } else if (status === 0) {
      return <FontAwesome5 name="car-side" size={70} color="gray" />;
    }
    return <FontAwesome5 name="car-side" size={70} color="orange" />;
  };

  const handlePress = (spot) => {
    if (spot.status === 2) {
      setSelectedSpot(spot);
      setModalVisible(true);
    }
  };

  const handleConfirm = async () => {
    if (selectedSpot) {
      await fetchCreateParkRecord(selectedSpot.id);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Car Parking</Text>
      </View>

      <View style={styles.screenContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : error ? (
          <Text style={{ color: "red" }}>Error loading parking spots</Text>
        ) : (
          <View style={styles.parkingContainer}>
            {parkingSpots.map((spot) => (
              <TouchableOpacity
                key={spot.id}
                style={styles.parkingBox}
                disabled={spot.status !== 2} // Eğer status 2 değilse tıklanamaz
                onPress={() => handlePress(spot)}
              >
                {getParkingIcon(spot.status)}
                <Text style={styles.statusText}>
                  {spot.status === 0 ? "Empty" : spot.status === 1 ? "Full" : "Waiting"}
                </Text>
                <Text>{spot.location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
            Do you want to claim this parking spot as your own? The fee will be charged to you. Do you accept?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Yes" onPress={handleConfirm} />
              <Button title="No" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Parking History") iconName = "file-alt";
          else if (route.name === "Profile") iconName = "user-circle";

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={CustomHomeScreen} />
      <Tab.Screen name="Parking History" component={ParkingHistoriesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    paddingTop: 60,
    paddingBottom: 20, 
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  parkingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  parkingBox: {
    width: 240,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  statusText: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
    color: theme.colors.primary,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

