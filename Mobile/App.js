import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "./src/theme/theme"
import { 
  LoginScreen, 
  StartScreen, 
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen, 
  NotificationsScreen, 
  NotificationDetailScreen, 
  ProfileScreen,
  ChangePasswordScreen,
  ChangePhoneScreen,
  ConfirmEmailScreen,
  ForgotPasswordScreen,
  ParkingHistoriesScreen,
} from "./src/modules";
const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen 
            name="ResetPasswordScreen" 
            component={ResetPasswordScreen}
            options={{ 
              presentation: 'modal', 
              animationTypeForReplace: 'pop',
              cardStyle: { marginTop: 20, borderRadius: 20, overflow: 'hidden' }
            }} 
         />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
          <Stack.Screen name="NotificationDetailScreen" component={NotificationDetailScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ParkingHistoriesScreen" component={ParkingHistoriesScreen} />
          <Stack.Screen 
            name="ChangePasswordScreen" 
            component={ChangePasswordScreen} 
            options={{ 
              presentation: 'modal', 
              animationTypeForReplace: 'pop',
              cardStyle: { marginTop: 20, borderRadius: 20, overflow: 'hidden' }
            }} 
          />
          <Stack.Screen 
            name="ChangePhoneScreen" 
            component={ChangePhoneScreen} 
            options={{ 
              presentation: 'modal', 
              animationTypeForReplace: 'pop',
              cardStyle: { marginTop: 20, borderRadius: 20, overflow: 'hidden' }
            }} 
          />
          <Stack.Screen 
            name="ConfirmEmailScreen" 
            component={ConfirmEmailScreen} 
            options={{ 
              presentation: 'modal', 
              animationTypeForReplace: 'pop',
              cardStyle: { marginTop: 20, borderRadius: 20, overflow: 'hidden' }
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}