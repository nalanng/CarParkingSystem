import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme/theme';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../../../shared/Button';
import { newPasswordValidator, confirmPasswordValidator } from '../../profile/services/PasswordServices'; 
import TextInput from '../../../../shared/TextInput';
import NotificationModal from '../../../../shared/NotificationModal';
import useResetPassword from '../hooks/useResetPassword';

const ResetPasswordScreen = ({ navigation }) => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
    const [token, setToken] = useState("");
    const [isButtonDisable, setIsButtonDisabled] = useState(true);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
  
    const route = useRoute();
    const { emailAddress, isAuthorize } = route.params || {}; 
    
    const { message, succeeded, errors, loading, fetchResetPassword } = useResetPassword();
    
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
        token.trim() !== "" &&
        newPassword.value.trim() !== "" &&
        confirmPassword.value.trim() !== "" &&
        !newPassword.error &&
        !confirmPassword.error;
    
      setIsButtonDisabled(loading || !isFormValid);
    }, [token, newPassword, confirmPassword, loading]);
  
    const onResetPassword = async () => {
        try {
            const result = await fetchResetPassword(emailAddress, token, newPassword.value, confirmPassword.value);
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
        if(isAuthorize) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 1,
                routes: [{ name: "LoginScreen" }],
            });
        }
        setSuccessModalVisible(false);
    };
    
    const onErrorPress = () => {
      setErrorModalVisible(false);
    };
  
    return (
      <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color={theme.colors.black} />
              </TouchableOpacity>
              <Text style={styles.title}>Reset Password</Text>
            </View>
            <Text style={styles.infoText}>Your password must be at least 8 characters and should include a combination of numbers, letters, and special characters (!$@%)</Text>
            <View style={styles.inputContainer}>
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
            <View style={styles.inputContainer}>
              <TextInput
                label="Code"
                returnKeyType="done"
                value={token}
                onChangeText={(text) => setToken(text)}
                placeholder="Code"
                placeholderTextColor={theme.colors.gray}
              />
            </View>
          </View>
  
          <View>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={onResetPassword} disabled={isButtonDisable}>
                {loading ? <ActivityIndicator size="small" color={theme.colors.white} /> : "Reset Password"}
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
            message="Password has not been resetted."
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

export default ResetPasswordScreen;
