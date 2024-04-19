import { StyleSheet, Text, View,SafeAreaView, PermissionsAndroid,FlatList, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView,{Marker,PROVIDER_GOOGLE,Polyline} from 'react-native-maps'
import axios from 'axios'
import { API } from '../utils/apiUtils'
import { colors } from '../Globals/Styles'
import { locationRequest, renderItem } from '../utils/mapulitity'
// import geolib from 'geolib';
import LoginContext from '../Contexts/LoginPageContext'
import Geolocation from '@react-native-community/geolocation'
import * as geolib from 'geolib'

const MapComponent = () => {
  const [location, setLocation] = useState({latitude: 22.5726,longitude:88.3639});
  const [selectedShop, setSelectedShop] = useState(null);
  const [directions, setDirections] = useState(null);
  const [shoplist,setShoplist] = useState();
  const [markersList,setMarkersList] = useState([{"id": "660e52cd70695d780d57c87d", 
  "latitude": 22.5726, "longitude": 88.3639, "title": "AA rcb "}])
  const orderShop = geolib.orderByDistance(location,markersList);
 
 
   useEffect(()=>{
    locationRequest(setShoplist,setLocation,orderShop);
    const shopLocation= async()=>{
      try{

        const response = await axios.get(API+"get-all-shoplocation");
        if(response){
         const locations = response.data
         const extractMarkers = locations.map(item=>({
            latitude:item.latitude,
            longitude:item.longitude,
            title:item.ShopName,
            id:item._id
          }))
          setMarkersList(extractMarkers);
        }

        else{
          console.log("Shop details not available in  Map Component")
        }

      }catch(error){
        console.log(error)
      }
    }
    shopLocation(markersList);
  },[setMarkersList,setLocation])
    console.log(markersList)
  const handleShopSelection = async (selectedShop) => {
    setSelectedShop(selectedShop);
    console.log("selectedShop",selectedShop)
    const response = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${location.latitude},${location.longitude}&destination=${selectedShop.latitude},${selectedShop.longitude}&key=AIzaSyCR6m47owJG21hUsWuE3FbMR0sJS1NMO_Q`
    );
    const directionsData = response.data;
    setDirections(directionsData?.routes[0]?.overview_polyline.points);
  };

  const renderItem =({item,location,})=>{
    const distanceInMeters = geolib.getDistance(location, { latitude: item.latitude, longitude: item.longitude });
    const distanceInKilometers = (distanceInMeters / 1000).toFixed(1);
   return( <View>
      <TouchableOpacity style={{justifyContent:'center',alignItems:'center', margin:10}} onPress={()=>handleShopSelection(item)}>
        <Image source={require('../../Assets/Images/wineCoverImage.jpg')} style={styles.shopImage}/>
        <Image source={{uri: API+'get-wineshop-image' + item.image}}  style={styles.shopImage} />
        <Text style={{fontWeight:'700',marginTop:5, color:'red',fontSize:16}}>{item.title}</Text>
        <Text style={[styles.genrealTextColor,{fontWeight:"700", color:'black'}]}> {`${distanceInKilometers} km`}</Text>
      </TouchableOpacity>
   </View>)
  }

  return (
   <View style={{backgroundColor:colors.SECONDARY_COLOR,height:"100%"}}>
    <View style={styles.container}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map}
        region={{latitude:location?.latitude, longitude:location?.longitude, latitudeDelta:0.05, longitudeDelta:0.05}}>
        <Marker
        coordinate={{latitude:location?.latitude, longitude: location?.longitude}}
        title="My Location"
        description="searching wineshops"
     />
    {markersList.map((marker,index)=>( 
      <Marker
      key={index}
      coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
      }}
      title={`${marker.title} (${geolib.getDistance(location, marker) / 1000} km)`}
      description="Wine Available here"
      pinColor={colors.SECONDARY_COLOR}  onPress={() => handleShopSelection(marker)}
      />
      ))}

    {directions && (
          <Polyline
            coordinates={decodePolyline(directions)}
            strokeWidth={5}
            strokeColor="blue"
          />
        )}
        </MapView>

        <Text>Sura Map</Text>
    </View>

    <View style={styles.shopOrderContainer}>
    <Text style={[styles.genrealTextColor,{fontSize:24, color:colors.BLACK}]}>Nearest Shop Details</Text>
      {shoplist && (<FlatList data={shoplist} renderItem={({item})=>renderItem({item,location,})}
       keyExtractor={item=>item?.id.toString()} horizontal={true}/>)}
    </View>
    </View>
  )
}

const decodePolyline = (encoded) => {
  let points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return points;
};
export default MapComponent


const styles = StyleSheet.create({
    container: {
        height:400,
        alignItems: 'center',
        justifyContent: 'flex-end',
       },
      map: {
       ...StyleSheet.absoluteFillObject,
        },
      shopOrderContainer:{
       height:200,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        width:"95%"
      },
      shopImage:{
        width:100,
        height:100
      }, 
      genrealTextColor:{color:colors.WHITE}
})