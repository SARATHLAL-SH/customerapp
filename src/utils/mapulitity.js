import { PermissionsAndroid,View,TouchableOpacity,Image,StyleSheet,Text } from "react-native";
import Geolocation from '@react-native-community/geolocation'
import * as geolib from 'geolib'
import { colors } from "../Globals/Styles";
export const locationRequest = async (setShoplist, setLocation, orderShop) => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted) {
      await retrieveLocation(setShoplist, setLocation, orderShop);
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app requires access to your location.",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await retrieveLocation(setShoplist, setLocation, orderShop);
      } else {
        console.log("Location Permission Denied");
        // Handle permission denial
      }
    }
  } catch (error) {
    console.warn("Error requesting location permission:", error);
    // Handle error (e.g., display an error message to the user)
  }
};

const retrieveLocation = async (setShoplist, setLocation, orderShop) => {
  Geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      setShoplist(orderShop);
      setLocation({ latitude, longitude });
    },
    (error) => {
      console.log("Error getting current position:", error);
      // Handle error (e.g., display an error message to the user)
    },
    { enableHighAccuracy: true, timeout: 100000, maximumAge: 10000 }
  );
};

//    export const renderItem =({item,location,})=>(
//         <View>
          // <TouchableOpacity style={{justifyContent:'center',alignItems:'center', margin:10}}>
          //   <Image source={require('../../Assets/Images/wineCoverImage.jpg')} style={styles.shopImage}/>
          //   <Text style={{fontWeight:'700',marginTop:5, color:'red',fontSize:16}}>{item.title}</Text>
          //   <Text style={[styles.genrealTextColor,{fontWeight:"700"}]}>{`${geolib.getDistance(location,
          //        { latitude: item.latitude, longitude: item.longitude }) / 1000} km`}</Text>
          // </TouchableOpacity>
//        </View>
//         )

        const styles = StyleSheet.create({
             shopImage:{
                width:100,
                height:100
              },
              genrealTextColor:{color:colors.WHITE}
        })