import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { stackScreens } from '../../Navigation/RootNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

//login screen 


type propsType = NativeStackScreenProps<stackScreens ,"login">

const LoginScreen = (props:propsType) => {

    const {navigation} = props;

    const LoginHandler =()=>{
   
    

        navigation.navigate('TabNavigation');
    }

  return (
    <View style={styles.container}>
      <Text >LoginScreen</Text>
      
      <Button
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        onPress={LoginHandler}   
        />
    </View>
  )


}

export default LoginScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center' 
    }
})