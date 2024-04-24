import { FlatList, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { API } from '../../utils/apiUtils'
import axios from 'axios'
import { colors } from '../../Globals/Styles'
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import LoginContext from '../../Contexts/LoginPageContext'
import DeliveryChargeModal from '../../components/DeliveryChargeModal'
import {useNavigation} from '@react-navigation/native'
import {fetchUser} from '../AuthScreens/Utils/navigationutils'


const MyCart = () => {
  const [cartItems,setCartItems] = useState([]);
 
  const [totalPrice,setTotalPrice] = useState({})
  const [itemQuantities, setItemQuantities] = useState({});
  const [grandTotals, setGrandTotals] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const ml = cartItems?.data?.ml;
  const {listCount,setListCount} = useContext(LoginContext)
  const navigation =useNavigation();
  const [mobileNumber,setMobileNmber] = useState()


  const fetchUsermobile = async()=>{
    const mobileNumbers = await fetchUser();
     setMobileNmber(mobileNumbers);
   }
   
      useEffect(()=>{
       fetchUsermobile();
      },[])
  const fetchCartDetails = async()=>{
    try{
      const response = await  axios.get(API+"get-add-cart-all");
      if(response){
        setCartItems(response.data)
        setListCount(response?.data?.data.length);
      const initialQuantities = response.data.data.reduce((acc, item) => {
        acc[item._id] = item.quantity;
        return acc;
      }, {});
      setItemQuantities(initialQuantities);
      const totalPricedata = response.data.data.reduce((acc,item)=>{
        acc[item._id] = item.cart?.price;
        return acc;
      }, {})
        setTotalPrice(totalPricedata)
       }
      else{
        console.log("unable to fetch data ")
      }
    } catch(error){
      console.log("cart inside MyCart",error.message)
    }
  }
       
 const grandTotalHandler =()=>{
  let grandTotal = 0;
  Object.keys(itemQuantities).forEach(id => {
    const quantity = itemQuantities[id];
    const price = totalPrice[id];
    if (quantity !== undefined && price !== undefined) {
    grandTotal += quantity * price;
    }
  });
 
  setGrandTotals(grandTotal);
   }

useEffect(() => {
  grandTotalHandler();
  }, [itemQuantities, totalPrice,]);

  useEffect(()=>{
  fetchCartDetails();
  },[])

  
  const addItemHandler =async(itemId)=>{
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[itemId] = Math.min(Math.max((updatedQuantities[itemId] || 0) + 1, 1), 5);
    setItemQuantities(updatedQuantities);
   const selectedProduct= cartItems?.data?.find(item=>item._id ===itemId);
    
    const product = {
      quantity:updatedQuantities[itemId],
      totalPrice:selectedProduct.price,
      ml:selectedProduct.ml,
      cart:selectedProduct.cart._id,
    }
try{
  const updateCart = await axios.put(API+'update-cart/'+itemId,product)
  console.log("Cart item updated successfully:", updateCart.data);
}catch(error){
  console.log("error in my cart when AddItemHandler",error)
}
  }

  const removeItemHandler = async(cartId)=>{
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[cartId] = Math.max((updatedQuantities[cartId] || 0) - 1, 0);
     if(updatedQuantities[cartId]<1){
      try{const response = await axios.delete(`${API}delete-cart-item/${cartId}`)
      
      if(response.data){
      
      setCartItems(prevItems => ({
      ...prevItems,
      data: prevItems.data.filter(item => item._id !== cartId)
      }));
      
      setListCount(prevCount => prevCount - 1);
      fetchCartDetails();
      grandTotalHandler();
      
    
      }
      else{
      console.log("error")
      }}catch(error){console.log("error in my cart removeItemhandler",error)}
     }
     else{
      setItemQuantities(updatedQuantities);
     }
  }
 
  const closeModal = () => {
    setModalVisible(!modalVisible);
    };
   
  const renderCartItems = ({ item }) => {
    return (
      <View style={styles.listItemContainer}>
        
        <Image source={{uri:API+"imageswinesubcategories/"+item?.cart?.images}} style={styles.shopImage}/>

        <View style={styles.itemContainer}>
        <Text style={styles.productName}>{item?.cart?.name}</Text>
        <Text style={styles.productMl}>ML: {item.ml} {`${itemQuantities[item._id] > 1 ? `(${itemQuantities[item._id]})` : ""}`}</Text>
        <Text style={styles.productPrice}>Total Price: ₹{itemQuantities[item._id]*totalPrice[item._id]}</Text>
        <View style={styles.qtyContainer}>

        <TouchableOpacity style={styles.minusContainer} onPress={()=>removeItemHandler(item._id)}>
          <Text style={styles.decrease}>{itemQuantities[item._id]<2?<Icons name="delete" size={15} color="#f7f305" />:"-"}</Text>
        </TouchableOpacity>

        <Text style={styles.productQty}>{itemQuantities[item._id]>0?itemQuantities[item._id]:""}</Text>

        <TouchableOpacity style={[styles.increaseContainer]} onPress={()=>addItemHandler(item._id)}>
          <Text style={styles.decrease}>+</Text>
        </TouchableOpacity>
        </View>

        </View>
        
      </View>
    );
  }

    return (
    <View style={styles.container}>
     <View>
      <View style={styles.productNameContainer}>

        <Text style={styles.product}>
          My Cart Items {listCount>0? `(${listCount})`:""}
        </Text>

      </View>
      <View style={{height:"57%"}}>
      {cartItems &&(<FlatList data={cartItems.data} renderItem={({ item }) => {
      return renderCartItems({ item });
  }}  keyExtractor={item=>item?._id} />)}
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.paymentCaptionContainer}>
          <Text style={styles.paymentCaption}>Store Bill Details</Text>
        </View>
        <View style={styles.itemTotalContainer}>
        <Text style={styles.itemToalhead}>Item Total</Text>
        <Text style={styles.itemtotal}>₹{grandTotals}</Text>
        </View>
       <View style={styles.deliverChargeContainer}>
        <DeliveryChargeModal visible={modalVisible} closeModal={closeModal}/>
        <TouchableOpacity onPress={closeModal}>
       <Text style={[styles.itemToalhead,{color:"#09a5d9", textDecorationLine:'underline'}]}>Delivery Partner Fee:</Text></TouchableOpacity>
       <Text style={styles.itemtotal}> ₹40</Text>
       </View>
        <View style={styles.itemTotalContainer}>
        <Text style={styles.toPayHead}>To Pay:</Text>
        <Text style={styles.toPay}>₹{grandTotals+40}</Text>
        </View>
       
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Delivery Location')}>
        <View style={styles.locationContainer}>
        <Icon name="location" size={30} color="#f5dce3" />
          <Text style={styles.location}>ADD ADDRESS TO PROCEED</Text>
        </View>
      </TouchableOpacity>
     </View>
    </View>
  )
}

export default MyCart

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.SECONDARY_COLOR,
    marginBottom:20
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
    width:100,
    height:100,
    objectFit:'fill',
   
  },
  listItemContainer:{
    flexDirection:'row',
    justifyContent:"flex-start",
    alignItems:'center',
    margin:5,
    backgroundColor:colors.HEADER_CONTAINER
},
  itemContainer:{
    marginLeft:10,
    padding:5
  },
  productName:{
    fontSize:18,
    fontWeight:"700",
    color:"#e60b9d"
  },
  productMl:{
    fontSize:14,
    fontWeight:"700",
    color:"#f57905"
  },
  productPrice:{
    fontSize:16,
    fontWeight:"700",
    color:'#0a8004'
  },
  qtyContainer:{
    flexDirection:'row'
  },
  productQty:{
    fontSize:20,
    fontWeight:"700",
    marginHorizontal:10
  },
  minusContainer:{
    
    backgroundColor:"#eb3b6d",
    paddingBottom:5,
  width:35,
    alignItems:'center',
    justifyContent:'center'
    },
    decrease:{
      fontSize:20,
      fontWeight:'700',
      color:colors.WHITE,
      paddingTop:5,
      
   
    },
    increaseContainer:{
      width:35,
      paddingBottom:5,
      backgroundColor:"#368004",
      justifyContent:'center',
      alignItems:'center',
 
     
  },
//PAYMENT CONTAINER
paymentContainer:{
  backgroundColor:"#dcf4f5",
  marginTop:10,
  elevation:10,
  paddingBottom:10
},
  paymentCaptionContainer:{
alignItems:'center',

  },
  paymentCaption:{
fontSize:20,
fontWeight:'700',
marginTop:10,
color:colors.HEADER
  },
  itemTotalContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    marginTop:10
  },
  itemToalhead:{
    fontSize:15,
  color:'#039c69'
},
  itemtotal:{
    fontSize:16
  },
  deliverChargeContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
  },
  toPayHead:{
    fontSize:16,
    color:'#039c69',
    fontWeight:'700'
  },
  itemtotal:{
    fontSize:16,
    color:'#038a4f',
  },
  toPay:{
    fontSize:16,
    color:'#038a4f',
    fontWeight:'700'
  },
  locationContainer:{
    flexDirection:'row',
    backgroundColor:colors.MAIN_COLOR,
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  location:{
    fontSize:20,
    fontWeight:'700',
    color:colors.WHITE
  }

  
})