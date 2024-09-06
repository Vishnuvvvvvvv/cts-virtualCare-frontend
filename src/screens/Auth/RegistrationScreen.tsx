import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { stackScreens } from '../../Navigation/RootNavigation'



type propsType = NativeStackScreenProps<stackScreens ,"Register">




const RegistrationScreen = (props:propsType) => {


    const {navigation} = props;



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  
  const handleSignUp = async () => {
    console.log("register clciked")
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('Response:', data); 
      if (response.ok) {
        // Handle successful login
        // For example, navigate to the HomeTabs screen
        navigation.navigate('TabNavigation');
      } else {
        // Handle login error
        console.error('Login failed', data);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };




//   const handleNavigateToLogin = () => {
//     navigation.navigate('login');
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Registration</Text>
       {/*Input for new username*/}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/** input for email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />


      {/**input for password field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/*Button for registering new user*/}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
     
      {/**button for Allready have an account , when clicked takes to login page */}
      <TouchableOpacity
        style={styles.link}
        onPress={()=>{navigation.navigate('login');}}
      >
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#007BFF',
  },
});
