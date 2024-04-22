import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../Globals/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native';

const SignoutPage = () => {
    const Navigation = useNavigation();
    const signOutHandler = async()=>{
        await AsyncStorage.removeItem('token');
        Navigation.navigate('Login')
    }
  return (
   
    <View style={styles.container}>
        <TouchableOpacity style={styles.btnContainer} onPress={signOutHandler}>
        <Text style={styles.btnText}>SignOut</Text>
        </TouchableOpacity>
      
    </View>
  )
}

export default SignoutPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnContainer:{
        backgroundColor:colors.ERROR,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
       paddingHorizontal:20,
       borderRadius:5
    },
    btnText:{
        fontWeight:'700',
        color:colors.WHITE
    }
})