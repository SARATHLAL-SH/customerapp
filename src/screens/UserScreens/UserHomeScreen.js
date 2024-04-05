import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import GetLocation from '../../components/GetLocation'
import SwiperComponent from '../../components/SwiperComponent'
import GetAllProducts from '../../data/GetAllProducts'
import { renderProduct } from '../../utils/productRender'
import { colors } from '../../Globals/Styles'
import { API } from '../../utils/apiUtils'

const UserHomeScreen = () => {
  const {products} = GetAllProducts();
 const renderProduct =({item})=>(
    <View>
        {console.log("items",item)}
        <Text>Render product</Text>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center', margin:10}}>
                <Image source={{uri:API+"get/image/"+item.image}} style={styles.shopImage}/>
                <Text style={{fontWeight:'700',marginTop:5, color:'red',fontSize:16}}>{item.name}</Text>
               
              </TouchableOpacity>
    </View>
    )

  return (
    <View style={styles.container}>
      <GetLocation/>
      <View style={{marginHorizontal:10}}>
      <SwiperComponent/>
      </View>  
      <View style={{flex:1, backgroundColor:colors.MAIN_COLOR,marginHorizontal:10,marginBottom:10, borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
    <FlatList data={products} renderItem={renderProduct}  keyExtractor={item=>item?._id.toString()}/>
      </View>
      </View>
  )
}

export default UserHomeScreen

const styles = StyleSheet.create({
    container:{height:'100%'},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
      }
})