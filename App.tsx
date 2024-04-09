import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import Navigations from './src/Navigations/Navigations'
import { NavigationContainer } from '@react-navigation/native';



const App = () => {
  return (
   
    <NavigationContainer>
      <Navigations/>
    </NavigationContainer>
    
  )
}

export default App