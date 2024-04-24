import { StyleSheet, Text, View,FlatList,ScrollView,Image, Dimensions } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { API } from '../../utils/apiUtils'
import { colors } from '../../Globals/Styles'
import axios from 'axios'
import * as geolib from 'geolib'
import {Navigation,useNavigation,useRoute} from '@react-navigation/native'
import RazorpayCheckout from 'react-native-razorpay';
import LoginContext from '../../Contexts/LoginPageContext'


const DeliveryLocation = () => {
    const [storedAddress,setStoredAddress] = useState()
    const [message,setMessage] = useState();
    const [Address,setAddress] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [markersList,setMarkersList] = useState([{"id": "660e52cd70695d780d57c87d", 
    "latitude": 22.5726, "longitude": 88.3639, "title": "AA rcb "}])
    const [location, setLocation] = useState({latitude: 22.5726,longitude:88.3639});
    const [flattenedData,setFlattenedData] = useState()
    const [cartItems,setCartItems] = useState();
    const [mergedDatas,setMergedDatas] = useState()
    const {mobileNumber,setListCount} = useContext(LoginContext)
    const navigation =useNavigation()
    const shopid =[]
    const[oredersId,setOrdersId] = useState();
    const cartProduct =[]

    useEffect(()=>{
      checkAddress();
      AddressSelector('home');
      shopLocation();
      fetchCartDetails()
  },[])

    const messageHandler = (msg) =>{
        setMessage(msg);
        setTimeout(()=>{
        setMessage("")
        },3000)
       }

    console.log("storedAddress",storedAddress)
      const AddressSelector = async (type) => {
        const addressesOfType = storedAddress?.filter(item => item.localAddress.locationType === type);
        if (!addressesOfType || addressesOfType.length === 0) {
        return;
        }

      const lastAddress = addressesOfType[addressesOfType.length - 1];
        setAddress(lastAddress);
        location.latitude = lastAddress.localAddress.latitude;
        location.longitude = lastAddress.localAddress.lognitude;
        shopLocation();
        setSelectedOption(type);
    };

      const fetchCartDetails = async()=>{
        try{
          const response = await  axios.get(API+"get-add-cart-all");
          if(response){
           setCartItems(response.data.data)
          }
          else{
          console.log("unable to fetch data ")
          }
        } catch(error){
          console.log("Error inside delivery Locataion",error)
        }
      }

      const checkAddress =async() =>{
        try{
          const response = await axios.get(API+'get-local-and-permanent-address');
          if(response.data)
          {
            setStoredAddress(response.data.data)   
           }
          else{
            console.log('no address found');
              }
        } catch(error){
          console.log("error when try to fetch Address detail from setPermenentAddrs", error.message)
          messageHandler(error.message)
        }
        }

      const shopLocation= async()=>{
          try{
          const response = await axios.get(API+"get-all-shoplocation");
          if(response.data){
          const locations = response.data
          const extractMarkers = locations.map(item => {
          const product = item.availableCategory?.map(product => ({
                productId: product._id,
                productName: product.name
                    }));
                return {
                latitude: item.latitude,
                longitude: item.longitude,
                title: item.ShopName,
                id: item._id,
                product: product
                };
            });
    
        const flattenedData = extractMarkers.flatMap(({ id, latitude, longitude, product, title }) =>
            product.flatMap(({ productId, productName }) =>
           ({ id, latitude, longitude, productId, productName, title })
           )
          );

            setFlattenedData(flattenedData);
            const markersWithDistance = extractMarkers.map((item) => {
            const distanceInMeters = geolib.getDistance(location, { latitude: item.latitude, longitude: item.longitude });
            const distanceInKilometers = (distanceInMeters / 1000).toFixed(1);
            return { ...item, distance: parseFloat(distanceInKilometers) };
            });
              markersWithDistance.sort((a, b) => a.distance - b.distance);
            setMarkersList(markersWithDistance);
            }
            else{
            console.log("Shop details not available in  Map Component")
           }
           }catch(error){
            console.log("error in delivery location ",error)
            }
          }
       
    console.log("address",Address)
    const shopNames = [];
    const shopAndProducts = [];
 console.log("cartItems", cartItems)
    cartItems?.forEach(cartItem => {
      if (cartItem?.cart && flattenedData) {
      const foundItem = flattenedData.find(item => item.productId === cartItem.cart._id);
      if (foundItem) {
      shopAndProducts?.push({
      shopName: foundItem.title,
      product: {
        productId: foundItem.productId,
        productName: foundItem.productName,
        shopId: foundItem.id,
        cartProduct:foundItem.productId
      }
      });
      }
      } else {
      console.log('cartItem.cart is null or flattenedData is null:', cartItem);
      }
  });
 
const distances = [];

shopAndProducts?.forEach(shop => {
        const existingShop = distances.find(item => item.shopName === shop.shopName);
       if (!existingShop) {
        const shopEntry = markersList?.find(entry => entry.title === shop.shopName);
        
        if (shopEntry) {
            distances.push({
            distance: shopEntry.distance,
            shopName: shop.shopName,
            shopId:shopEntry.id,
             });
         shopid.push (shopEntry.id);   
        }
    }
});

const mergedDataofCartItems = cartItems?.map(cartItem => {
    if (cartItem?.cart && shopAndProducts) {
      const matchingProduct = shopAndProducts.find(shopProduct => shopProduct.product.productId === cartItem.cart._id);
      if (matchingProduct) {
       return { ...cartItem, ...matchingProduct };
      }
  } else {
    console.log('mergedData Invalid cartItem or shopAndProducts is null:', cartItem);
    }
  return cartItem;
});

const mergedData = shopAndProducts?.map(shopName => {
const matchingDistance = distances?.find(distance => distance.shopId === shopName.product.shopId);
  return {
    ...shopName,
    distance: matchingDistance ? matchingDistance.distance : null
  };
});

const mergeAlldata = mergedDataofCartItems?.map(item => {
    if (item.product?.shopId && distances) {
      const matchingDistance = distances.find(distance => distance.shopId === item.product.shopId);
      if (matchingDistance) {
       return { ...item, distance: matchingDistance.distance };
      }
  } else {
         console.log('mergeAllData Invalid item or distances is null:', item);
       }
  return item;
});


const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View>
    <Text style={styles.itemText}>Product Name: {item?.cart?.name}</Text>
    <Text style={styles.itemText}>Quantity: {item?.quantity}</Text>
    <Text style={styles.itemText}>Price: {item?.cart?.price}</Text>
    <Text style={styles.itemText}>{item?.shopName ? `Wine Shop: ${item.shopName}` : 'This Item not available in Nearest Shops'}</Text>
    <Text style={styles.itemText}>Distance: {item?.distance}</Text>
  
    </View>
    <View>
    {<Image source={{uri:API+"get/imageswinesubcategories/"+item?.cart?.images}} style={styles.shopImage}/>}
    </View>
  </View>
);

const totalPriceAndDistance = mergeAlldata?.filter(item => item?.shopName)?.map(item => {
    const totalPrice = item.cart.price * item.quantity;
    const shopDistance = distances?.find(distance => distance?.shopId === item?.product?.shopId);
    const distance = shopDistance ? shopDistance?.distance : 0;
    return { totalPrice, distance };
  });

// Separate items by shop
const itemsByShop = totalPriceAndDistance?.reduce((acc, curr) => {
  acc[curr.distance] = [...(acc[curr?.distance] || []), curr?.totalPrice];
  return acc;
}, {});

// Calculate delivery charge for each shop
const deliveryCharges = itemsByShop ? Object.keys(itemsByShop)?.map(distance => {
  const km = parseInt(distance);
  let deliveryCharge = 0;
  if (km > 5) {
    deliveryCharge = (km - 5) * 5; // ₹5 per km after 5 km
  }
  return deliveryCharge;
}): [];

// Calculate total price sum for each shop
const totalPriceSums = itemsByShop ?Object.values(itemsByShop)?.map(totalPrices => totalPrices?.reduce((acc, curr) => acc + curr, 0)):[];

// Calculate total service charge for all shops
const totalPriceSum = totalPriceSums?.reduce((acc, curr) => acc + curr, 0);
let serviceCharge = 0;
if (totalPriceSum <= 750) {
  serviceCharge = 75;
} else if (totalPriceSum <= 1000) {
  serviceCharge = 100;
} else if (totalPriceSum <= 1500) {
  serviceCharge = 125;
} else if (totalPriceSum <= 2000) {
  serviceCharge = 150;
} else if (totalPriceSum <= 2500) {
  serviceCharge = 150;
} else if (totalPriceSum <= 4000) {
  serviceCharge = 150;
} else {
  serviceCharge = 300;
}
const productId = cartItems?.map(item => item._id);
console.log("CARTiTEM",productId)
const passingData = async (ordrId) => {
  console.log("orderId in passing data",ordrId)
  try {
   const response = await axios.post(API + 'create-all-customer-product', {
      totalPriceSum: totalPriceSum,
      deliveryCharges: deliveryCharges,
      serviceCharges: serviceCharge,
      grandTotalPrice: grandTotal,
      customerAddress: Address?._id,
      productDetails: productId,
      shopDetails: shopid,
      orderId:ordrId
    });
  
    if (response.data) {
      console.log('response for passing data', response.data);
    }
    else{
      console.log('unable to add data in to database')
    }
    const cartDelete = await axios.delete(API+'delete-all-cart-items');
    if(cartDelete.data){
    console.log('deleted successfull');
    setListCount(0);
    }
    else{
     console.log("error while deleting cart Items")
    }
  } catch (error) {
    console.log('error in deliveryLocation merge Data', error.message);
  }
};
// Calculate grand total for all shops
const grandTotal = totalPriceSum + deliveryCharges.reduce((acc, curr) => acc + curr, 0) + serviceCharge;

console.log('Total Price Sum:', totalPriceSum);
console.log('Delivery Charges:', deliveryCharges);
console.log('Service Charge:', serviceCharge);
console.log('Grand Total:', grandTotal);
const razorpayment =()=>{
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: 'rzp_test_n0XgF5IDRmHwfd',
    amount: grandTotal*100,
    name: 'Sura App',
    order_id: '',//Replace this with an order_id created using Orders API.
    prefill: {
      email: Address?.customerPermanentAddress?.email,
      contact: Address?.customerPermanentAddress?.mobileNumber,
      name: Address?.customerPermanentAddress?.username
    },
    theme: {color: colors.HEADER_CONTAINER}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
    navigation.navigate('Order Status',{status:'success',
    paymentId:data.razorpay_payment_id})
    setOrdersId(data.razorpay_payment_id)
    passingData(data.razorpay_payment_id);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
    navigation.navigate('Order Status',{status:'failed',
    })

  });
}
  return (
    <View style={{flex:1}}>
        <View style={styles.deliveryAddressheaderContainer}>
            <Text style={styles.deliveryAddressheader}>Selct Your Delivery Address</Text>
        </View>
      
      <View style={styles.btnContainer}>
       
        <TouchableOpacity style={[styles.locationBtn, selectedOption === 'home' && styles.selectedBtn,]} onPress={()=>AddressSelector('home')}>
            <Text style={styles.locationBtntext}>Home</Text> 
        </TouchableOpacity >
        <TouchableOpacity style={[styles.locationBtn,selectedOption === 'work' && styles.selectedBtn,]} onPress={()=>AddressSelector('work')}>
            <Text style={styles.locationBtntext}>Work</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={[styles.locationBtn,selectedOption === 'other' && styles.selectedBtn,]} onPress={()=>AddressSelector('other')}>
            <Text style={styles.locationBtntext}>Other</Text> 
        </TouchableOpacity>
      </View>
    
      <View style={styles.addressWraper}>
        <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Name:</Text>
            <Text style={styles.addressTextRight}>{Address?.customerPermanentAddress?.username}</Text>
            </View>
       
        <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Address</Text>
            <Text style={styles.addressTextRight}>{Address?.localAddress?.houseFlatBlockNo}</Text>
          </View>
        
            <View style={styles.addressContainer}>
            <Text style={styles.addressText}></Text>
            <Text style={styles.addressTextRight}>{Address?.localAddress?.apartmentRoadArea}</Text>
            </View>
       
       
        <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Land Mark:</Text>
            <Text style={styles.addressTextRight}>{Address?.localAddress?.landmark}</Text>
            </View>
        
        <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Mobile:</Text>
            <Text style={styles.addressTextRight}>{Address?.customerPermanentAddress?.mobileNumber}</Text>
            </View>
      
            </View>
       <View style={{marginTop:5, height:Dimensions.get('screen').height*0.35}}>
      
        <FlatList
      data={mergeAlldata}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
 
       </View> 
       <View style={styles.GrandTotalWraper}>
        <View style={styles.GrandtotalContainer}>
          <Text style={styles.addressText}>Total Price Sum:</Text>
          <Text style={styles.paymentText}>₹{totalPriceSum}</Text>
        </View>
        <View style={styles.GrandtotalContainer}>
          <Text style={styles.addressText}>Delivery Charges:</Text>
          <Text style={styles.deliveryText}>₹{deliveryCharges.join(', ₹')}</Text>
        </View>
        <View style={styles.GrandtotalContainer}>
          <Text style={styles.addressText}>Service Charge:</Text>
          <Text style={styles.deliveryText}>₹{serviceCharge}</Text>
        </View>
        <View style={styles.GrandtotalContainer}>
          <Text style={styles.addressText}>Grand Total:</Text>
          <Text style={styles.grndtotalText}>₹{grandTotal}</Text>
        </View>
       </View>
    <View style={styles.paynowContainer}>
      <TouchableOpacity style={styles.paynowBtn} onPress={
        ()=>razorpayment()
                }>
        <Text style={styles.paynowText}>
          PAY NOW ₹{grandTotal}
        </Text>
      </TouchableOpacity>
    </View>  
    
    </View>
  )
}

export default DeliveryLocation

const styles = StyleSheet.create({
    deliveryAddressheaderContainer:{
       justifyContent:'center' ,
       alignItems:'center',
       marginVertical:5,
       paddingVertical:5,
       backgroundColor:colors.HEADER_CONTAINER,
       elevation:5
    },
    deliveryAddressheader:{
        fontSize:20,
        fontWeight:'700',
        color:colors.HEADER
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10
    },
    locationBtn:{
        backgroundColor:colors.MAIN_COLOR,
        padding:5,
        marginHorizontal:10
    },
    locationBtntext:{
      color:colors.WHITE,
      fontWeight:'700'
    },
    addressWraper:{
        marginVertical:10,
        backgroundColor:colors.HEADER_CONTAINER,
        borderWidth:0.5,
        marginHorizontal:10,
       borderColor:colors.MAIN_COLOR,
        elevation:10,
        borderRadius:5
    },
    addressContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:5,
        borderBottomWidth:0.2,
        borderBottomColor:colors.GREY

    },
    addressText:{
        flex: 1,
        marginVertical:3,
        textAlign:'left',
        color:colors.MAIN_COLOR,
        fontWeight:'600'
    },
    addressTextRight:{
      flex: 1,
      marginVertical:3,
      textAlign:'left',
      color:colors.MAIN_COLOR,
      fontWeight:'700',
      fontSize:14,
    },
    selectedBtn: {
        backgroundColor: colors.GREEN,
      },
      itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor:colors.HEADER_CONTAINER,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        elevation:5,
        
      },
      itemText: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight:'700',
        color:colors.MAIN_COLOR
      },
      shopImage:{
        width:80,
        height:80,
        objectFit:'fill',
       
      },
      GrandTotalWraper:{
        backgroundColor:"#dcf4f5",
      },
      GrandtotalContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
       
      },
      paynowContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
      },
      paynowBtn:{
        backgroundColor:colors.GREEN,
        paddingHorizontal:10,
        paddingVertical:5
      },
      paynowText:{
        fontSize:14,
        fontWeight:'700',
        color:colors.WHITE
      },
      paymentText:{
        fontWeight:14,
        fontWeight:'700',
        color:'green'
      },
      deliveryText:{
        fontWeight:14,
        fontWeight:'700',
        color:'red'
      },
      grndtotalText:{
        fontWeight:16,
        fontWeight:'700',
        color:'green'
      },
      }
)