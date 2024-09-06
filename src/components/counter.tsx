import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'


type propsType = {
    value : number
    addFn : ()=>void
}
const Counter = ({value , addFn}:propsType) => {
  return (
    <View>
      <Text>counter {value}</Text>
      <TouchableOpacity onPress={addFn}> 
         <Text >Press Me</Text> 
         </TouchableOpacity>
    </View>
  )
}

export default Counter