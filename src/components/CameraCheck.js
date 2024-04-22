import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {Camera, useCameraDevice} from 'react-native-vision-camera'

const CameraCheck = () => {
    const device = useCameraDevice('back')
    useEffect(()=>{
checkPermission();
    })
    const checkPermission = async ()=>{
        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()  
        console.log(newCameraPermission)
    }
  return (
    <View style={{flex:1}}>
      <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
    </View>
  )
}

export default CameraCheck

const styles = StyleSheet.create({})