import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../theme/theme";
import QRScannerScreen from "../../qrScanner/screens/QRScannerScreen";
import ProfileScreen from "../../profile/screens/ProfileScreen";
import ParkingHistoriesScreen from "../../parkingHistories/screens/ParkingHistoriesScreen";
import useParkAreas from '../hooks/useParkAreas'
import { ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();

function CustomHomeScreen() {
  const { parkingSpots, loading, error, refetch } = useParkAreas();

  const getParkingIcon = (status) => {
    if (status === 1) {
      return <FontAwesome5 name="car" size={70} color="red" />;
    }
    return <FontAwesome5 name="car-side" size={70} color="gray" />;
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
            <TouchableOpacity key={spot.id} style={styles.parkingBox}>
              {getParkingIcon(spot.status)}
              <Text style={styles.statusText}>
                {spot.status === 0 ? "Empty" : "Full"}
              </Text>
              <Text>{spot.location}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
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
          else if (route.name === "QR Scanner") iconName = "camera";
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
      <Tab.Screen name="QR Scanner" component={QRScannerScreen} />
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
  carImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
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
});
