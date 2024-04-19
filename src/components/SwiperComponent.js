import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
import { API } from '../utils/apiUtils'
import axios from 'axios'
import { useSafeAreaFrame } from 'react-native-safe-area-context'



const SwiperComponent = () => {
  const[imgUrl,setImgUrl] = useState()
  
    const swiperData = async ()=>{
      try{
      const imgurl = await axios.get(API+"get-all-swiper-post-images");
      if(imgurl){
    setImgUrl(imgurl.data);
      }
      else{
        console.log("no images available")
      }
  }

catch(error){
  console.log("error in swiperComponent", error)
}
    }
   
useEffect(()=>{
  swiperData();
},[])

  return (
    <View style={styles.container}>
    <View style={styles.swiperContainer}>

    <Swiper style={styles.wrapper} showsButtons={true} loop={true} autoplay={true}>
        
        <View style={styles.slide1}>
          
          <Image source={require('../../Assets/Images/champagner.jpg')}style={styles.image} />
        </View>
        {imgUrl?.map((img)=>(
        <Image key={img._id} source={{uri:API+"imagesswiper/"+img.images}} style={styles.image}/>

        ))}
       
        <Image source={{uri:API+"imagesswiper/1713248773389pistachios swiper.jpg"}} style={styles.image}/>
       
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
      height:Dimensions.get('screen').width*0.35,
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