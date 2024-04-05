import { View,TouchableOpacity,Image,Text,StyleSheet } from "react-native"

export const renderProduct =({item})=>(
<View>
    {console.log("items",item)}
    <Text>Render product</Text>
    <TouchableOpacity style={{justifyContent:'center',alignItems:'center', margin:10}}>
            <Image source={{uri:API+"get/image/"+item.image}} style={styles.shopImage}/>
            <Text style={{fontWeight:'700',marginTop:5, color:'red',fontSize:16}}>{item.name}</Text>
           
          </TouchableOpacity>
</View>
)
 const styles = StyleSheet.create({
    shopImage:{
        width:100,
        height:100
    } 
 })