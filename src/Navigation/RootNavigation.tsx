import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import BottomTabNavigation from './BottomTabNavigation';


export type stackScreens ={
  TabNavigation :undefined;

  login : undefined;

}



const RootNavigation = () => {

  const Stack = createNativeStackNavigator<stackScreens>();

  return (
    <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="TabNavigation" component={BottomTabNavigation} />
    </Stack.Navigator>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})