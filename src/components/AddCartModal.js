import {Modal, StyleSheet, Text, View,TouchableOpacity  } from 'react-native'
import React,{ useState } from 'react'

const AddCartModal = ({ visible, closeModal,buyMore,data,count }) => {
   
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        
          <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'700',color:'white', fontSize:20, marginTop:10}}>{data.name} Added  in Cart</Text>
         
          </View>
          <TouchableOpacity style={styles.button} onPress={buyMore}>
            <Text style={styles.closeButton}>Buy More</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.closeButton}>Move to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </Modal>
    
  )
}

export default AddCartModal

const styles = StyleSheet.create({ modalContainer: {
    height:"25%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    position:'absolute',
    width:"100%",
    bottom:0 
  },
  modalContent: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom:"30%",
    height:"70%"
   
  },
  button:{
    width:150,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center', 
    marginTop:20
},
  closeButton: {
    paddingVertical:5,
    fontWeight:'700',
    color: 'white',
  },})