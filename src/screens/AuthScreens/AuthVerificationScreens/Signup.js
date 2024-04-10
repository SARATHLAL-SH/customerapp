import { StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView, } from 'react-native'
import React,{useContext, useState} from 'react'
import champagner from '../../../../Assets/Images/champagner.jpg';
import { colors } from '../../../Globals/Styles';
import LoginContext from '../../../Contexts/LoginPageContext';
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'
import { API } from '../../../utils/apiUtils';

const Signup = () => {
    const [email, setEmial] = useState();
    const [username, setUserName] = useState();
    const {mobileNumber} = useContext(LoginContext);
    const [message, setMessage] = useState();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = text => {
      setEmial(text);
    };
    const validateName = text => {
      setUserName(text);
    };
    const Navigation = useNavigation();
    
    const SignupHandler = async () => {
      try {
        const response = await axios.post(API + 'customer-register', {
          mobileNumber,
          username,
          email,
        });
        console.log(response.data);
        if (response.data) {
          Navigation.reset({
            index: 0,
            routes: [{ name: 'Verify' }],
          });
          setMessage(response.data.message);
        } else {
          setMessage(response.data.error);
        }
      } catch (error) {
        console.log(error.response.data.error);
        setMessage(error.response.data.error);
      }
    };
  return (
    <ScrollView style={styles.container}>
      {/* <Header title="SIGNIN" name="arrow-left" /> */}
      <View>
        <View style={[styles.signupHeaderContainer]}>
          <ImageBackground
            source={champagner}
            style={[
              styles.imagebackground,
              {resizeMode: 'contian',opacity:0.7},
            ]}>
            <View>
              <Text style={[styles.commonText, styles.sigunuphead]}>
                SIGN UP
              </Text>
              <Text style={styles.commonText}>
                Create an account with the new phone number
              </Text>
            </View>

            <View>
              <Text></Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.formContainer}>
            <View style={styles.mobileContainer}>
              <Text style={{color: colors.BLACK}}>10 digit mobile number</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                minLength={10}
                value={mobileNumber}
                editable={false}
              />
            </View>
            <View style={styles.emailContainer}>
              <Text style={{color: colors.BLACK}}>EMAIL ADDRESS</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                minLength={5}
                value={email}
                onChangeText={validateEmail}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={{color: colors.BLACK}}>NAME</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={validateName}
                value={username}
              />
            </View>
          </View>

          <View style={styles.btnwraper}>
            <TouchableOpacity
              style={[styles.loginBtnContainer]}
              disabled={!(emailRegex.test(email) && username?.length > 2)}
              onPress={SignupHandler}>
              <Text style={styles.btnText}>{`${
                emailRegex.test(email)
                  ? username && username.length > 2
                    ? 'SIGNIN'
                    : 'ENTER NAME'
                  : 'ENTER EMAIL'
              }`}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messagetext}>{message}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.WHITE},
  signupHeaderContainer: {
    backgroundColor: colors.BLACK,
    flexDirection: 'row',
    padding: 8,
  },
  imagebackground: {
    flex: 1,
    justifyContent: 'center',
    objectFit: 'contain',
  },
  commonText: {
    color: colors.WHITE,
  },
  sigunuphead: {
    fontSize: 22,
    fontWeight: '700',
  },
  bottomContainer: {
    // flex: 1,
    paddingHorizontal: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mobileContainer: {marginTop: 20},
  emailContainer: {marginTop: 40},
  nameContainer: {marginTop: 40},
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: colors.HEADER,
    paddingLeft: 2,
    paddingVertical: 0,
    fontSize: 18,
    marginTop: 10,
    color:colors.BLACK
  },
  formContainer: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  btnwraper: {},
  loginBtnContainer: {
    backgroundColor: colors.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 20,
  },

  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.WHITE,
    paddingVertical: 10,
  },
  messageContainer: {justifyContent: 'center', alignItems: 'center'},
  messagetext: {fontWeight: '700', fontSize: 18, color: colors.ERROR},
})