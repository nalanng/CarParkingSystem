import {React, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme/theme';
import Header from '../../../../shared/Header';
import ProfileInfo from '../components/profileInfo/ProfileInfo';
import ProfileSettings from '../components/profileSettings/ProfileSettings';
import useCurrentUser from '../hooks/useCurrentUser';

const ProfileScreen = ({ navigation }) => {

  const { userInfo, refetch } = useCurrentUser(); 
  
    useFocusEffect(
      useCallback(() => {
        refetch();
      }, [refetch])
    );

  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack} title={'Profile'} />
      <ProfileInfo userInfo={userInfo} />
      <ProfileSettings userInfo={userInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#ccc',
  },
  listContainer: {
    margin: 20,
    borderColor: theme.colors.gray,
    borderWidth: 2,
    borderRadius: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  listText: {
    fontSize: 16,
  }
});

export default ProfileScreen;
