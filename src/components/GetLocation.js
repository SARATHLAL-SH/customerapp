import { StyleSheet, Text, View,PermissionsAndroid } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import Geolocation from '@react-native-community/geolocation'
import LoginContext from '../Contexts/LoginPageContext'
import axios from 'axios'

import SearchBar from './SearchBar'
const GetLocation = () => {
 
    const [location, setLocation] = useState(null);
    const[locationName, setLocationName] = useState();
    const {setuserLocationCoords,userLocationCoords} = useContext(LoginContext);

    useEffect(() => {
      const locationRequest = async ()=>{
        try{
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            title:"Location Permission",
            message:"This app require access to your location.",
            buttonPositive:'OK'
          })
          if(granted === PermissionsAndroid.RESULTS.GRANTED){
            Geolocation.getCurrentPosition
            (async position => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              setuserLocationCoords({latitude,longitude});
              const response = await axios.get( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCR6m47owJG21hUsWuE3FbMR0sJS1NMO_Q`)
              const  data = await response.data;
              console.log('API Response:', data.results[0].formatted_address);
             const locationAddress = data.results[0].formatted_address.split(',')
              firstAddress = locationAddress[1].trim();
             
              setLocationName(firstAddress)
            },
            (error) => console.log("permission denied",error),
            { enableHighAccuracy: true,  }
            // timeout: 20000, maximumAge: 1000
          );
          } else{
            console.log("Location Permission Denied")
          }
        }catch(err){
          console.warn("Error",err)
        }
      }
     locationRequest();
    },[]);
  
  console.log("userLocationCoords",userLocationCoords)
  return (
      <>
   
     <SearchBar locationName={locationName}/>
     </>
  )
}

export default GetLocation

const styles = StyleSheet.create({})