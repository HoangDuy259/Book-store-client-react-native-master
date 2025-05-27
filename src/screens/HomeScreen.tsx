import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const token = useContext(AuthContext).token;
  console.log('Token in HomeScreen:', token);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
