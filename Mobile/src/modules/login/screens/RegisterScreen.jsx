import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { emailValidator } from "../../../helpers/emailValidator";
import { passwordValidator } from "../../../helpers/passwordValidator";
import HeaderText from "../../../../shared/HeaderText";
import Background from "../../../../shared/Background"; 
import Button from "../../../../shared/Button"; 
import TextInput from "../../../../shared/TextInput"; 
import useRegister from "../hooks/useRegister";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [surname, setSurname] = useState({ value: "", error: "" });
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });

  const { data, succeeded, errors, loading, fetchRegister } = useRegister();

  //register olduğunda confirm maili gönder!

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const cPasswordError = passwordValidator(confirmPassword.value);
    const emptyError = "Please fill in this field.";

    let hasError = false;

    if (emailError || passwordError || cPasswordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...cPasswordError, error: cPasswordError })
      hasError = true;
    }

    if (name.value === "") {
      setName({ ...name, error: emptyError });
      hasError = true;
    }
    if (surname.value === "") {
      setSurname({ ...surname, error: emptyError });
      hasError = true;
    }
    if (userName.value === "") {
      setUserName({ ...userName, error: emptyError });
      hasError = true;
    }

    if (hasError) return; 

    fetchRegister(
      name.value, 
      surname.value,
      email.value, 
      userName.value, 
      password.value, 
      confirmPassword.value);
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
      <HeaderText>Sign Up</HeaderText>
      <Text>Sign up to continue</Text>
      
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
        style={{marginTop:30}}
      />
      
      <TextInput
        label="Surname"
        returnKeyType="next"
        value={surname.value}
        onChangeText={(text) => setSurname({ value: text, error: "" })}
        error={!!surname.error}
        errorText={surname.error}
      />
      
      <TextInput
        label="UserName"
        returnKeyType="next"
        value={userName.value}
        onChangeText={(text) => setUserName({ value: text, error: "" })}
        error={!!userName.error}
        errorText={userName.error}
      />

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

      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onSignUpPressed} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : "Sign Up"}
      </Button>

      {/* Show error message if login failed */}
      {errors && <Text style={{ color: "red", marginTop: 10 }}>{errors}</Text>}
    </Background>
  );
};

export default RegisterScreen;
