import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { parameters } from '../Globals/Styles'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { colors } from '../Globals/Styles'

const Header = ({title, name}) => {
  return (
    <View style={styles.header}>
    <Icon name={name} type="font-awesome" color={colors.MAIN_COLOR} fontSize={40} />
    <Text style={styles.headerText}>{title}</Text>
  </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.SECONDARY_COLOR,
        flexDirection: 'row',
        height: parameters.headerHeight,
        alignItems: 'center',
        paddingHorizontal: 8,
        width: '100%',
      
      },
      headerText: {
        color: colors.headerText,
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 30,
        color:colors.MAIN_COLOR
      },
})