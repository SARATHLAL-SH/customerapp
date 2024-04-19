import { StyleSheet, Text, View,Image, Dimensions, TouchableOpacity  } from 'react-native'
import {useRoute,useNavigation} from '@react-navigation/native'
import React, { useState,useEffect, useContext } from 'react'
import { colors } from '../../Globals/Styles'
import { API } from '../../utils/apiUtils'
import AddCartModal from '../../components/AddCartModal'
import axios from 'axios'
import LoginContext from '../../Contexts/LoginPageContext'
import { fetchUser } from '../AuthScreens/Utils/navigationutils';

const ProductDetails = () => {
   const route = useRoute();
   const product = route.params.product
   const navigation = useNavigation();
   const [quantity,setQuantity] = useState(1)
   const [totalPrice,setTotalPrice] = useState(product.price)
   const [modalVisible, setModalVisible] = useState(false);
   const ml = product.miligram;
   const[message,setMessage] = useState();
   const cart =product._id
   const {setListCount,getcartCount} =useContext(LoginContext)
   const [mobileNumber,setMobileNmber] = useState()
  
const fetchUsermobile = async()=>{
 const mobileNumbers = await fetchUser();
  setMobileNmber(mobileNumbers);
}

   useEffect(()=>{
    fetchUsermobile();
   },[])
console.log("mobile in prouductDetails", mobileNumber)
   const clearMessageHandler =(msg)=>{
    setMessage(msg)
    setTimeout(()=>{
      setMessage("")
    },3000)
   }
 console.log("mjobile",  quantity, totalPrice,ml,cart,mobileNumber)
   const addtoCartHandler = async () => {
    try{
      
      const response = await axios.post(API+"add-to-cart",{quantity,ml,totalPrice,cart,mobileNumber}) ;
        if(response.data){
          getcartCount();
          setModalVisible(true);
          
    }
    else{
      clearMessageHandler("Failed to load Data")
      console.log(error.message)
    }
    }catch(error){
      clearMessageHandler("Failed to add item to Cart")
      console.log(error.message)
  }
   };
 
   const closeModal = () => {
     setModalVisible(false);
     navigation.navigate("My Cart");
   };
 const buyMoreProduct =()=>{
    navigation.navigate('Home')
 }
const addItemHandler =()=>{
    setQuantity(quantity<5 ? quantity + 1 : 1);
   
}
const removeItemHandler = ()=>{
    setQuantity(quantity>1 ? quantity - 1 : 1)
   
}

useEffect(() => {
 
    setTotalPrice(quantity > 0 ? quantity * product.price:totalPrice);
  }, [quantity, product.price]);
 
  return (
    <View style={styles.container}>

      
      <View style={styles.productcontainer}>
        <View style={styles.productNameContainer}><Text style={styles.product}>{product.name}</Text></View>
        
        <Image source={{uri:API+"get/imageswinesubcategories/"+product.images}} style={styles.shopImage}/>

        <View style={styles.priceContainer}>

        <View style={styles.AddContainer}>
            <TouchableOpacity style={styles.minusContainer} onPress={removeItemHandler}>
                <Text style={styles.decrease}>-</Text>
            </TouchableOpacity>
                <Text style={styles.ProductCount}>{quantity}</Text>
            <TouchableOpacity style={[styles.increaseContainer]} onPress={addItemHandler}>
                <Text style={styles.decrease}>+</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.addCartContainer} onPress={addtoCartHandler}>
                <Text style={styles.addCart}>Add Cart</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.price}>₹{totalPrice}</Text>
        <Text style={styles.miligram}>ML{product.miligram} * {quantity>1?quantity:null}</Text>

        </View>
       
        
      </View>
      <View style={styles.messageContainer}><Text style={styles.messageText}>{message}</Text></View>
      <View style={styles.container}>
    
      <AddCartModal visible={modalVisible} closeModal={closeModal} buyMore={buyMoreProduct} data={product} count={quantity}/>
     
    </View>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        
          <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'700',color:'white', fontSize:20, marginTop:10}}>{product.name}</Text>
          <Text style={{color:"white",  marginTop:15, marginLeft:5}}>{product.miligram} ML </Text>
          </View>
          <TouchableOpacity >
            <Text style={styles.closeButton}></Text>
          </TouchableOpacity>
          
        </View>
      </View >
      
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.SECONDARY_COLOR
    },
    productcontainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    productNameContainer:{
        backgroundColor:colors.HEADER_CONTAINER,
         width:"100%", 
         height:"10%", 
         marginBottom:20,
         elevation:10, 
         justifyContent:'center',
         paddingLeft:10},
    product:{
        fontSize:22,
        color:colors.HEADER,
        fontWeight:'700'
    },
    shopImage:{
        width:Dimensions.get('screen').width*0.95,
        height:Dimensions.get('screen').height*0.50,
        objectFit:'fill',
       
      },
    AddContainer:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      width:'50%'
      },    
    minusContainer:{
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      width:30,
      backgroundColor:"#ff4f00",
      justifyContent:'center',
      alignItems:'center',
      borderTopLeftRadius:10
      },
      decrease:{
        fontSize:20,
        fontWeight:'700',
        color:colors.WHITE
      },
      increaseContainer:{
        height:'100%',
      justifyContent:'center',
      alignItems:'center',
      width:30,
      backgroundColor:"#46ce00",
      justifyContent:'center',
      alignItems:'center',
      borderTopRightRadius:10
       
    },
      addCartContainer:{
        backgroundColor:'#b5045f',
        height:40,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center', 
        borderRadius:10
    },
      addCart:{
        fontWeight:'700',
        color:colors.WHITE
    },
      priceContainer:{
        width:"95%",
        backgroundColor:colors.HEADER_CONTAINER,
        marginVertical:10,
        height:"10%",
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignItems:'center',
        elevation:10
      },
      ProductCount:{
        fontWeight:'700',
        fontSize:18
      },
      price:{
        fontSize:22,
        fontWeight:'700',
        color:colors.ERROR
      },
      miligram:{
        fontSize:16,
        fontWeight:'600',
        color:"green"
      },
      modalContainer: {
        height:"10%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        position:'absolute',
        width:"100%",
        bottom:0 
      },
      modalContent: {
        backgroundColor: 'green',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        
      },
      messageContainer:{
        justifyContent:'center',
        alignItems:'center'},
        messageText:{color:colors.ERROR,
        fontWeight:'700'  
        }
})