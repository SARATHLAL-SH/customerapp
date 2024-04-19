import { setUser } from "../../../Redux/slices/userDataSlice";
import LoginContext from "../../../Contexts/LoginPageContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utils/apiUtils";
import { useDispatch,useSelector } from "react-redux";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GetUser = () => {
  const styles = StyleSheet.create({})
const {mobileNumber} = useContext(LoginContext)
console.log("mobilenumber",mobileNumber)
const dispatch = useDispatch();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(API + 'get-register-user/' + mobileNumber);
      if (response && response.data) {
        const user = response.data;
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
  console.log("test");
}, [mobileNumber, dispatch]);
  return (
    <View>
      <Text>GetUser</Text>
    </View>
  )
}

export default GetUser

