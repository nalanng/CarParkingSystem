import React from "react";

import Background from "../../../../shared/Background";
import StartLogo from "../components/StartLogo";
import HeaderText from "../../../../shared/HeaderText";
import Button from "../../../../shared/Button";
import Paragraph from "../../../../shared/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <StartLogo />
      <HeaderText>Welcome to Car Parking App</HeaderText>
      <Paragraph>
      Effortlessly find and manage your parking spot with real-time availability updates. Log in to access your parking history, receive notifications, and make seamless payments.      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Log in
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign up
      </Button>
    </Background>
  );
}
