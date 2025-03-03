import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme/theme';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../../../shared/Button';
import { confirmPasswordValidator, newPasswordValidator } from '../services/PasswordServices';
import TextInput from '../../../../shared/TextInput';
import useUpdatePassword from '../hooks/useUpdatePassword';
import NotificationModal from '../../../../shared/NotificationModal';
import { useForgotPassword } from '../../login/hooks/useForgotPassword';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
  const [isButtonDisable, setIsButtonDisabled] = useState(true);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isAuthorize = true;

  const route = useRoute();
  const { userInfo } = route.params || {}; 

  const { message, succeeded, loading, fetchUpdatePassword } = useUpdatePassword();
  const { fetchForgotPassword, success } = useForgotPassword();

  useEffect(() => {
    const passwordError = newPasswordValidator(newPassword.value);
    
    if (passwordError && newPassword.value.length > 0) {
      setNewPassword((prevState) => {
        const updatedState = { ...prevState, error: passwordError };
        return updatedState;
      });
    }
  }, [newPassword.value]);

  useEffect(() => {
    const passwordError = confirmPasswordValidator(newPassword.value, confirmPassword.value);
    
    if (passwordError && confirmPassword.value.length > 0) {
      setConfirmPassword((prevState) => {
        const updatedState = { ...prevState, error: passwordError };
        return updatedState;
      });
    }
  }, [newPassword.value, confirmPassword.value]);

  useEffect(() => {
    const isFormValid =
      currentPassword.value.trim() !== "" &&
      newPassword.value.trim() !== "" &&
      confirmPassword.value.trim() !== "" &&
      !currentPassword.error &&
      !newPassword.error &&
      !confirmPassword.error;
  
    setIsButtonDisabled(loading || !isFormValid);
  }, [currentPassword, newPassword, confirmPassword, loading]);
  
  useEffect(() => {
    if (succeeded) {
      setTimeout(() => {
        navigation.navigate.goBack;
      }, 2000);
    }
  }, [succeeded]);

  const onChangePassword = async () => {
    try {
      const result = await fetchUpdatePassword(currentPassword.value, newPassword.value, confirmPassword.value);
      if (result.success) {
        setSuccessModalVisible(true);
      } else {
        setErrorModalVisible(true);

      }
    } catch (error) {
      console.error('Password update failed', error);
    }
  };
  
  const onSucceedPress = () => {
    navigation.goBack();
    setSuccessModalVisible(false);
  };
  
  const onErrorPress = () => {
    setErrorModalVisible(false);
  };

  const sendResetPasswordEmail = async () => {
    setIsClicked(true);
    await fetchForgotPassword(userInfo.email);
  };

  useEffect(() => {
    if (success) {
      setIsClicked(false)

      const emailAddress = userInfo.email;

      Alert.alert(
        "Success", 
        "A reset code has been sent to your email.", 
        [ { 
          text: "OK", 
          onPress: () => navigation.navigate("ResetPasswordScreen", { emailAddress, isAuthorize }) 
        }]
      );
    }
  }, [success]);

  return (
    <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color={theme.colors.black} />
            </TouchableOpacity>
            <Text style={styles.title}>Change Password</Text>
          </View>
          <Text style={styles.infoText}>Your password must be at least 8 characters and should include a combination of numbers, letters, and special characters (!$@%)</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              label="Current Password"
              returnKeyType="done"
              value={currentPassword.value}
              onChangeText={(text) => setCurrentPassword({ value: text, error: "" })}
              error={!!currentPassword.error}
              errorText={currentPassword.error}
              placeholder="Current Password"
              placeholderTextColor={theme.colors.gray}
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.toggleVisibilityButton}>
              <Ionicons name={showCurrentPassword ? 'eye' : 'eye-off'} size={24} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer,               
            !!currentPassword.error && { marginTop: 20 }]}>
            <TextInput
              label="New Password"
              returnKeyType="done"
              value={newPassword.value}
              onChangeText={(text) => setNewPassword({ value: text, error: "" })}
              error={!!newPassword.error}
              errorText={newPassword.error}
              placeholder="New Password"
              placeholderTextColor={theme.colors.gray}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.toggleVisibilityButton}>
              <Ionicons name={showNewPassword ? 'eye' : 'eye-off'} size={24} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.inputContainer,
              !!newPassword.error && { marginTop: 30 },
              !!confirmPassword.error && { marginBottom: 30 }
            ]}>
            <TextInput 
              label="Confirm Password"
              returnKeyType="done"
              value={confirmPassword.value}
              onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
              error={!!confirmPassword.error}
              errorText={confirmPassword.error}
              placeholder="Confirm Password"
              placeholderTextColor={theme.colors.gray}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.toggleVisibilityButton}>
              <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={sendResetPasswordEmail}  disabled={isClicked}>
              <Text style={styles.forgot}>Forgotten your password?</Text>
            </TouchableOpacity>
          </View>
          {succeeded && <Text style={styles.successMessage}>{message}</Text>}
        </View>

        <View>
          <View style={styles.divider} />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={onChangePassword} disabled={isButtonDisable}>
              {loading ? <ActivityIndicator size="small" color={theme.colors.white} /> : "Change Password"}
            </Button>
          </View>
        </View>

        <NotificationModal
          visible={successModalVisible}
          title="Success"
          icon='checkmark-circle'
          iconColor= {theme.colors.succeed}
          message={message}
          onPressed={() => onSucceedPress()}
        />

        <NotificationModal
          visible={errorModalVisible}
          title="Error"
          icon='close-circle'
          iconColor= {theme.colors.error}
          message={message}
          onPressed={() => onErrorPress()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1, 
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  infoText: {
    marginBottom: 20,
    fontSize: 16
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    height: 70
  },
  toggleVisibilityButton: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -10 }],
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  forgot: {
    color: theme.colors.primary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#ccc',
    marginBottom: 100
  },
});


export default ChangePasswordScreen;