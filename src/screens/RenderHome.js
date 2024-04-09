import { ScrollView, StyleSheet, Text, View,Keyboard } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import GetLocation from '../components/GetLocation'
import LoginContext from '../Contexts/LoginPageContext'
import UserHomeScreen from './UserScreens/UserHomeScreen'
import SearchScreen from './UserScreens/SearchScreen'
import { colors } from '../Globals/Styles'
import DeliveryChargeModal from '../components/DeliveryChargeModal'
import AddCartModal from '../components/AddCartModal'


const RenderHome = () => {
    const [searchTextValue,setSearchTextValue] = useState()
    const [listcounts,setListCounts] = useState()
const {searchText,listCount} = useContext(LoginContext)

const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

const checkCart =async()=>{
    try{
        const response = await  axios.get(API+"get-add-cart");
        if(response){
          setCartItems(response.data)
          setListCounts(response?.data?.data.length);}
    }catch(error){
        console.log(error)
    }
}
  
useEffect(()=>{
  setSearchTextValue(searchText.length) 
  checkCart(); 
},[searchText,])
  return ( 
    <View style={styles.container}>
     <GetLocation/>
    
     {searchTextValue>0?<SearchScreen/>:<UserHomeScreen dismissKeyboard={dismissKeyboard}/>}
     {/* {listCount>0?<AddCartModal data={"Items in your cart"} count={listCount}/>:""} */}
    </View>
  )
}

export default RenderHome

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.SECONDARY_COLOR
    }
})