import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,ScrollView,Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect,useState,useRef } from 'react'
import Swiper from 'react-native-swiper'
import SwiperComponent from '../../components/SwiperComponent'
import GetAllProducts from '../../data/GetAllProducts'
import { colors } from '../../Globals/Styles'
import { API } from '../../utils/apiUtils'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'

const UserHomeScreen = ({ dismissKeyboard }) => {

  const screenWidth = Dimensions.get('window').width;
  const itemMargin = 10; // Adjust as needed
  const imageSize = (screenWidth - (itemMargin * 4)) / 3; 
  const [productData,setProductData] = useState([]);
  const [categoryData,setCategoryData] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [numRowsToShow, setNumRowsToShow] = useState(9);
  const navigation = useNavigation(); 
  const [loading, setLoading] = useState(true);
  const [shouldFetchData, setShouldFetchData] = useState(true)

  useEffect(() => {
    const getAllProducts = async()=>{
      try{
          const response = await axios.get(API+"get-all-wine-subcategories");
          if(response.data){
          setProductData(response.data);
          setLoading(false)
        
          }
          else{
          console.log("data not available")
          }
          const categroy = await axios.get(API + 'get-all-categories');
          
          if(categroy.data){
            setCategoryData(categroy.data);
            setLoading(false)
           
            }
            else{
            console.log("data not available")
            }

      } catch(error){
          console.log("userHomeScreen Error",error)
      }
  }
  if (shouldFetchData) {
   getAllProducts();
    // Once data is fetched, set shouldFetchData to false so that data fetching doesn't occur again
    setShouldFetchData(false);
  }
  getAllProducts();

  
}, [shouldFetchData]);
if (loading || shouldFetchData) {
  return null;
}
  const categrySearchHandler=(categoryId)=>{
    navigation.navigate('Category Details',{categoryId:categoryId})
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }

  const ProductDetailsHandler = (item)=>{
  
    navigation.navigate("Product Details",{product:item})
  }
 const renderProduct =({item})=>(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',
      paddingVertical:5,  marginBottom:20 }}>
       
        
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:100, margin:5,height:"40%" }} onPress={()=>categrySearchHandler(item._id)}>
            <Image source={{uri: API+'get/image/' + item.image}} style={styles.shopImage}/>
            <Text style={{fontWeight:'700',marginTop:5, color:'#064710',fontSize:14,fontWeight:'700'}} numberOfLines={1} 
              ellipsizeMode="tail">{item.name}</Text>
        </TouchableOpacity>

    </View>
    )
    const rendersubProducts =({item})=>(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
       
        <TouchableOpacity style={{alignItems:'center',width:100, marginVertical:1}} onPress={()=>ProductDetailsHandler(item)}>
            <Image source={{uri:API+"get/imageswinesubcategories/"+item.images}} style={styles.shopImage}/>
            <Text style={{fontWeight:'700',marginTop:5, color:colors.MAIN_COLOR,fontSize:16,textAlign:'center'}} numberOfLines={1} 
              ellipsizeMode="tail">{item.name}</Text>
           <View style={{flexDirection:'row', justifyContent:'space-between', }}>
           <Text style={{fontWeight:'700',marginTop:5, color:colors.ERROR,fontSize:14,textAlign:'center'}}>₹{item.price}</Text>
           <Text style={{fontWeight:'700',marginTop:5, color:"green",fontSize:12,textAlign:'center', marginLeft:10}}>ML{item.miligram}</Text>
      </View>
      </TouchableOpacity> 

    </View>
    )

  const calculateNumColumns = () => {
      return Math.floor(screenWidth / imageSize);
  };

  const handleShowMore = () => {
    setShowAllProducts(!showAllProducts);
    setNumRowsToShow(12)
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
   
      
      <View style={{marginHorizontal:10}}>
      <SwiperComponent/>
      </View>  
      
      <View style={{flex:1, backgroundColor:"#fff1f0",marginHorizontal:10,marginBottom:10, borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
     <View style={styles.categoryContainer}><Text style={styles.categoryText}>Categories</Text></View> 
    <FlatList data={categoryData} renderItem={renderProduct}  keyExtractor={item=>item?._id.toString()} 
    horizontal={true}  />
    <View style={styles.categoryContainer}><Text style={styles.categoryText}>Products</Text></View> 
    <FlatList 
      data={productData.slice(0, showAllProducts ? productData.length : numRowsToShow)} 
      renderItem={rendersubProducts}  
      keyExtractor={item => item?._id.toString()} 
      numColumns={calculateNumColumns()} showsVerticalScrollIndicator={false} ItemSeparatorComponent={() => <View style={styles.separator} />} contentContainerStyle={{ flexGrow: 1 }} 
    />
      
          <TouchableOpacity onPress={handleShowMore} style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>{showAllProducts ? "Show Less" : "Show More"}</Text>
          </TouchableOpacity>
        
</View>

      </View>
      </TouchableWithoutFeedback>
  )
}

export default UserHomeScreen

const styles = StyleSheet.create({
    container:{height:'88%'},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
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
      },
      shopImage:{
        width:80,
        height:80,
        objectFit:'fill',
       
      },
      categoryContainer:{
      justifyContent:'center',
      alignItems:'center',
      marginBottom:15
      },

      separator: {
        borderBottomWidth: 0.5, // Adjust border width as needed
        borderBottomColor: colors.MAIN_COLOR, // Adjust border color as needed
      },
      categoryText:{
     fontSize:20,
     fontWeight:'700',
     color:colors.MAIN_COLOR,
    marginTop:10,
    textAlign:'center'
      },
      mapImages:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      
      },
      showMoreButton: {
        alignSelf: 'center',
        backgroundColor: colors.MAIN_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
      },
      showMoreText: {
        color: colors.WHITE,
        fontWeight: 'bold',
        fontSize: 16,
      },
})