import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../../theme/theme'; 
import { Ionicons } from '@expo/vector-icons';

const ProfileInfo = ({userInfo}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Info</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Ionicons name="person" size={16} color={theme.colors.black} />
          <View style={styles.infoText}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.listText}>{userInfo.firstName} {userInfo.lastName}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Ionicons name="mail" size={16} color={theme.colors.black} />
          <View style={styles.infoText}>
            <Text style={styles.label}>Email</Text>
            <View style={{flexDirection: "row"}}>
            <Text style={[styles.listText, {marginEnd:10}]}>{userInfo.email}</Text>
            {userInfo?.emailConfirmed && (
                <Ionicons name="checkmark-done" size={16} color={theme.colors.succeed}/> 
            )}  
            </View>    
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Ionicons name="call" size={16} color={theme.colors.black} />
          <View style={styles.infoText}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.listText}>{userInfo.phoneNumber}</Text>
          </View>
        </View>
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
    justifyContent: 'start',
    alignItems: "center",
    paddingVertical: 5,
    paddingInline: 20,
  },
  infoText: {
    flexDirection:"column",
    marginInlineStart:10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.gray,
    marginBottom: 5
  },
  listText: {
    fontSize: 16,
    color: theme.colors.black,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
});

export default ProfileInfo;
