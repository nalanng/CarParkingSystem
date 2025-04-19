import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../../../shared/Background';
import Button from '../../../../shared/Button';

const EmailConfirmationInfoScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.header}>Registration Successful </Text>
        <Text style={styles.text}>
          To continue, please confirm your email address by clicking the link sent to your inbox.
        </Text>
        <Text style={styles.subText}>
          If you can't find the email, please check your spam or junk folder.
        </Text>

        <Button mode="outlined" onPress={() => navigation.reset({
          index: 0, 
          routes: [{ name: 'LoginScreen' }], 
          })}>
          Back to Login
        </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default EmailConfirmationInfoScreen;
