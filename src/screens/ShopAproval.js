import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ShopAproval = () => {
  return (
    <View>
        <View>
        <Text>You are Waiting for Shop Approval.</Text>
        <Text>If your order is not accepted by the selected shop, it will be forwarded to the next available shop.</Text>
        <Text>Delivery charges may vary based on distance.</Text>
        </View>
      
    </View>
  )
}

export default ShopAproval

const styles = StyleSheet.create({})