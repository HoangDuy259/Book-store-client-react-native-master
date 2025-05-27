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

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'SignUp'
>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const {signUp} = useContext(AuthContext);

  const handleSignUp = async () => {
    if (email && password) {
      const success = await signUp(
        userName,
        email,
        firstName,
        lastName,
        password,
      );
      if (success) {
        Alert.alert('Success', 'Account created successfully!, Please log in.');
        navigation.navigate('Login');
      } else {
        Alert.alert(
          'Sign up failed',
          'Please try again with a diferent email.',
        );
      }
      console.log('Sign up success:', success);
    } else {
      Alert.alert('Sign up failed', 'Please enter both email and password.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        placeholder="userName"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="First Name"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Alreay have an account? Log In </Text>
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

export default SignUpScreen;
