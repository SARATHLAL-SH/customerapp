import axios from "axios";
import { API } from "../utils/apiUtils";
import { useEffect, useState } from "react";
import { View, Text } from 'react-native'
import React from 'react'

const GetAllProducts = () => {
    const [productData,setProductData] = useState([]);
   

   useEffect(()=>{
    const getAllProducts = async()=>{
        try{
            const response = await axios.get(API+"get-all-wine-subcategories");
            if(response.data){
            setProductData(response.data);
            }
            else{
            console.log("data not available")
            }
        } catch(error){
            console.log(error)
        }
    }
    getAllProducts();
    },[])

  return productData
}

export default GetAllProducts
