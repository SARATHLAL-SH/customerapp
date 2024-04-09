import {View, Text} from 'react-native';
import React from 'react';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import {LoginPageContext} from '../Contexts/LoginPageContext';
import GetLocation from '../components/GetLocation';
import SearchBar from '../components/SearchBar';
import SearchScreen from '../screens/UserScreens/SearchScreen';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import SwiperComponent from '../components/SwiperComponent';
import MapComponent from '../components/MapComponent';
import GetAllProducts from '../data/GetAllProducts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetails from '../screens/UserScreens/ProductDetails';
import MyCart from '../screens/UserScreens/MyCart';
import RenderHome from '../screens/RenderHome';
import Categories from '../screens/Categories';
import VerifyScreen from '../screens/AuthScreens/VerifyScreen';
import HomeVerification from '../screens/AuthScreens/AuthVerificationScreens/HomeVerification';
import Signup from '../screens/AuthScreens/AuthVerificationScreens/Signup';
import SelectIDScreen from '../screens/VerificationScreens/SelectIDScreen';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  
  return (
    
  
    <LoginPageContext>
      <Stack.Navigator>

       {/* <Stack.Screen name="Home" component={RenderHome}/>
       <Stack.Screen name="Product Details" component={ProductDetails}/>
       <Stack.Screen name="My Cart" component={MyCart}/>
       <Stack.Screen name="Search" component={SearchScreen}/>
       <Stack.Screen name="Category Details" component={Categories}/> */}
       <Stack.Screen name="Login" component={LoginScreen}/>
       <Stack.Screen name="OTP Verify" component={VerifyScreen}/>
       <Stack.Screen name="Verify" component={HomeVerification}/>
       <Stack.Screen name="Signup" component={Signup}/>
       <Stack.Screen name = 'Select ID' component={SelectIDScreen}/>
       

      </Stack.Navigator>
    </LoginPageContext>
   
  );
};

export default Navigations;
