import { StyleSheet, Text, View,TextInput,Dimensions, } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { colors } from '../Globals/Styles';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import LoginContext from '../Contexts/LoginPageContext';
import SearchScreen from '../screens/UserScreens/SearchScreen';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';


const SearchBar = ({locationName}) => {
    const navigation = useNavigation()
    const {searchText, setSearchText} = useContext(LoginContext)
  

    
  return (
    <View style={styles.container}>
      
      <TextInput style={styles.input}
       placeholder='Search' onChangeText={text=>setSearchText(text)}
       value={searchText}  placeholderTextColor={colors.MAIN_COLOR} />
       
       <View style={styles.locationContainer}>
        <Icon name="location-pin" size={25} color={colors.MAIN_COLOR} />
        <Text style={styles.location}>{locationName}</Text>
       </View>

    </View>
   
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.SECONDARY_COLOR,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: colors.MAIN_COLOR,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5,
        paddingLeft: 10,
        color:colors.BLACK,
        fontWeight:'700',
        fontSize:16,
      },
      locationContainer:{
        flexDirection:'colum',
        alignItems:'center',
        justifyContent:'center',
        width:90,
        height:35,
        backgroundColor:colors.WHITE,
        borderRadius:20
      },
      location:{
       fontSize:Dimensions.get('window').width*0.023,
       overflow:'hidden',
       textAlign:'center',
       color:'black',
       paddingBottom:10,
       paddingHorizontal:5,
       fontWeight:'700'
      }
})