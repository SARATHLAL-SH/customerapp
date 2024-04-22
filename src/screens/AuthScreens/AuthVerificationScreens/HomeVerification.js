import {StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity, } from 'react-native'
import React from 'react'
import paper from '../../../../Assets/Images/paper.jpg'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../Globals/Styles';
import { useNavigation } from '@react-navigation/native';

const HomeVerification = () => {
    const Navigation =useNavigation();
    const selectIDHandler=()=>{
  // Navigation.navigate("Select ID");
  Navigation.reset({
    index: 0,
    routes: [{ name: 'Select ID' }],
  });
    }
  return (
    <View style={styles.container}>
      {/* <Header title="Verify Age" name="arrow-left" /> */}

      <ImageBackground source={paper} style={styles.imageBackground}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
          {/* <Icon name="location" size={30} color="#f5dce3" /> */}
            <Icon
             
              name="user"
              size={30}
              color="green"
             
            />
            <Text style={styles.ageText}>21+</Text>
            <View style={styles.checkmark}>
              <Icon
               
                name="check"
                size={30}
                color="green"
                
              />
            </View>
          </View>
          <View style={styles.confirmTextContainer}>
            <Text style={styles.confirmText}>
              Confirm your Age once to order from wine shops
            </Text>
          </View>
          <Text></Text>
          <View style={styles.rulesTextContainer}>
            <Icon
              raised
              name="check-square"
              size={30}
              color="green"
              
            />
            <Text style={styles.ruleText}>
              You must be of legal dringking age to order from wine shops.
            </Text>
          </View>
          <View style={styles.rulesTextContainer}>
            <Icon
              raised
              name="check-square"
              size={30}
              color="green"
             
            />
            <Text style={styles.ruleText}>
              As per Govt. guidelines, you have to upload a Govt.ID to verify
              your age.
            </Text>
          </View>

          <TouchableOpacity style={[styles.loginBtnContainer]} onPress={selectIDHandler}>
            <Text style={styles.btnText}>SELECT A GOVT ID</Text>
          </TouchableOpacity>
          <View>
            <Text style={{color:colors.ERROR,fontWeight:'700',fontSize:14,textAlign:'center'}}>You must be atleast 21 yrs of age as per Govt guidelines</Text>
          </View>
        </View>
      </ImageBackground>
    </View>  
  
  )
}

export default HomeVerification

const styles = StyleSheet.create({
    container: {flex: 1},
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  circleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 1,
    paddingHorizontal: 8,
  },
  circle: {
    width: '32%',
    height: '18%',
    borderRadius: 68,
    borderWidth: 1,
    backgroundColor: colors.HEADER_CONTAINER,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:colors.MAIN_COLOR
  },
  checkmark: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  ageText: {
    fontWeight: '900',
    fontSize: 26,
    color: colors.ERROR,
  },
  rulesTextContainer: {
    // flexWrap:'wrap',
    width:"100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    marginHorizontal: 8,
   
    
  },
  ruleText: {fontWeight: '500', color: "#4a3f03", fontSize: 17,marginLeft:10},
  confirmTextContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#f0d7c9",
    borderWidth:1,
    borderRadius:10,
    padding:5,
    borderColor:colors.ERROR,
    elevation:10

    
  },
  confirmText: {
    fontSize: 28,
    fontWeight: '700',
    color:"#ab2203",
    textAlign:'center'
  },
  loginBtnContainer: {
    backgroundColor: colors.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: '99%',
  },

  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.WHITE,
    paddingVertical: 10,
  },
})