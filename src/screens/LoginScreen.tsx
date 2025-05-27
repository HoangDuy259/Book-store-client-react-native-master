import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigation';
import {AuthContext} from '../context/AuthContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);
  const handleLogin = async () => {
    if (username && password) {
      const result = await signIn(username, password);
      console.log('Login result:', result);
      if (result) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Login failed',
          'Please check your credentials and try again.',
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log In</Text>
      <TextInput
        placeholder="username"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>You don't have an account? Sign Up.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 6,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#056edd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#056edd',
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
