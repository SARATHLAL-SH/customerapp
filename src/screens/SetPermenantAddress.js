import { StyleSheet, Text, TextInput, View,KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../Contexts/LoginPageContext'
import { colors } from '../Globals/Styles'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Fontisto'
import { API } from '../utils/apiUtils'
import { fetchUser } from './AuthScreens/Utils/navigationutils'


const SetPermenantAddress = ({latitude,longitude}) => {
    const [locationName,setLocationName] = useState("Select Your Location")
    const {userLocationCoords,mobileNumber} = useContext(LoginContext);
    const [locationAddress,setLocationAddress] = useState("Tap map to set your Location");
    const [isCurrentLocation,setIscurrentLocation] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const { latitude: currentLatitude, longitude: currnetLongitude } = userLocationCoords;
    const [focusedField, setFocusedField] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userInfo, setUserInfo] =useState();
    const [isHomeDisabled,setIsHomeDisabled] = useState(false)
    const [isWorkDisabled,setIsWorkDisabled] = useState(false)
    const [message,setMessage] = useState();
    const [storedAddress,setStoredAddress] = useState()
         
    const [inputValues, setInputValues] = useState({
      houseFlatBlockNo: '',
      apartmentRoadArea: '',
      pinCode:0,
      landmark: '',
      description: '',
    });

   inputValues.lognitude = isCurrentLocation ? currnetLongitude : longitude;
   inputValues.latitude = isCurrentLocation ? currentLatitude : latitude;

const messageHandler = (msg) =>{
    setMessage(msg);
    setTimeout(()=>{
    setMessage("")
    },3000)
   }

    useEffect(()=>{
    checkAddress();
    const isHomeAvailable = storedAddress?.some(item => item.localAddress.locationType === 'home');
    if (isHomeAvailable) {
      setIsHomeDisabled(true)
    } 
    const isWorkAvailable = storedAddress?.some(item => item.localAddress.locationType === 'work');
    if (isWorkAvailable) {
      setIsWorkDisabled(true)
    } 
  },[])
const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };

const checkAddress =async() =>{
    try{
      const response = await axios.get(API+'get-local-and-permanent-address', {
      });
      if(response.data)
      {
        
        setStoredAddress(response.data.data)       
      }
      else{
        console.log('no address found');
        // messageHandler('no address found')
      }
    } catch(error){
      console.log("error when try to fetch Address detail from setPermenentAddrs", error.message)
      messageHandler(error.message)
    }
    }

const handleSubmit = async() => {
  
  if (!inputValues.houseFlatBlockNo || !inputValues.apartmentRoadArea || !inputValues.pinCode || !inputValues.landmark ) {
          
    messageHandler('Please fill in all required fields.')
    return;
  }
   else if (!inputValues.latitude || !inputValues.lognitude) {
    messageHandler('Select Location!')
  }
     else if (selectedOption) {
       
      inputValues.locationType = selectedOption;
      
      try{
        const response = await axios.post(API+'add-local-address', {
          localAddress: inputValues,
          customerPermanentAddress: userInfo?.users[0]?._id
        });
        console.log('Address added successfully:', response.data);
      }catch(error){
        console.log("setpermentAddress add adress error",error.message)
      }
       
      } else {
        messageHandler("Please select an option before submitting.")
        alert("Please select an option before submitting.");
      }
    };

const fetchUserData = async ()=>{
    try{
      const userData = await fetchUser();
      console.log("userInfo", userData)
      const response = await axios.get(API+'get-register-user/' + userData)
      if(response.data){
      setUserInfo(response.data)
      console.log("fetchuserInfo", response.data)
      }
      else{
        console.log("no data when fetching fetch user function in setPermentAddrss")
      }
    } catch(error){
      console.log("error when try to fetch userinfo detail from setPermenentAddrs", error)
      messageHandler(error.message)
    }
    }
console.log("userinfor",userInfo)

const locationReader = async()=>{
     try{
     if(latitude && longitude) {const response = await axios.get( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        isCurrentLocation ? currentLatitude : latitude
      },${isCurrentLocation ? currnetLongitude : longitude}&key=AIzaSyCR6m47owJG21hUsWuE3FbMR0sJS1NMO_Q`)
      const  data = await response.data;
      const locationAddress = data.results[0].formatted_address.split(',')
     setLocationAddress(locationAddress);
      firstAddress = locationAddress[1].trim(" ");
      setLocationName(firstAddress)}
      else{
        console.log("error in SetPermenantAddress location not availbale" )
      }
    } 
  catch(error){
      console.log("locationReader function error in SetPermenantAddress",error)
      messageHandler(error.message)
  }
 }

useEffect(()=>{
    locationReader();
    fetchUserData();
    checkAddress()
},[locationName,latitude,isCurrentLocation])
   

const handleFocus = (fieldName) => {
  setFocusedField(fieldName);
};

const handleBlur = () => {
  setFocusedField(null);
};

const handleChangeText = (fieldName, text) => {
  setInputValues({ ...inputValues, [fieldName]: text });
};
console.log("input values",inputValues)
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} 
      style={styles.container}
    >

    <View>
    </View>
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>A detailed address will help our Delivery Partner reach your doorstep easly</Text>
    </View>
    <TouchableOpacity style={styles.checkboxContainer} onPress={()=>setIscurrentLocation(!isCurrentLocation)}>
      <Icon name={`${isCurrentLocation?'checkbox-active':'checkbox-passive'}`} fontSize={30} color='red'/>
      <Text style={styles.checkBoxText}>Use Current Location</Text>
    </TouchableOpacity>
    <View style={{marginTop:5}}><Text style={{fontWeight:'700', color:colors.BLACK}}>OR</Text></View>
    <View style={{marginTop:5}}><Text style={{ color:colors.BLACK}}>Tap MAP to set your Location</Text></View>
    <View>
      <Text style={styles.locationName}>{locationName}</Text>
      <Text style={styles.locationAddress}>{locationAddress}</Text>
      <TextInput placeholder='HOUSE/FLAT/BLOCK NO.' style={[styles.textInput, focusedField === 'houseFlatBlockNo' && styles.focusedTextInput]}  onFocus={() => handleFocus('houseFlatBlockNo')}
        onBlur={handleBlur}  onChangeText={(text) => handleChangeText('houseFlatBlockNo', text)}/>
      <TextInput placeholder='ROAD/ AREA' style={[styles.textInput, focusedField === 'apartmentRoadArea'&&  styles.focusedTextInput]} onFocus={() => handleFocus('apartmentRoadArea')}
        onBlur={handleBlur}  onChangeText={(text) => handleChangeText('apartmentRoadArea', text)}/>
          <TextInput placeholder='PINCODE' keyboardType='numeric' style={[styles.textInput, focusedField === 'pinCode'&&  styles.focusedTextInput]} onFocus={() => handleFocus('pinCode')}
        onBlur={handleBlur}  onChangeText={(text) => handleChangeText('pinCode', text)}/>
      <TextInput placeholder='LAND MARK' style={[styles.textInput, focusedField === 'landmark' && styles.focusedTextInput]} onFocus={() => handleFocus('landmark')}
        onBlur={handleBlur}   onChangeText={(text) => handleChangeText('landmark', text)}/>
      <TextInput placeholder='DESCRIPTION' style={[styles.textInput, focusedField === 'description' && styles.focusedTextInput]} onFocus={() => handleFocus('description')}
        onBlur={handleBlur}  onChangeText={(text) => handleChangeText('description', text)}/>
    </View>
    <View style={styles.locationBtnContainer}>
        <TouchableOpacity
          style={[styles.btnContainer, selectedOption === 'home' && styles.selectedBtn,  {backgroundColor:isHomeDisabled ? colors.GREY: colors.HEADER_CONTAINER}, selectedOption === 'home' && styles.selectedBtn]}
          onPress={() => handleOptionSelect('home')} disabled={isHomeDisabled}>
          <Text style={[styles.btnText, {color:isHomeDisabled ? colors.WHITE :colors.MAIN_COLOR} ]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnContainer,  {backgroundColor:isWorkDisabled ? colors.GREY: colors.HEADER_CONTAINER}, selectedOption === 'work' && styles.selectedBtn]}
          onPress={() => handleOptionSelect('work')} disabled={isWorkDisabled}>
          <Text style={[styles.btnText,{color:isWorkDisabled ? colors.WHITE :colors.MAIN_COLOR}]}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnContainer, selectedOption === 'other' && styles.selectedBtn]}
          onPress={() => handleOptionSelect('other')}>
          <Text style={styles.btnText}>Other</Text>
        </TouchableOpacity>
     </View>
     <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{message}</Text>
     </View>
     <View style={styles.submitBtnContainer}>
        <TouchableOpacity style={[styles.submitBtn, !selectedOption && styles.disabledSubmitBtn]} onPress={handleSubmit} disabled={!selectedOption}>
         <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
     </View>
    </KeyboardAvoidingView>
  )
}

export default SetPermenantAddress

const styles = StyleSheet.create({
    container:{flex:1,
      backgroundColor:colors.SECONDARY_COLOR, 
      padding:10,paddingBottom:50},
      descriptionContainer:{
      borderWidth:1,
      borderColor:colors.MAIN_COLOR,padding:5
    },
    description:{
      color:colors.MAIN_COLOR
    },
    checkboxContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:10
    },
      checkBoxText:{
      marginLeft:10,
      color:'green'
    },
    locationName:{
      fontWeight:'700',
      fontSize:20,
      marginVertical:10,
      color:colors.BLACK
    },
    locationAddress:{
      fontWeight:'700',
      fontSize:15,
      marginBottom:10,
      color:colors.GREY
    },textInput:{
      borderBottomWidth:1,
      borderBottomColor:colors.GREY,
      padding:0,
      marginBottom:15,
      color:colors.BLACK
    },
    focusedTextInput: {
      borderColor: colors.GREEN, 
    },
    locationBtnContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10
    },
    btnContainer:{
      width:60,
      backgroundColor:colors.HEADER_CONTAINER,
      marginHorizontal:10,
      padding:5, justifyContent:'center',
      alignItems:'center'
    },
    selectedBtn: {
      backgroundColor: colors.GREEN,
    },
    btnText:{
      fontWeight:'700',
      color:colors.MAIN_COLOR
    },
    messageContainer:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:10
    },
    messageText:{
      fontSize:15,
      fontWeight:'700',
      color:colors.ERROR
    },
    submitBtnContainer:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
    },
    submitBtn:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.GREEN,
      padding:5,
      width:180,
      borderRadius:5
    },
    submitBtnText:{
      fontWeight:'700',
      fontSize:17,
      color:colors.WHITE
    }
})