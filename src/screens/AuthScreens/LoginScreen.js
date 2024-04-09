import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,Modal,KeyboardAvoidingView
} from 'react-native';
import React, {useContext, useState, useRef} from 'react';
import LoginContext from '../../Contexts/LoginPageContext';
import { colors } from '../../Globals/Styles';
import LoginModal from '../../components/LoginModal';

const LoginScreen = () => {
  const {mobileNumber, setMobileNumber} = useContext(LoginContext);
  const [selectedImage, setSelectedImage] = useState(
    require('../../../Assets/Images/barCvr.jpg'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const modalToggleHandler = () => {
    setModalVisible(!modalVisible);
  };
  const [panResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Move the bottomContainer based on gestureState
        // Update the translateY value directly
        translateY.setValue(gestureState.dy);
      },
    }),
  );
  const translateY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <ScrollView style={{}}>
        <View style={styles.topContainer}>
          <Image
            source={selectedImage}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.34,
              objectFit: 'fill',
            }}
          />
        </View>
        <Animated.View 
          style={[
            styles.bottomContainer, 
            { 
              transform: [{ translateY }],
            }
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.bottomWraper}>
            <Text style={styles.AccountText}>ACCOUNT</Text>
            <Text style={styles.subHead}>
              login/Create Account to Manage Orders
            </Text>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={modalToggleHandler}>
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By Clicking, I accept the{' '}
                <Text style={styles.termsandCondtions}>
                  {' '}
                  Terms & Conditions{' '}
                </Text>{' '}
                and <Text style={styles.termsandCondtions}>Privacy Policy</Text>
              </Text>
            </View>
            <View style={styles.borderBtm}></View>
          </View>
        </Animated.View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <LoginModal closeModal = {modalToggleHandler} />
                {mobileNumber?.replace(/[^0-9]/g, '').length < 10 ? (
                  <TouchableOpacity
                    style={[styles.loginBtnContainer]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.btnText}>CANCEL</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.BLACK,
  },
  topContainer: {
    // flex: 1,
  },
  bottomContainer: {
    flex: 1,

    backgroundColor: colors.BLACK,
  },
  bottomWraper: {
    backgroundColor: colors.WHITE,
    flex: 1,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 10,
    paddingTop: 60,
  },
  AccountText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.headerText,
  },
  subHead: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.BLACK,
  },
  loginBtnContainer: {
    backgroundColor: colors.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 80,
  },

  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.WHITE,
    paddingVertical: 10,
  },
  termsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  termsandCondtions: {
    color: colors.BLACK,
    fontWeight: '600',
    textDecorationLine: 'underline',
    justifyContent: 'center',
  },

  termsText: {
    fontSize: Dimensions.get('screen').width * 0.03,
  },
  borderBtm: {
    borderBottomColor: colors.MAIN_COLOR,
    borderBottomWidth: 1.5,
    marginTop: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '99%',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  open: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
