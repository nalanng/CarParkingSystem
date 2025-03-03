import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../../theme/theme'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import StorageService from '../../../../services/StorageService';

const ProfileSettings = ({userInfo}) => {
    const navigation = useNavigation();
  
    const onPressLogout = async () => {
      try {
        await StorageService.deleteItem('userToken');
        navigation.reset({
          index: 0, 
          routes: [{ name: 'LoginScreen' }],
        });      
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("ChangePasswordScreen", {userInfo})}>
          <View style={{flexDirection:'row'}}>
            <Ionicons name="key-sharp" size={16} color={theme.colors.black} />
            <Text style={styles.listText}>Change password</Text>
          </View>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("ChangePhoneScreen", {userInfo})}>
          <View style={{flexDirection:'row'}}>
            <Ionicons name="call" size={16} color={theme.colors.black} />
            <Text style={styles.listText}>{userInfo?.phoneNumber ? "Change phone number" : "Set phone number"}
            </Text>
          </View>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("ConfirmEmailScreen", {userInfo})}>
          <View style={{flexDirection:'row'}}>
            <Ionicons name="mail" size={16} color={theme.colors.black} />
            <Text style={styles.listText}>{"Confirm Email"}</Text>
          </View>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.listItem} onPress={onPressLogout}>
          <View style={{flexDirection:'row'}}>
            <Ionicons name="log-out-outline" size={16} color={theme.colors.red} />
            <Text style={[styles.listText, {color: theme.colors.red}]}>{"Log out"}</Text>
          </View>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingInline: 20,
  },
  listText: {
    fontSize: 16,
    marginInlineStart: 10
  },
  divider: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
  arrow: {
    fontSize: 16,
    color: theme.colors.primary,
  },
});

export default ProfileSettings;
