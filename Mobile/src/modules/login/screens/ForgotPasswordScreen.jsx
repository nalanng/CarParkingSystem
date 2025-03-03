import React, { useEffect, useState } from "react";
import { emailValidator } from "../../../helpers/emailValidator";
import Background from "../../../../shared/Background"; 
import HeaderText from "../../../../shared/HeaderText"; 
import Button from "../../../../shared/Button"; 
import TextInput from "../../../../shared/TextInput"; 
import BackButton from "../../../../shared/BackButton"; 
import ResetPasswordLogo from "../components/ResetPasswordLogo";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  
  const { fetchForgotPassword, loading, error, success } = useForgotPassword();

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    await fetchForgotPassword(email.value);
  };

  useEffect(() => {
    if (success) {

      const emailAddress = email.value;

      Alert.alert(
        "Success", 
        "A reset code has been sent to your email.", 
        [ { 
          text: "OK", 
          onPress: () => navigation.navigate("ResetPasswordScreen", { emailAddress }) 
        }]
      );
    }
  }, [success]);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <ResetPasswordLogo />
      <HeaderText>Reset your password.</HeaderText>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with the reset code."
      />

      <Button mode="contained" onPress={sendResetPasswordEmail} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : "Continue"}
      </Button>
      
      {error && <HeaderText style={{ color: "red" }}>{error}</HeaderText>}
    </Background>
  );
};

export default ForgotPasswordScreen;
