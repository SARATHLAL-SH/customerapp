import {StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Linking,
    Image,
    Dimensions,
    ActivityIndicator, } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { colors } from '../../../Globals/Styles';

import Icon from 'react-native-vector-icons/FontAwesome'
import {Camera, useCameraDevice,useCameraDevices,getCameraDevice} from 'react-native-vision-camera'
import { API } from '../../../utils/apiUtils';
import axios from 'axios'
import {useNavigation} from '@react-navigation/native';
import { extractAadhaarDetails,extractAadhaarDetailsBack,} from '../Utils/DocumentUploaderUtils';
import { recognizeText } from '../Utils/TextReadingUtils';



const UploadAdhaar = () => {
  const [image, setImage] = useState('');
  const [text, setText] = useState();
  const [message, setMessage] = useState('');
  const [isFrontUploaded, setIsFrontUploaded] = useState(false);
  const [frontaadhar, setFrontAadhar] = useState();
  const [age, setAge] = useState();
  const [backAadhar, setBackAadhar] = useState();
  const [aadharAddress, setAadhaarAddress] = useState();
  const [isError, setError] = useState(false);
  const devices = useCameraDevices();
  const camera = useRef(null);
  const device = getCameraDevice(devices, 'back');
  const [loading, setLoading] = useState(false);
  const [D_O_Birth, setD_O_Birth] = useState();
  const Navigation = useNavigation();

  useEffect(() => {
    requestCameraPermission();
  }, []);
  useEffect(() => {
    recognizeText(image, setText, setMessage, setError);
  }, [image]);


  const setImageHandler = () => {
    setTimeout(() => {
      setImage('');
      setMessage('');
    }, 1000);
  };

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  };

  const resetHandler = () => {
    setError(false);
    // setIsFrontUploaded(false);
    setImage('');
    takePicture();
  };

  const takePicture = async () => {
    setLoading(true);
    if (camera != null) {
      try {
        const photo = await camera?.current?.takePhoto();
        if (photo) {
          const formData = new FormData();
          formData.append('file', {
            uri: 'file://' + photo.path, // Corrected URI
            type: 'image/jpeg',
            name: 'photo.jpg',
          });

          setImage('file://' + photo.path);

          const response = await axios.post(API + 'upload/aadhar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log(response.data);
         
        } else {
          setMessage('No photo captured');
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error('Backend Error:', error.response.data.error);
        
          setError(error.response.data.error);
        } else if (error.request) {
          console.error('Request Error:', error.request);
         
          setError('Request error occurred');
        } else {
          console.error('Unknown Error:', error.message);
          
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    } else {
      setMessage('Please wait...');
    }
  };

  const renderCamera = () => {
    if (!device) {
      return (
        <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.WHITE}}>No Camera Found</Text>
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Camera
            style={{width: '90%', height: 200}}
            device={device}
            isActive={true}
            enableZoomGesture
            ref={camera}
            photo
          />
        </View>
     
      );
    }
  };
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.headerContainer}>
        <Text style={{marginTop: 10,color:'black'}}>Step 2/3</Text>
        <Text style={{marginTop: 10, fontWeight: '700',color:'black'}}>
          Ensure your ID card photo is clear and ID's are readable
        </Text>

        <Text style={{marginTop: 10, fontWeight: '700',color:'black'}}>
          TAKE PHOTO OF AADHAAR CARD
        </Text>
      </View>
      {image ? (
        <View style={styles.ImageContainer}>
          <Image
            source={{uri: image}}
            width={Dimensions.get('screen').width * 0.75}
            height={Dimensions.get('screen').height * 0.25}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>{renderCamera()}</View>
      )}

      <TouchableOpacity
        style={styles.confirmbtn}
        onPress={() =>
          isFrontUploaded
            ? extractAadhaarDetailsBack(
                text,
                setIsFrontUploaded,
                frontaadhar,
                setBackAadhar,
                setAadhaarAddress,
                setMessage,
                setImage,
                setImageHandler,
                setError,
                D_O_Birth,
                age,
                Navigation,
              )
            : extractAadhaarDetails(
                text,
                setIsFrontUploaded,
                frontaadhar,
                setFrontAadhar,
                setAge,
                age,
                setImage,
                setMessage,
                setImageHandler,
                setError,
                setD_O_Birth,
                D_O_Birth,
              )
        }>
        {image && <Text style={styles.confirmtxt}>Conform</Text>}
      </TouchableOpacity>

      {image && (
        <TouchableOpacity
          style={[styles.confirmbtn, {backgroundColor: '#ff9900'}]}
          onPress={resetHandler}>
          <Text style={styles.confirmtxt}>Reset Camera</Text>
        </TouchableOpacity>
      )}

      <View style={{alignItems: 'center'}}>
        {!image && (
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.buttons}>
            <Text style={styles.btnText}>{`${
              isFrontUploaded ? 'CAPTURE  BACK SIDE' : 'CAPTURE  FRONT SIDE'
            }`}</Text>
            <Icon
              name="camera"
              color={colors.WHITE}
              size={30}
            />
          </TouchableOpacity>
        )}
      </View>
      {loading && (
        <View
        style={styles.overlay}>
          <ActivityIndicator size="large" color={colors.MAIN_COLOR} />
          <Text style={styles.loadingText}> uploading details into SURA APP . . . </Text>
        </View>
      )}
      {/* <Text style={{textAlign: 'justify', fontSize: 32}}>{text}</Text> */}
      <View style={styles.messageWraper}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  
  )
}

export default UploadAdhaar

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.MAIN_COLOR,
      },
      btnContainer: {justifyContent: 'center', alignItems: 'center'},
      buttons: {
        backgroundColor: colors.MAIN_COLOR,
        width: '96%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal:20
      },
      btnText: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.WHITE,
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
    
      messageText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.ERROR,
      },
      confirmbtn: {
        backgroundColor: 'green',
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      confirmtxt: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        color: colors.WHITE,
        fontWeight: '700',
      },
      messageWraper: {justifyContent: 'center', alignItems: 'center'},
      ImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        color: '#fff', // White text
        marginTop: 10,
      },
})