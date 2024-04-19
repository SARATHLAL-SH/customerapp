import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OrderStatus = () => {
    const route = useRoute()
    const navigation =useNavigation()
  return (
    <View style={styles.container}>
        <Text style={[styles.statusText,{color:route.params.status ==='success'?'green':'red'}]}>{route.params.status ==='success'?'Paymemnt Success':'Payment Failed'}</Text>
      {route.params.status !=='success' &&(<TouchableOpacity style={styles.btnContaienr} onPress={()=>navigation.navigate('Delivery Location')}><Text style={styles.button}>BACK TO PAYMENT</Text></TouchableOpacity>)}
    </View>
  )
}

export default OrderStatus

const styles = StyleSheet.create({
   container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
   },

statusText:{
    fontSize:26,
    fontWeight:'700'
},
btnContaienr:{
    marginTop:20,
    borderWidth:1,
    borderRadius:5,
    padding:10,
    borderColor:'#4c6603'
},
button:{
    fontWeight:'700',
    color:'#6e9403'
}
})