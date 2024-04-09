import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { colors } from '../../../Globals/Styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginContext from '../../../Contexts/LoginPageContext';

const IdSelector = () => {
    const {isAdhaar,setIsAdhaar,setIsPanCard,isPanCard} =useContext(LoginContext);
  return (
    <View style={{height:'100%',width:'100%', backgroundColor:colors.SECONDARY_COLOR}}>
      <View style={styles.selectIdContainer}>
        <TouchableOpacity style={styles.idContainer} onPress={()=>setIsAdhaar(!isAdhaar)}>
          <Text style={styles.idCaption}>Aadhaar Card</Text>
          <Icon
            name="id-card"
            size={30}
            color="white"
           
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.idContainer} onPress={()=>setIsPanCard(!isPanCard)}>
          <Text style={styles.idCaption}>Pan Card</Text>
          <Icon
            name="vcard"
            size={30}
            color="white"
            
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>
          Your privacy is important to us. The details shared are used with
          complete discretion and stroed securely
        </Text>
      </View>
    </View>
  )
}

export default IdSelector

const styles = StyleSheet.create({
    selectIdContainer: {
      borderWidth: 0.5,
      borderColor: colors.BLACK,
      marginVertical: 20,
      padding: 10,
    },
    idContainer: {
      padding: 20,
      borderBottomWidth: 0.5,
      marginTop: 5,
      backgroundColor: colors.MAIN_COLOR,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    idCaption: {
      fontWeight: '700',
      fontSize: 22,
      color: colors.WHITE,
    },
  });