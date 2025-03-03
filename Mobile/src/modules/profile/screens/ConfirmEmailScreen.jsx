import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme/theme';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../../../shared/Button';
import NotificationModal from '../../../../shared/NotificationModal';
import useConfirmEmail from '../hooks/useConfirmEmail';

const ConfirmEmailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo } = route.params || {}; 
  
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const { message, loading, fetchConfirmEmail } = useConfirmEmail();

  const onConfirmEmail = async () => {
    const result = await fetchConfirmEmail();
    if (result.success) {
      setSuccessModalVisible(true);
    } else {
    }
  };
  
  const onSucceedPress = () => {
    navigation.goBack();
    setSuccessModalVisible(false);
  };

  return (
    <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color={theme.colors.black} />
            </TouchableOpacity>
            <Text style={styles.title}>Confirm Email</Text>
          </View>

        <View style={styles.item}>
          <View style={styles.infoText}>
            <Text style={styles.text}>{userInfo.email}</Text>
          </View>
            {userInfo?.emailConfirmed && (
                <Ionicons name="checkmark-done" size={16} color={theme.colors.succeed} /> )}       
         </View>

         {userInfo?.emailConfirmed && (
            <Text style={{marginTop: 10}} >{"Your email has already been confirmed."}</Text>
         )}
        </View>

        <View>
          <View style={styles.divider} />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={onConfirmEmail} disabled={userInfo.emailConfirmed || loading}>
              {loading ? <ActivityIndicator size="small" color={theme.colors.white} /> : "Confirm Email"}
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
  item: {
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: "center",
    paddingVertical: 15,
    paddingInline: 20,
  },
  infoText: {
    flexDirection:"column",
    marginInlineEnd:10,
  },
  text: {
    fontSize: 16,
    color: theme.colors.black,
  },
});


export default ConfirmEmailScreen;