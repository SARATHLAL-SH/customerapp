import { StyleSheet, Text, View,FlatList,Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../../Globals/Styles'
import { useEffect, useState } from 'react'
import { API } from '../../utils/apiUtils'
import LoginContext from '../../Contexts/LoginPageContext'
import {useNavigation} from '@react-navigation/native'



const SearchScreen = ({setSearchTextValue}) => {
  const [inputValue, setInputValue] = useState();
  const [filterdata, setFilterData] = useState([]);
  const navigation = useNavigation()
   
const {subCategory,apiError,searchText, setSearchText} = useContext(LoginContext)
const ProductDetailsHandler = (item)=>{
  navigation.navigate("Product Details",{product:item})
  setSearchText("")
}
    
    useEffect(() => {
      const filtered = subCategory?.filter(data =>
       data.name.toLowerCase().includes(searchText.toLowerCase())
        );
       setFilterData(filtered);
       }, [searchText, subCategory]);

   
    console.log(searchText)
    const renderItem = ({item}) => (
      <TouchableOpacity style={styles.categoryContainer} onPress={()=>ProductDetailsHandler(item)}>
      <Image source={{uri:API+"get/imageswinesubcategories/"+item.images}} style={styles.image}/>
     <View style={styles.detailContainer}>
     <Text style={styles.searchItemName} numberOfLines={1} 
              ellipsizeMode="tail">  {item.name}</Text>
     <Text style={styles.searchItemPrice}>  ₹{item.price}</Text>
     <Text style={styles.searchItemMl}>  {item.miligram} ML</Text>

     </View>
        
      </TouchableOpacity>
    );
  return (
    <View style={styles.container}>
    
     <View style={styles.borderContainer}>
     <View style={styles.subContainer}>
    
<FlatList data={filterdata} renderItem={renderItem} keyExtractor={item=>item._id.toString()}/>
     </View>
     </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container:{},
    borderContainer:{
   
    borderColor:colors.WHITE,
    borderWidth:10,
    
    },
    subContainer:{height:'91.5%',
    backgroundColor:colors.SECONDARY_COLOR
  },
  categoryContainer:{
flexDirection:'row',
backgroundColor:colors.HEADER_CONTAINER,
marginBottom:5,
elevation:10,

  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    margin:5
  },
  detailContainer:{
paddingRight:10
  },
  searchItemName:{
    color:"black", marginTop:20,fontWeight:"700",fontSize:20

  },
  searchItemPrice:{
    fontSize:16,
    fontWeight:'700',
    color:colors.MAIN_COLOR
  },
  searchItemMl:{
    fontWeight:'700',
    color:'#064710'
  }
})