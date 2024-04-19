import axios from "axios";
import { API } from "./apiUtils";
export  const getcartCount = async () =>{
    try{
    const response = await axios.get(API+"get-add-cart");
        if(response.data){
        console.log("getCartCount from navigation",response.data.data.length)
        // return response.data.length
        }
        else{
        console.log("no data")
      }
       }catch(error){
       console.log("error LoginPageContext",error)
       }}