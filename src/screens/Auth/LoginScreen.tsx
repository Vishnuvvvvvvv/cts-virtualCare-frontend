import { StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native'
import React ,{useState} from 'react'
import { stackScreens } from '../../Navigation/RootNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

//login screen 


type propsType = NativeStackScreenProps<stackScreens ,"login">

const LoginScreen = (props:propsType) => {
    const {navigation} = props;


    //username and password 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');




    const LoginHandler = async ()=>{
      
      console.log("login clciked",username,": ",password)
      
      {/*currently assume username is admin & pass : password for logging in*/}
      if(username==="admin"&&password=="password"){
        navigation.navigate('TabNavigation');
        return;
      }


      //original code for verifying username and password with backend

      try {
        //provide the backend endpoint for validation here
        const response = await fetch('http://192.168.1.7:3000/login', {
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
          // For example, navigate to the TabNavigation screen
          navigation.navigate('TabNavigation');
        } else {
          // Handle login error
          console.error('Login failed', data);
        }
      } catch (error) {
        console.error('Error during login', error);
      }

       
    }

  return (
    <View style={styles.container}>
    {/* //<Text>LoginScreen</Text> */}

    <TextInput
      style={styles.input}
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
    />


    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />




    <TouchableOpacity style={styles.button} onPress={LoginHandler}>
      <Text style={styles.buttonText} >
          Login 
      </Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={()=>{navigation.navigate("Register")}}>
      <Text >
          New User? Register Now
      </Text>
    </TouchableOpacity>

    

  </View>
  )


}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
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
      backgroundColor: '#007BFF',
      
      padding: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText :{
      color: '#fff',
    }
})