import TextRecognition from '@react-native-ml-kit/text-recognition'
export const recognizeText = async (image,setText,setMessage,setError) => {
    try {
      if (image != '') {
        const result = await TextRecognition.recognize(image);
        if (result != undefined) {
          setText(result.text);
        }
      } else {
        setMessage('');
        // setImageHandler();
      }
    } catch (err) {
      console.log(err);

      setMessage('Failed to read your card, try after some time');
      setError(true);
      // setImageHandler();
    }
  };