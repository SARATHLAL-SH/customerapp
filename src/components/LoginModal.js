import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState, useContext} from 'react';
import { colors } from '../Globals/Styles';

import LoginContext from '../Contexts/LoginPageContext';
  import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { API } from '../utils/apiUtils';

const LoginModal = ({closeModal}) => {
  const {mobileNumber, setMobileNumber} = useContext(LoginContext);
  const Navigation = useNavigation();

  const mobileNumberHandler = num => {
    setMobileNumber(num);
  };

  const LoginHandler = async () => {
    closeModal();

    try {
      const otpResponce = await axios.post(API + 'send-otp', {mobileNumber});
      Navigation.navigate('OTP Verify');
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.AccountText}>LOGIN</Text>
        <Text style={{color: colors.BLACK}}>
          Enter your phone number to proceed
        </Text>
      </View>
      <View style={styles.textinputContainer}>
        <Text style={{color: colors.BLACK}}>10 digit mobile number</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          maxLength={10}
          value={mobileNumber}
          onChangeText={mobileNumberHandler}
        />
        <Text style={styles.textinputPrefix}>+91</Text>
      </View>

      {mobileNumber?.replace(/[^0-9]/g, '').length > 9 ? (
        <View>
          <TouchableOpacity
            style={{...styles.loginBtnContainer}}
            onPress={LoginHandler}>
            <Text style={styles.btnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  AccountText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.MAIN_COLOR,
  },
  textinputContainer: {
    marginVertical: 20,
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: colors.MAIN_COLOR,
    paddingLeft: 35,
    paddingVertical: 0,
    fontSize: 18,
    marginTop: 10,
    color:colors.BLACK
  },
  textinputPrefix: {
    position: 'absolute',
    bottom: 3,
    fontSize: 18,
    color: colors.MAIN_COLOR,
  },
  loginBtnContainer: {
    backgroundColor: colors.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 5,
    marginVertical: 40,
    marginBottom: 80,
  },

  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.WHITE,
    paddingVertical: 10,
  },
});
