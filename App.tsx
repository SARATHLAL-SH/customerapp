import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import Navigations from './src/Navigations/Navigations'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {store} from '../customerapp/src/Redux/store'



const App = () => {
  return (
   <Provider store={store}>
    <NavigationContainer>
      <Navigations/>
    </NavigationContainer>
    </Provider>
  )
}

export default App