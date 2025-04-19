import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../../theme/theme"; 
import { emailValidator } from "../../../helpers/emailValidator";
import { passwordValidator } from "../../../helpers/passwordValidator";
import HeaderText from "../../../../shared/HeaderText";
import Background from "../../../../shared/Background"; 
import LoginLogo from "../components/LoginLogo";
import Button from "../../../../shared/Button"; 
import TextInput from "../../../../shared/TextInput"; 
import useAuth from "../hooks/useAuth";  
import BackButton from "../../../../shared/BackButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { data, succeeded, errors, loading, fetchAuth } = useAuth();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    fetchAuth(email.value, password.value);
  };

  useEffect(() => {
    if (succeeded) {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }
  }, [succeeded, data, navigation]);

  return (
    <Background>
      <BackButton goBack={() => navigation.reset({
          index: 0, 
          routes: [{ name: 'StartScreen' }], 
          })} />
      <LoginLogo />
      <HeaderText>Hello</HeaderText>
      
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={onLoginPressed} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : "Log in"}
      </Button>

      {/* Show error message if login failed */}
      {errors && <Text style={{ color: "red", marginTop: 10 }}>{errors}</Text>}
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default LoginScreen;
