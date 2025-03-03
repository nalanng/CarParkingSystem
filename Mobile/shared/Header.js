import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from './BackButton';
import { theme } from '../src/theme/theme';

const Header = ({ goBack, title }) => {
    return (
      <View style={styles.header}>
        {goBack && <BackButton goBack={goBack} />}
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    paddingTop: 66,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    flex: 1, 
  },
});

export default Header;
