import { Dimensions, StyleSheet, Text, TouchableOpacity, View,PanResponder, Animated } from 'react-native'
import React, { useEffect,useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/FontAwesome6'
import IconEx from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from '@react-navigation/native'
import { colors } from '../Globals/Styles'
import { useSafeAreaFrame } from 'react-native-safe-area-context'


const CartNotification =  ({itemCount}) => {
    const navigation = useNavigation();
    const [isMaximize,setIsMaximize] = useState(false);
    const [pan] = useState(new Animated.ValueXY());
   
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event([
            null,
            { dx: pan.x, dy: pan.y }
          ], { useNativeDriver: false } ),
          onPanResponderRelease: () => {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false
            }).start();
          }
        })
      ).current;
   
  return (
    <>
    {!isMaximize && (<View>
     <TouchableOpacity style={styles.subContainer} onPress={()=>navigation.navigate("My Cart")}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>Items available in Cart</Text>
        <View style={styles.countContainer}><Text style={styles.count} >{itemCount}</Text></View>
        </View>
        <Icon name={"shopping-cart"} color='#b5045f' size={30}/> 
     </TouchableOpacity >
        <View style={styles.minimize}>
        <TouchableOpacity>
        <Icons name={"minimize"} color='red' size={20} onPress={()=>setIsMaximize(!isMaximize)}/>
     </TouchableOpacity>
        </View>
       
    </View>)}
    <Animated.View
       style={{
        position: 'absolute',
        bottom: 10, // Adjust as needed
        right: 10, // Adjust as needed
        transform: [{ translateX: pan.x }, { translateY: pan.y }]
      }}
      {...panResponder.panHandlers}
    >
      {isMaximize && (
        <TouchableOpacity style={styles.subContainerMax} onPress={() => navigation.navigate("My Cart")}>
          <View style={styles.countContainerMax}>
            <Text style={styles.count}>{itemCount}</Text>
          </View>
          <TouchableOpacity style={styles.minimizeMax}>
            <IconEx name={"arrow-expand-all"} color='red' size={20} onPress={() => setIsMaximize(!isMaximize)} />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </Animated.View>
    </>
  )
}

export default CartNotification

const styles = StyleSheet.create({
    subContainer:{
        flexDirection:'row',
        backgroundColor:colors.GREEN,
        height:Dimensions.get('screen').width*0.10,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    text:{
       fontWeight:'700',
       fontSize:18,
       color:colors.SECONDARY_COLOR
    },
    countContainer:{width:25, 
        height:25,
         backgroundColor:"red",
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },

    count:{fontSize:18,
        fontWeight:'700',
        color:colors.WHITE
    },
    minimize:{
        position:'absolute',
        right:10,
        top:-25
    },
    subContainerMax:{
        position:'absolute',
        flexDirection:'row',
        backgroundColor:colors.GREEN,
        height:Dimensions.get('screen').width*0.10,
        width:Dimensions.get('screen').height*0.05,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
        borderRadius:50,
        bottom:10,
        right:10
    },
    countContainerMax:{
        width:25, 
        height:25,
         backgroundColor:"red",
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        
    },
    minimizeMax:{
        position:'absolute',
        right:10,
        top:-25
    },
})