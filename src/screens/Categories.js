import { StyleSheet, Text, View,Image,Dimensions,FlatList,TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../utils/apiUtils'
import {useRoute} from '@react-navigation/native'
import { colors } from '../Globals/Styles'
import {useNavigation} from '@react-navigation/native'



 const Categories = () => {
    const navigation =  useNavigation();
    const [message,setMessage] = useState();
    const [categroyDetails,setCategoryDetails] = useState();
    const [categoryList,setCategoryList] = useState();
    const [filterCategroy,setFilterCategory] = useState()
    const[isfilter,setIsFilter] = useState(false);


  const messageHandler = (msg)=>{
        setMessage(msg)
        setTimeout(()=>{
          setMessage("")  
        },3000)
    }

  const route = useRoute();
  const categoryId = route.params?.categoryId
  const screenWidth = Dimensions.get('window').width;
  const itemMargin = 10; // Adjust as needed
  const imageSize = (screenWidth - (itemMargin * 4)) / 3;
    
  const categoryItemHandler = async()=>{
        try{
            const categoryList = await axios.get(API+"get-all-wine-subcategories-categories/"+categoryId)
            if(categoryList.data){
            setCategoryList(categoryList.data);
            }
            else{
            messageHandler("Unable to fetch data")
            }
            const categoryDetails = await axios.get(API + 'get-all-categories');
            if(categoryDetails.data){
            const filterData = categoryDetails.data.filter((category)=>category._id ===categoryId)
            setCategoryDetails(filterData);
            }
            else{
            messageHandler("Unable to fetch data")
            }
        }catch(error){
            console.log("error in Categories ",error)
            messageHandler("Network Error")
        }
   }

    useEffect(()=>{
      categoryItemHandler();
    },[])
    const uniqueSubCategoryTypes = Array.isArray(categoryList) ?
    [...new Set(categoryList.map(item => item.subCategoryType))] :
    [];
  
    console.log("uniquesubcategories", uniqueSubCategoryTypes)
  const calculateNumColumns = () => {
        return Math.floor(screenWidth / imageSize);
    };
    
  const ProductDetailsHandler = (item)=>{
        navigation.navigate("Product Details",{product:item})
    }
    const allSubCategoryContainer=()=>{
      categoryItemHandler();
    }
    const filterItemsHandler = (categroy)=>{
    const filterSubCategoryItems= categoryList?.filter((item)=>item.subCategoryType===categroy)
    setCategoryList(filterSubCategoryItems)
    }


    const renderItem = ({ item }) => (
      <View style={styles.subCategoryMainContainer}>
    
    { item && ( <TouchableOpacity style={styles.subCategoryContainer} onPress={()=>filterItemsHandler(item)}>
        <Text style={styles.subCategoryText}>{item}</Text>
      </TouchableOpacity>)}
     
      </View>
    );

  const rendersubProducts =({item})=>(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
         
         
          <TouchableOpacity style={{alignItems:'center',width:100, marginVertical:1}} onPress={()=>ProductDetailsHandler(item)}>
          <Image source={{uri:API+"get/imageswinesubcategories/"+item.images}} style={styles.shopImages}/>
          <Text style={{fontWeight:'700',marginTop:5, color:colors.MAIN_COLOR,fontSize:16,textAlign:'center'}} numberOfLines={1} 
          ellipsizeMode="tail">{item.name}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', }}>
          <Text style={{fontWeight:'700',marginTop:5, color:colors.ERROR,fontSize:14,textAlign:'center'}}>₹{item.price}</Text>
          <Text style={{fontWeight:'700',marginTop:5, color:"green",fontSize:12,textAlign:'center', marginLeft:10}}>ML{item.miligram}</Text>
        </View>
        </TouchableOpacity> 
  
        </View>
      )
  
  return (
    <View style={styles.container}>
     {categroyDetails && (<View style={styles.mainContainer}>
        
        <Image source={{uri: API+'get/image/' + categroyDetails[0]?.image}} style={styles.shopImage}/>
        <View style={styles.descriptionContainer}>
        <Text style={styles.header}>{categroyDetails[0]?.name}</Text>
        <Text style={styles.description}>{categroyDetails[0]?.description}</Text>
        </View>
        
     </View>)}
     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:5}}>
     <TouchableOpacity style={styles.allSubCategoryContainer} onPress={allSubCategoryContainer} ><Text style={styles.subCategoryText}>All</Text></TouchableOpacity>
     <FlatList
  data={uniqueSubCategoryTypes}
  renderItem={renderItem}
  keyExtractor={(item, index) => index.toString()} // Use index as key
  horizontal
/>
     </View>
     
     <FlatList 
      data={categoryList} 
      renderItem={rendersubProducts}  
      keyExtractor={item => item?._id.toString()} 
      numColumns={calculateNumColumns()} showsVerticalScrollIndicator={false} ItemSeparatorComponent={() => <View style={styles.separator} />} contentContainerStyle={{ flexGrow: 1 }} 
    />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    container:{
flex:1,
backgroundColor:colors.SECONDARY_COLOR
    },
    mainContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding:10,
        marginTop:10,
        borderWidth:2,
    borderColor:colors.MAIN_COLOR,
    marginBottom:10
},
descriptionContainer:{
    width:"60%",
    paddingHorizontal:10,

   },
   description:{
     color:"#0e0647",
     fontWeight:'700',
     fontSize:10,
     flexWrap:'wrap',
     textAlign:'justify'
   },
    header:{
        fontSize:14, 
        fontWeight:'700',
        color:"#0e0647",
    },
    shopImage:{
        width:150,
        height:140,
        objectFit:'fill',
       
      },
      shopImages:{
        width:100,
        height:100,
        objectFit:'fill',
       
      },
      subCategoryMainContainer:{
        
        margin:5,
        justifyContent:'center',
        alignItems:'center'
      },
      allSubCategoryContainer:{
        backgroundColor:colors.MAIN_COLOR,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        borderRadius:5,
        height:Dimensions.get('screen').height*0.043,
        width:60,
        marginHorizontal:10,
      },
      subCategoryContainer:{
        backgroundColor:colors.MAIN_COLOR,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        borderRadius:5
      },
      subCategoryText:{
        fontSize:16,
        fontWeight:'700',
        color:colors.WHITE
      }
     
})