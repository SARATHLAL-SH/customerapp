import {View, Text} from 'react-native';
import React, { useContext, useEffect,useState } from 'react';
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
import UploadAdhaar from '../screens/AuthScreens/AuthVerificationScreens/UploadAdhaar';
import MapLocationSelector from '../screens/UserScreens/MapLocationSelector';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { fetchToken, fetchUser } from '../screens/AuthScreens/Utils/navigationutils';
import SignoutPage from '../screens/SignoutPage';
import DeliveryLocation from '../screens/UserScreens/DeliveryLocation';
import OrderStatus from '../screens/OrderStatus';
import CameraCheck from '../components/CameraCheck';
import SelfieVerification from '../screens/AuthScreens/AuthVerificationScreens/SelfieVerification';
import UploadPanCard from '../screens/AuthScreens/AuthVerificationScreens/UploadPanCard';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigations = () => {
  const [isToken, setIsToken] = useState(null);
  
console.log(isToken)
  useEffect(()=>{
    const checkToken = async ()=>{
      try {
        const token = await fetchToken();
        console.log('token checking', token);
        const usermobile = await fetchUser()
        console.log("userobile", usermobile)
        if (token) {
          setIsToken(token);
        } else {
          setIsToken(null);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    }
    checkToken();
  }, [])
  

  const AppDrawer = () => {
    return (
      <Drawer.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="HomeScreen" component={AppStack}/>
        <Drawer.Screen name="Select Location" component={MapLocationSelector}/>
        <Drawer.Screen name="Shop Details" component={MapComponent}/>
        <Drawer.Screen name="Sign out" component={SignoutPage}/>
       
        
      </Drawer.Navigator>
    );
  }
  
  const AppStack = () => {
    return (
      <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Home" component={RenderHome} options={{headerShown:false}}/>
      <Stack.Screen name="Product Details" component={ProductDetails} options={{headerShown:true}}/>
      <Stack.Screen name="My Cart" component={MyCart} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Category Details" component={Categories} />
      <Stack.Screen name="Delivery Location" component={DeliveryLocation}/>
      <Stack.Screen name='Order Status' component={OrderStatus} options={{headerShown:true}}/>
    </Stack.Navigator>
    );
  }

  const AuthStack = () =>{
    return(
    <Stack.Navigator>
       <Stack.Screen name="Login" component={LoginScreen}/>
       <Stack.Screen name="OTP Verify" component={VerifyScreen}/>
       <Stack.Screen name="Verify" component={HomeVerification}/>
       <Stack.Screen name="Signup" component={Signup}/>
       <Stack.Screen name = 'Select ID' component={SelectIDScreen}/>
       <Stack.Screen name='Upload Aadhaar' component={UploadAdhaar}/> 
       <Stack.Screen name='Upload PanCard' component={UploadPanCard}/>
       <Stack.Screen name='Upload Selfie' component={SelfieVerification}/>
     </Stack.Navigator>)
  }
  
  return (
    
  
    <LoginPageContext>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isToken ?<Stack.Screen name="AppDrawer" component={AppDrawer} />:
    <Stack.Screen name="AuthStack" component={AuthStack} />}
      <Stack.Screen name="Home Screen" component={AppDrawer} />
      <Stack.Screen name="Login Screen" component={AuthStack} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
         </Stack.Navigator>
  </LoginPageContext>
   
  );
};

export default Navigations;
