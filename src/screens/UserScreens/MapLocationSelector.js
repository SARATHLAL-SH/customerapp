import { StyleSheet, Text, View,Button  } from 'react-native'
import React,{ useContext, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import LoginContext from '../../Contexts/LoginPageContext';
import SetPermenantAddress from '../SetPermenantAddress';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';



const MapLocationSelector = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
const {userLocationCoords} = useContext(LoginContext)
const {latitude,longitude} = userLocationCoords;
  const handleMarkerDragEnd = (event) => {
    const { coordinate } = event.nativeEvent;

    setSelectedLocation(coordinate);
   
  };

  
console.log("userlocation cords",latitude,longitude)
  return (
    <>
    <View style={{ height:'50%'}}>
      <MapView
        style={{ flex: 1 }}
        onPress={(event) => setSelectedLocation(event.nativeEvent.coordinate)}
        initialRegion={{
          latitude: latitude && latitude, // Initial map latitude
          longitude: longitude && longitude, // Initial map longitude
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </MapView>
      {selectedLocation && (
        <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
          <Text>Selected Location:</Text>
          <Text>Latitude: {selectedLocation.latitude}</Text>
          <Text>Longitude: {selectedLocation.longitude}</Text>
        </View>
      )}
      
    </View>
    <ScrollView>
    <SetPermenantAddress latitude={selectedLocation?.latitude} longitude={selectedLocation?.longitude}/>
    </ScrollView>
    </>
  )
}

export default MapLocationSelector

const styles = StyleSheet.create({})