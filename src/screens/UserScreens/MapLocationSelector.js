import { StyleSheet, Text, View,Button  } from 'react-native'
import React,{ useState } from 'react'
import MapView, { Marker } from 'react-native-maps';

const MapLocationSelector = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerDragEnd = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onPress={(event) => setSelectedLocation(event.nativeEvent.coordinate)}
        initialRegion={{
          latitude: 37.78825, // Initial map latitude
          longitude: -122.4324, // Initial map longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
  )
}

export default MapLocationSelector

const styles = StyleSheet.create({})