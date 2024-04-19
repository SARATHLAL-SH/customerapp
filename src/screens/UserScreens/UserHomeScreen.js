import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,ScrollView,Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect,useState,useRef } from 'react'
import Swiper from 'react-native-swiper'
import SwiperComponent from '../../components/SwiperComponent'
import GetAllProducts from '../../data/GetAllProducts'
import { colors } from '../../Globals/Styles'
import { API } from '../../utils/apiUtils'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [priceFilterData,setPriceFilterData] = useState([]);
  const [isFilter,setIsFilter] = useState(false);
 
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
   setShouldFetchData(false);
  }
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
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:colors.HEADER_CONTAINER,elevation:10,
      paddingVertical:5,  marginBottom:10, marginHorizontal:5 }}>
       
        
      <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:100, margin:5,height:"40%" }} onPress={()=>categrySearchHandler(item._id)}>
      <Image source={{uri: API+'get/image/' + item.image}} style={styles.shopImageHorizontal}/>
      <Text style={{fontWeight:'700',marginTop:5, color:'#064710',fontSize:14,fontWeight:'700'}} numberOfLines={1} 
        ellipsizeMode="tail">{item.name}</Text>
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

  const filterPriceHandler = (minPrice, maxPrice) => {
    setIsFilter(true)
  const filteredProducts = productData.filter(item => item.price >= minPrice && item.price <= maxPrice);
  const sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);
  setPriceFilterData(filteredProducts);
    };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
   
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

     <View style={{marginHorizontal:10}}>
     <SwiperComponent/>
     </View>  
      
     <View style={{flex:1, backgroundColor:"#fff1f0",marginHorizontal:10,marginBottom:10, borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
     <View style={styles.categoryContainer}><Text style={styles.categoryText}>Categories</Text></View> 
    
    <FlatList data={categoryData} renderItem={renderProduct}  keyExtractor={item=>item?._id.toString()} 
    horizontal={true}  />

    <View style={styles.priceFilterContainer}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <TouchableOpacity style={styles.filterPrice} onPress={()=>filterPriceHandler(0,500)}><Text style={styles.flPrice}>{' < ₹500'}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.filterPrice} onPress={()=>filterPriceHandler(501,1000)}><Text style={styles.flPrice}>{'  ₹501 -1000'}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.filterPrice} onPress={()=>filterPriceHandler(1001,1500)}><Text style={styles.flPrice}>{'  ₹1001 -1500'}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.filterPrice} onPress={()=>filterPriceHandler(1501,2000)}><Text style={styles.flPrice}>{'  ₹1501 -2000'}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.filterPrice} onPress={()=>filterPriceHandler(2001,Infinity)}><Text style={styles.flPrice}>{'  > 2001'}</Text></TouchableOpacity>
    </ScrollView>
    </View>
    {isFilter && (
  <>
    <View style={styles.FilterContainer}>
      <Text style={styles.categoryText}>Filtered Products</Text>
      <TouchableOpacity style={{marginLeft:20,marginTop:11}} onPress={()=>setIsFilter(false)}>
      <Icon name="close" color="red" size={20} />
      </TouchableOpacity>
      
    </View> 
    {priceFilterData.length > 0 ? (
      <View style={styles.mapContainer}>
        {priceFilterData.slice(0, priceFilterData.length)?.map(item => (
          <TouchableOpacity key={item?._id.toString()} style={styles.productListContainer} onPress={() => ProductDetailsHandler(item)}>
            <Image source={{ uri: API + "get/imageswinesubcategories/" + item.images }} style={styles.shopImage} />
            <Text style={styles.itemCaption} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
              <Text style={styles.itemMl}>ML{item.miligram}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found in the selected price range</Text>
      </View>
    )}
  </>
)}

    <View style={styles.categoryContainer}><Text style={styles.categoryText}>Products</Text></View> 
   
    <View style={styles.mapContainer}>
     {productData?.slice(0, showAllProducts ? productData.length : numRowsToShow).map(item => (
     <TouchableOpacity key={item?._id.toString()} style={styles.productListContainer} onPress={() => ProductDetailsHandler(item)}>
     <Image source={{ uri: API + "get/imageswinesubcategories/" + item.images }} style={styles.shopImage} />
     <Text style={styles.itemCaption} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
     <View style={styles.priceContainer}>
     <Text style={styles.itemPrice}>₹{item.price}</Text>
     <Text style={styles.itemMl}>ML{item.miligram}</Text>
     </View>
    </TouchableOpacity>
  ))}
    </View>
    <TouchableOpacity onPress={handleShowMore} style={styles.showMoreButton}>
    <Text style={styles.showMoreText}>{showAllProducts ? "Show Less" : "Show More"}</Text>
    </TouchableOpacity>   
    </View>

  </ScrollView>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default UserHomeScreen

const styles = StyleSheet.create({
    container:{flex:1},
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
      shopImageHorizontal:{
        width:80,
        height:80,
        objectFit:'fill',
      },
      priceFilterContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
       
        marginTop:10
      },
      filterPrice:{
        backgroundColor:colors.HEADER_CONTAINER,
        marginHorizontal:10,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        elevation:10
      },
      flPrice:{
       color:"#6d0470",
       fontWeight:'700',
       paddingHorizontal:5
      },
      productListContainer:{ 
      alignItems: 'center', 
      width:Dimensions.get('screen').width*0.28,
      marginVertical: 1,
      marginHorizontal:5,
      marginVertical:10,
      backgroundColor:colors.HEADER_CONTAINER,
      elevation:10
     },
      shopImage:{
        width:Dimensions.get('screen').width*0.27,
        height:Dimensions.get('screen').height*0.10,
        objectFit:'fill',
      },
      categoryContainer:{
      justifyContent:'center',
      alignItems:'center',
      marginBottom:15
      },
      FilterContainer:{
      justifyContent:'center',
      alignItems:'center',
      marginBottom:15,
      flexDirection:'row'
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
      mapContainer:{
        flexDirection:'row' ,
        flexWrap:'wrap',
        justifyContent:'center'
      },
      mapImages:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      },
      priceContainer:
      {
        flexDirection: 'row', 
        justifyContent: 'space-between'
      },
      showMoreButton: {
        alignSelf: 'center',
        backgroundColor: colors.MAIN_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
      },
      itemPrice:{fontWeight: '700', 
     
      color: colors.ERROR, 
      fontSize: 14, 
      textAlign: 'center'},
      itemCaption:{
        fontWeight: '700', 
        marginTop: 5, 
        color: colors.MAIN_COLOR, 
        fontSize: 16, 
        textAlign: 'center'
      },
     itemMl: { fontWeight: '700', 
     
     color: "green", 
     fontSize: 12, 
     textAlign: 'center', 
     marginLeft: 10 
    },
      showMoreText: {
        color: colors.WHITE,
        fontWeight: 'bold',
        fontSize: 16,
      },
      emptyContainer:{
        justifyContent:'center',
        alignItems:'center'
      },
      emptyText:{
        color:colors.ERROR,
        fontWeight:'700',
        fontSize:16
      }
})