import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme/theme';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../../../shared/Button';
import PhoneInput from 'react-native-international-phone-number';
import useSetPhoneNumber from '../hooks/useSetPhoneNumber';
import NotificationModal from '../../../../shared/NotificationModal';

const ChangePhoneScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false); 
  const [isButtonDisable, setIsButtonDisabled] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const { message, loading, fetchSetPhoneNumber } = useSetPhoneNumber();

  const route = useRoute();
  const { userInfo } = route.params || {}; 

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedCountry && phoneNumber) {
      const code = selectedCountry.callingCode;
      const number = `${code}${phoneNumber.replace(/\s+/g, '')}`;  
      setFormattedPhoneNumber(number);
    }

    const isFormValid = phoneNumber.trim() !== "";
    setIsButtonDisabled(!isFormValid);
  }, [phoneNumber, selectedCountry]);

  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  const onPressButton = async () => {
    console.log(formattedPhoneNumber)
    const result = await fetchSetPhoneNumber(formattedPhoneNumber);
      if (result.success) {
        setSuccessModalVisible(true);
      }
  };

  const onSucceedPress = () => {
    navigation.goBack();
    setSuccessModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color={theme.colors.black} />
            </TouchableOpacity>
            <Text style={styles.title}>{userInfo?.phoneNumber ? "Change phone number" : "Set phone number"}</Text>
          </View>
          <Text style={styles.infoText}>Enter your new phone number</Text>
          <PhoneInput 
            phoneInputStyles={{
              container: {
                borderWidth: 1,
                borderColor: theme.colors.gray,
                borderRadius: 20,
                overflow: 'hidden',
                marginBottom: 10,
                width: "100%"
            }}}
            defaultCountry='TR'
            value={phoneNumber}
            onChangePhoneNumber={handleInputValue}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
              />
        </View>

        <View style={[keyboardVisible && styles.footerWithKeyboard]}>
          <View style={styles.divider} />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={onPressButton} disabled={isButtonDisable}>
              {loading ? (
                <ActivityIndicator size="small" color={theme.colors.white} />
              ) : (
                userInfo?.phoneNumber ? `Change phone number` : `Set phone number`
              )}
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
      </View>
    </TouchableWithoutFeedback>
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
  footerWithKeyboard: {
    marginBottom: 275
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

export default ChangePhoneScreen;
