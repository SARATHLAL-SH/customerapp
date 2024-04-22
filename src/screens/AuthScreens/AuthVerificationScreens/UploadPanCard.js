import {
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import {
    Camera,
    getCameraDevice,
    useCameraDevices,
  } from 'react-native-vision-camera';
  import { colors } from '../../../Globals/Styles';
  import { recognizeText } from '../Utils/TextReadingUtils';
  import {VerifyPancardHandler} from '../Utils/panCardUploadUtils'
  import axios from 'axios';
  import { API } from '../../../utils/apiUtils';
  import {useNavigation} from '@react-navigation/native';

const UploadPanCard = () => {
    const devices = useCameraDevices();
    const camera = useRef(null);
    const device = getCameraDevice(devices, 'back');
    const [image, setImage] = useState();
    const [text, setText] = useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [age, setAge] = useState();
    const [loading, setLoading] = useState(false);
    const Navigation = useNavigation();
  
    useEffect(() => {
      recognizeText(image, setText, setMessage, setError);
    }, [image]);
  
    useEffect(() => {
      requestCameraPermission();
    }, []);
  
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') await Linking.openSettings();
    };
  
    const takePicture = async () => {
      setLoading(true);
      if (camera != null) {
        try {
          const photo = await camera?.current?.takePhoto();
          if (photo) {
            const formData = new FormData();
            formData.append('file', {
              uri: 'file://' + photo.path,
              type: 'image/jpeg',
              name: 'photo.jpg',
            });
  
            setImage('file://' + photo.path);
  
            const response = await axios.post(API + 'upload/pan', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            if (response) {
            setMessage('photo Captured')
            }
          } else {
            setMessage('No photo captured');
          }
        } catch (error) {
          console.error(error);
          if (error.response) {
            console.error('Backend Error:', error.response.data.error);
            // Handle backend error
            setError(error.response.data.error);
          } else if (error.request) {
            console.error('Request Error:', error.request);
            // Handle request error
            setError('Request error occurred');
          } else {
            console.error('Unknown Error:', error.message);
            // Handle other errors
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
          <View style={{backgroundColor: 'red'}}>
            <Text style={{color:colors.ERROR}}>Camera not opening</Text>
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
    console.log(text);
  return (
    <View style={{flex: 1}}>
    <ScrollView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={{marginTop: 10,color:colors.BLACK}}>Step 2/3</Text>
        <Text style={{marginTop: 10, fontWeight: '700', color:"black"}}>
          Ensure your ID card photo is clear and ID's are readable
        </Text>

        <Text style={{marginTop: 10, fontWeight: '700', color:"black"}}>
          TAKE PHOTO OF PANCARD
        </Text>
      </View>
      <View style={{}}>
        {image ? (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={{uri: image}}
              style={{width: '90%', height: 200}}
            />
          </View>
        ) : (
          renderCamera()
        )}
        {!image && (
          <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
            <Text
              style={{fontWeight: 700, fontSize: 20, color: colors.WHITE}}>
              Capture PanCard
            </Text>
          </TouchableOpacity>
        )}
       {loading && (
        <View
        style={styles.overlay}>
            <>
          <ActivityIndicator size="large" color={colors.MAIN_COLOR} />
          <Text style={styles.loadingText}> uploading Selfie into SURA APP . . . </Text>
          </>
        </View>
      )}
      </View>
      {image && (
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              VerifyPancardHandler(text, setMessage, setError, setAge,Navigation);
            }}>
            <Text style={styles.btnTxt}>Conform</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnContainer, {backgroundColor: '#ff9900'}]}
            onPress={() => {
              setImage('');
            }}>
            <Text style={styles.btnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    </ScrollView>
  </View>
  )
}

export default UploadPanCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      captureBtn: {
        backgroundColor: 'green',
        width: '70%',
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnContainer: {
        width: '87%',
        backgroundColor: 'green',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
      },
      btnTxt: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.WHITE,
      },
      errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorText: {
        color: colors.ERROR,
        fontWeight: '700',
        fontSize: 18,
      },
      headerContainer: {
        alignItems: 'center',
        marginTop: 20,
      },
      headerText: {
        fontSize: 24,
        color: colors.MAIN_COLOR,
        fontWeight: '700',
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