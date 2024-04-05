import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'


const SwiperComponent = () => {
  return (
    <View style={styles.container}>
    <View style={styles.swiperContainer}>

    <Swiper style={styles.wrapper} showsButtons={true} loop={true} autoplay={true}>
        
        <View style={styles.slide1}>
          <Image source={require('../../Assets/Images/champagner.jpg')}style={styles.image} />
        </View>

        <View style={styles.slide2}>
        <Image source={require('../../Assets/Images/cocktailCvr.jpg')} style={styles.image} />
        </View>

        <View style={styles.slide3}>
        <Image source={require('../../Assets/Images/wineCoverImage.jpg')} style={styles.image} />
        </View>
        
      </Swiper>

      </View>
      </View>
  )
}

export default SwiperComponent

const styles = StyleSheet.create({
      container:{
      marginVertical:5,
     
     },
      swiperContainer:{
      borderRadius:10,
      overflow:'hidden',
      height:Dimensions.get('screen').width*0.25,
      elevation:20
    },
      slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
      slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
      slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
      text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
      image:{
      width:Dimensions.get('screen').width,
      height:Dimensions.get('screen').height*0.20,
      objectFit:'cover',
    }
})