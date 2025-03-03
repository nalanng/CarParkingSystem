import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../theme/theme";
import NotificationsScreen from "../../notifications/screens/NotificationsScreen";
import ProfileScreen from "../../profile/screens/ProfileScreen";
import ParkingHistoriesScreen from "../../parkingHistories/screens/ParkingHistoriesScreen";

const Tab = createBottomTabNavigator();

function CustomHomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Car Parking
      </Text>
    </View>

    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Home Screen</Text>
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
          else if (route.name === "Notifications") iconName = "bell";
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
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
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
  screenText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
