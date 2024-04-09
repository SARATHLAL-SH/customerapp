import { StyleSheet, Modal, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../Globals/Styles'
import Icon from 'react-native-vector-icons/Ionicons';

const DeliveryChargeModal = ({visible,closeModal}) => {
  return (
    <Modal animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={closeModal}
  >
    <View style={styles.container}>
     <View style={styles.stdHeadContainer}>
        <Text style={styles.deliveryCaption}>Delivery Partner Fee BreakUp</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
        <Icon name="close-circle" size={30} color="red" />
        </TouchableOpacity>
       
     </View>
     <View style={styles.stdFeeContainer}>
        <Text style={styles.stdFeeHead}>Standard Fee</Text>
        <Text style={styles.stdFeeHead}>₹75</Text>
     </View>
     <View>
        <Text style={styles.stdFeelist}> - ₹75 For Orders Up To ₹750</Text>
        <Text style={styles.stdFeelist}> - ₹100 For Orders Between ₹750 To ₹1000</Text>
        <Text style={styles.stdFeelist}> - ₹125 For Orders Between ₹1000 To ₹1500</Text>
        <Text style={styles.stdFeelist}> - ₹150 For Orders Between ₹1500 To ₹2000</Text>
        <Text style={styles.stdFeelist}> - ₹150 For Orders Between ₹2000 To ₹2500</Text>
        <Text style={styles.stdFeelist}> - ₹150 For Orders Between ₹2500 To ₹4000</Text>
        <Text style={styles.stdFeelist}> - ₹300 For Orders Above ₹4000 </Text>
       
     </View>
     <View style={styles.stdFeeContainer}>
        <Text style={styles.stdFeeHead}>Distance Fee</Text>
        <Text style={styles.stdFeeHead}>₹135</Text>
     </View>
     <View>
        <Text style={styles.distanceDesc}>Addtional Distance Fee Of ₹15/Km After The First 4Km</Text>
     </View>
    </View>
    </Modal>
  )
}

export default DeliveryChargeModal

const styles = StyleSheet.create({
    container:{
    height:'36%',
    width:"85%",
    backgroundColor: colors.WHITE,
    position:'absolute',
    top:"45%",
    left:'4%',
     borderRadius:10,
     elevation:10, 
     paddingVertical:5
    },
    closeBtn:{
        position:'absolute',
        right:0
    },
    stdHeadContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    deliveryCaption:{
        fontSize:16,
        fontWeight:'700',
        color:'red'
    },
    stdFeeContainer:{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent:'space-between'
    },
    stdFeeHead:{
        color:"#0894a3",
        marginTop:10
    },
    stdFeelistContainer:{},
    stdFeelist:{
        color:"#0894a3", 
        marginLeft:20,
       
    },
    distanceContainer:{
        flexDirection:'row',
        marginHorizontal:10
    },
    distanceDesc:{
        marginLeft:10,
        color:'red',
        marginTop:5
    }

    
})