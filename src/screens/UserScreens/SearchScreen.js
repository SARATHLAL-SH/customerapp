import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React, { useContext } from 'react'
import GetLocation from '../../components/GetLocation'
import CategoryData from '../../data/CategoryData'
import { colors } from '../../Globals/Styles'
import { useEffect, useState } from 'react'
import { API } from '../../utils/apiUtils'


const SearchScreen = () => {
  const [inputValue, setInputValue] = useState();
  const [filterdata, setFilterData] = useState([]);
    const {categoryData,error} = CategoryData();
   
    
    useEffect(() => {
      if (!inputValue) {
        setFilterData(categoryData);
      } else {
        const filtered = categoryData.filter(data =>
          data.name.toLowerCase().startsWith(inputValue.toLowerCase()),
        );
        setFilterData(filtered, categoryData);
      }
    }, [inputValue, categoryData]);

    const renderItem = ({item}) => (
      <View style={styles.categoryContainer}>
        {console.log(item)}
        <Text style={{color:"white", marginTop:20,fontWeight:"700",fontSize:22}}>  {item.name}</Text>
        <Image
          source={{uri: API + item.image} } 
          style={styles.image}
        />
      <Text style={{color:"white",}}>{"http://192.168.0.114:2020/get/image/" + item.image}</Text>
        <Text style={{color:"white"}}>{item.description}</Text>
      </View>
    );
  return (
    <View style={styles.container}>
     <GetLocation/>
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
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    margin:5
  },
})