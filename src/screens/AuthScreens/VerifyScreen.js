import {StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView, } from 'react-native'
import React,{useContext, useState, useRef, useEffect} from 'react'
import smsLogo from '../../../Assets/Images/smartphonebg.png'
import axios from 'axios'
import { colors } from '../../Globals/Styles'
import {useNavigation} from  '@react-navigation/native'
import { API } from '../../utils/apiUtils'
import LoginContext from '../../Contexts/LoginPageContext'

const VerifyScreen = () => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const {mobileNumber, loginToken, setLoginToken,} = useContext(LoginContext);
  const [error, setError] = useState('');
  const [otps, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  const [showResendOTP, setShowResendOTP] = useState(false);
  const Navigation = useNavigation();
  const [mobileUserData, setMobileUserData] = useState();
  // const status = useGetStatus(mobileNumber);

  let token = '';
  const otpLength = Object.values(otps).filter(value => value !== '').length;
  const resendOtpTextHandler = () => {
    const timer = setTimeout(() => {
      setShowResendOTP(!showResendOTP);
    }, 10000);

    return () => clearTimeout(timer);
  };
  const resenndOtpHanlder = async () => {
    try {
      const otpResponce = await axios.post(API + 'send-otp', {mobileNumber});
      Navigation.navigate('Signup');
    } catch (error) {
      console.log('error', error);
    }
    setShowResendOTP('');
    setError('OTP successfully Resent to your Mobile Number');
    setTimeout(() => {
      setError('');
      resendOtpTextHandler();
    }, 3000);
  };

  const siginButtonHandler = async () => {
  

    try {
      const otp = Object.values(otps).join('');
      const otpResponce = await axios.post(API + 'verify-otp', {
        otp,
        mobileNumber,
      });
      token = otpResponce.data.accessToken;
    //  console.log("statusofStatus", status.status)
      if (mobileUserData) {
       
       
        Navigation.navigate('Signup');
      }else if(mobileUserData ) {
        Navigation.navigate('Verify');
      }
      else {
        // await AsyncStorage.setItem('token', token);
        // await AsyncStorage.removeItem('token');
        Navigation.navigate('Signup');
        console.log('no mobileuserdata',mobileUserData);
        
      }

      setError('Successfully Logged In');
    } catch (error) {
      console.log('error', error);
      setError('Password mismatch');
    }

    setTimeout(() => {
      setError('');
    }, 3000);
  };
  const otperrorHandler = () => {
    setError('Fill Four Digit OTP');
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API + 'get-register-user/' + mobileNumber,
        );
        if (response) {
          // const parsedUserDetails = JSON.parse(response.data);
          const user = await response.data.users[0]?.username;
          console.log("user",user)
          setMobileUserData(user);
        } else {
          setMobileUserData(null);
        }
      } catch (error) {
        console.log(error);
      }
      
    };
    // const getStatus = async()=>{
    //   try{
    //   const status = await  axios.get(API + 'get-mobile-status/'+ mobileNumber)
    //     if (status) {
    //       console.log("getStatus",status.data);
    //       setStatus(status.data.status)
    //     }
    //     else{
    //       setStatus(null);
    //       console.log("getStatus data not available");
    //     }
    //   }catch(error){
    //     console.log("error from getStatus", error)
    //   }
    
    // } 
   
    fetchData();
    // getStatus();
  }, [mobileNumber]);

  return (
    <ScrollView style={styles.container}>
      {/* <Header title="VERIFY DETAILS" type="arrow-left" /> */}
      <View style={styles.header}>
        <View>
          <Text style={styles.commontext}>VERIFY DETAILS</Text>
          <Text style={styles.subCommontext}>OTP sent to {mobileNumber} </Text>
        </View>
        <View>
          <Image
            source={smsLogo}
            style={{width: 150, height: 100, objectFit: 'cover'}}
          />
        </View>
      </View>
      <View style={styles.otpWraper}>
        <View style={styles.otpContainer}>
          <Text style={styles.otphead}>
            Enter the OTP number just sent you at +91 {mobileNumber}
          </Text>
        </View>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={text => {
                setOtp({...otps, 1: text});
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={text => {
                setOtp({...otps, 2: text});
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={text => {
                setOtp({...otps, 3: text});
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={text => {
                setOtp({...otps, 4: text});
                !text && thirdInput.current.focus();
              }}
            />
          </View>
        </View>
        {otpLength < 4 ? (
          <TouchableOpacity
            style={[styles.loginBtnContainer, {opacity: 0.5}]}
            onPress={otperrorHandler}>
            <Text style={[styles.btnText]}>ENTER OTP</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.loginBtnContainer]}
            onPress={siginButtonHandler}>
            <Text style={styles.btnText}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </View>

      {showResendOTP && (
        <TouchableOpacity
          style={styles.resendotpContainer}
          onPress={resenndOtpHanlder}>
          <Text style={styles.resendotp}>Resend OTP</Text>
        </TouchableOpacity>
      )}
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    </ScrollView>
  )
}

export default VerifyScreen

const styles = StyleSheet.create({
  container: {flex: 1,
  backgroundColor:colors.SECONDARY_COLOR},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
  commontext: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.BLACK,
  },
  subCommontext: {fontSize: 15, fontWeight: '700', color: colors.BLACK},

  otpWraper: {paddingHorizontal: 8},
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
  otpBox: {borderRadius: 5, borderColor: colors.MAIN_COLOR, borderWidth: 1.5},
  otpText: {
    fontSize: 25,
    color: colors.BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  loginBtnContainer: {
    backgroundColor: colors.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 30,
    marginTop: 40,
  },
  otphead: {
    fontSize: 19,
    color: colors.BLACK,
    fontWeight: '600',
  },
  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.WHITE,
    paddingVertical: 10,
  },
  resendotpContainer: {paddingHorizontal: 8},
  resendotp: {color: colors.MAIN_COLOR},
  errorMessageContainer: {alignItems: 'center'},
  errorMessage: {fontSize: 15, color: colors.ERROR, fontWeight: '700'},
})