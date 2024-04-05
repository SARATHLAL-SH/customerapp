import { StyleSheet, Text, View } from 'react-native'
import React,{createContext, useState} from 'react'

const LoginContext = createContext();
export const LoginPageContext = ({children}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    
    const [userLocationCoords,setuserLocationCoords] =useState({})
  return (
   <LoginContext.Provider value={{
    mobileNumber,
    setMobileNumber,userLocationCoords,setuserLocationCoords}}>
    {children}
   </LoginContext.Provider>
  )
}

export default LoginContext

