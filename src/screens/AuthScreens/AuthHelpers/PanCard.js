import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React, {useContext} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../Globals/Styles';
import LoginContext from '../../../Contexts/LoginPageContext';

const PanCard = () => {
    const {setIsPanCard, setIsAdhaar, isPanCard} = useContext(LoginContext);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.adhaarContainer}
          onPress={() => setIsPanCard(!isPanCard)}>
          <Text style={styles.adhaarText}>Pan Card</Text>
          <Icon
            name="sort-down"
            size={30}
            color="green"
            
          />
        </TouchableOpacity>
        <View style={styles.verificationWraper}>
          <View>
            <Text style={styles.header}>NEXT STEPS FOR VERIFICATION</Text>
          </View>
          <View style={styles.verificationContainer}>
            <Icon
              raised
              name="address-card"
              size={30}
              color="green"
            
            />
            <Text style={styles.verificationText}>
              Click a photo of the Govt. ID to verify your age
            </Text>
          </View>
          <View style={styles.verificationContainer}>
            <Icons
              raised
              name="enhance-photo-translate"
              color="green"
              size={30}
            />
            <Text style={styles.verificationText}>
              Click a selfie to verify your photo identity
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PanCard

const styles = StyleSheet.create({
    container: {paddingHorizontal: 1, borderWidth: 0.5, marginTop: 20},
    subContainer: {margin: 10},
    verificationWraper: {
      borderWidth: 2,
      borderColor: colors.MAIN_COLOR,
      paddingHorizontal: 8,
      paddingTop: 25,
      marginVertical: 5,
    },
    adhaarContainer: {
      // borderWidth: 2,
      borderColor: colors.BLACK,
      marginVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: colors.MAIN_COLOR,
    },
    adhaarText: {
      paddingVertical: 20,
      fontSize: 22,
      fontWeight: '700',
      color: colors.WHITE,
    },
    header: {fontSize: 18, fontWeight: '700',color:colors.BLACK,marginBottom:10},
    verificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 5,
      paddingRight: 15,
      width: '90%',
    },
    verificationText: {
      paddingHorizontal: 5,
      fontSize: 18,
      fontWeight: '600',
      flexWrap: 'wrap',
      color:colors.BLACK
    },
})