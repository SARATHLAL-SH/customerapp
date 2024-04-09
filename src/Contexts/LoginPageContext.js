import { StyleSheet, Text, View } from 'react-native'
import React,{createContext, useEffect, useState} from 'react'
import axios from 'axios';
import { API } from '../utils/apiUtils';

const LoginContext = createContext();
export const LoginPageContext = ({children}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [subCategory,setSubCategory] = useState();
    const [apiError,setApiError] = useState()
    const [searchText, setSearchText] = useState('');
    const [userLocationCoords,setuserLocationCoords] =useState({})
    const [listCount,setListCount] = useState(0)
    
    const [isAdhaar, setIsAdhaar] = useState(false);
    const [isPanCard, setIsPanCard] = useState(false);
    const [loginToken, setLoginToken] = useState('');
    const [getUserData, setGetUserData] = useState();
    const[status,setStatus] = useState();

    const getAllProducts = async()=>{
      try{
          const response = await axios.get(API+"get-all-wine-subcategories");
          if(response.data){
          setSubCategory(response.data);
          }
          else{
          console.log("data not available")
          }
      } catch(error){
          console.log(error)
       setApiError(error)
      }
  }
    
  useEffect(()=>{
  getAllProducts();
  },[setSearchText])
  return (
   <LoginContext.Provider value={{
    mobileNumber,
    setMobileNumber,userLocationCoords,setuserLocationCoords,subCategory,apiError,searchText, setSearchText,
    listCount,setListCount,isAdhaar, setIsAdhaar,isPanCard, setIsPanCard,loginToken, setLoginToken,getUserData, setGetUserData,status,setStatus}}>
    {children}
   </LoginContext.Provider>
  )
 
  

}

export default LoginContext

