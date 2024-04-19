import { ScrollView, StyleSheet, Text, View,Keyboard } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import GetLocation from '../components/GetLocation'
import LoginContext from '../Contexts/LoginPageContext'
import UserHomeScreen from './UserScreens/UserHomeScreen'
import SearchScreen from './UserScreens/SearchScreen'
import { colors } from '../Globals/Styles'
import DeliveryChargeModal from '../components/DeliveryChargeModal'
import AddCartModal from '../components/AddCartModal'
import CartNotification from '../components/CartNotification'
import  axios  from 'axios';
import { API } from '../utils/apiUtils'


const RenderHome = () => {
    const [searchTextValue,setSearchTextValue] = useState()
    const [listcounts,setListCounts] = useState()
    const[count,setCount] = useState()
const {searchText,listCount,getcartCount} = useContext(LoginContext)

useEffect(()=>{
  getcartCount();
  },[])
 

useEffect(()=>{
setSearchTextValue(searchText.length) 
},[searchText,])

const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  
  return ( 
    <View style={styles.container}>
     <GetLocation/>
    
     {searchTextValue>0?<SearchScreen/>:<UserHomeScreen dismissKeyboard={dismissKeyboard}/>}
     {listCount>0?<CartNotification itemCount={listCount}/>:""}
     
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