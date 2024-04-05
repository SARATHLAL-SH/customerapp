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




const Navigations = () => {
  
  return (
    
   
      <LoginPageContext>
        
      <UserHomeScreen/>
     {/* <GetAllProducts/> */}
    </LoginPageContext>
   
  );
};

export default Navigations;
