import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamsList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
