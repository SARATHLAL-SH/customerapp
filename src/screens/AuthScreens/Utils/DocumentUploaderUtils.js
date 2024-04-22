import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import { API } from '../../../utils/apiUtils';


export const openCamera = async (
  setImage,
  setMessage,
  setImageHandler,
  setError,
) => {
  try {
    let result = await launchCamera({mediaType: 'photo'});

    if (result.didCancel) {
      console.log('User cancelled camera');
      setMessage('Operation Cancelled');
    } else if (result.error) {
      console.error('Camera Error:', result.error);
      setMessage('Error while Opening Camera.Please try again.');
      setImageHandler();
    } else {
      setImage(result?.assets[0]?.uri);
      console.log(result?.assets[0]?.uri);
    }

    // Handle the result if needed
  } catch (error) {
    console.error('Error opening camera:', error);
    setMessage('Error while opening camera.Grand your Camera Permission.');
    setError(true);
    setImageHandler();
  }
};

export const findAge = (
  text,
  setAge,
  aadharNumber,
  setIsFrontUploaded,
  setImage,
  setMessage,
  setImageHandler,
  setError,
  isPanCardActive,
) => {
  const dobRegex = /DOB: (\d{2}\/\d{2}\/\d{4})/;

  const dobMatch = text?.match(dobRegex);
  if (dobMatch) {
    // Split the date string into day, month, and year components
    const dobParts = dobMatch[1].split('/');

    const day = parseInt(dobParts[0].trim(), 10); // Convert to integer
    const month = parseInt(dobParts[1].trim(), 10); // Convert to integer
    const year = parseInt(dobParts[2].trim(), 10); // Convert to integer

    // Create a new date object
    const dobDate = new Date(year, month - 1, day); // Months are zero-based (0-11)

    // Check if dobDate is a valid date
    if (isNaN(dobDate.getTime())) {
      console.log('Invalid date string:', dobMatch[1]);
      setMessage(
        'Unable to recognize the text on your Aadhaar card. Please try again.',
      );
      setError(true);
      return; // Exit function if DOB is not a valid date
    }

    // Continue with calculating age
    const today = new Date();
    const diffTime = Math.abs(today - dobDate);
    const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    setAge(age);

    // console.log('Your age is:', age);
    validateFront_Aadhar_Handler(
      age,
      aadharNumber,
      setIsFrontUploaded,
      setImage,
      setMessage,
      setImageHandler,
      setError,
    );
  } else {
    console.log('Date of Birth not found');
    setMessage(
      'Oops! Could not extract Aadhaar card info. Please ensure a clear photo and try again.',
    );
    setError(true);
    // setImage('');
    return; // Exit function if DOB is not found
  }
};

export const extractAadhaarDetails = async (
  text,
  setIsFrontUploaded,
  frontadhar,
  setFrontAadhar,
  setAge,
  age,
  setImage,
  setMessage,
  setImageHandler,
  setError,
  setD_O_Birth,
) => {
  try {
    const aadhaarRegex = /\b\d{4}\s\d{4}\s\d{4}\b/g;
    const issueDateRegex = /Issue Date: (\d{2}\/\d{2}\/\d{4})/;
    const dobRegex = /DOB: (\d{2}\/\d{2}\/\d{4})/;

    // Extract Aadhaar number, issue date, and date of birth using regex
    const aadharNumber = (await text?.match(aadhaarRegex)?.[0]) ?? '';
    const issueDate = text?.match(issueDateRegex)?.[1] ?? '';
    const dob = text?.match(dobRegex)?.[1] ?? '';
    console.log('aadhar', aadharNumber, 'issueDate', issueDate, 'dob:', dob);
    setFrontAadhar(aadharNumber);
    setD_O_Birth(dob);

    findAge(
      text,
      setAge,
      aadharNumber,
      setIsFrontUploaded,
      setImage,
      setMessage,
      setImageHandler,
      setError,
      setD_O_Birth,
      
    );

    return {aadharNumber, issueDate, dob};
  } catch (error) {
    console.log(error);
    setMessage('Unable to Extract your Details, Try after Some Time');
    setError(true);
    setImageHandler();
  }
};

const validateFront_Aadhar_Handler = (
  age,
  aadharNumber,
  setIsFrontUploaded,
  setImage,
  setMessage,
  setImageHandler,
  setError,
) => {
  if (aadharNumber.replace(/\s/g, '').length === 12 && age > 21) {
    setIsFrontUploaded(true);
    setMessage('Successfully uploaded');
    setError(false);
    setImageHandler();
    // clearMessageHandler();
  } else if (aadharNumber.replace(/\s/g, '').length === 12 && age < 21) {
    setMessage(
      'As per Govt Records you are not Eligible for Signin this Application',
      setError(true),
    );
    setImageHandler();
  } else if (aadharNumber.replace(/\s/g, '').length != 12 && age > 21) {
    setMessage('AdhaarCard validation Failed, Please Try Again');
    setError(true);
    setImageHandler();
  } else {
    setMessage('Unable to read your Aadhaar Card! Try Again..');
    setError(true);
  }
};
export const extractAadhaarDetailsBack = async (
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
  age,Navigation
) => {
  try {
    const aadhaarRegex = /\b(?<!\d)(?!1947)\d{4}\s\d{4}\s\d{4}\b/;
    const addressRegex = /Address:([\s\S]*?)(?=\d{4}\s\d{4}\s\d{4}\b|$)/;
    // const addressRegex = /Address:([\s\S]*?)(?=[A-Z]|Unique)/g;
    const aadharNumber = (await text?.match(aadhaarRegex)?.[0]) ?? '';
    const addressMatch = addressRegex.exec(text);
    const address = addressMatch ? addressMatch[1].trim() : '';
    console.log(
      'aadhar in console:\n',
      aadharNumber,
      'address in console:\n',
      address,
    );

    {
      if (address && aadharNumber)
        validateBack_Aadhar_Handler(
          aadharNumber,
          address,
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
          Navigation
        );
      else setMessage('unable to validate aadhaar, Try Again..');
      setError(true);
    }

    return {aadharNumber, address};
  } catch (error) {
    console.log(error);
    setMessage('capture Aadhaar Card Back Side');
    // setImageHandler();
  }
};
const validateBack_Aadhar_Handler = async (
  aadharNumber,
  address,
  setIsFrontUploaded,
  frontaadhar,
  setBackAadhar,
  setAadhaarAddress,
  setMessage,
  setImage,
  setImageHandler,
  setError,
  D_O_Birth,
  age,Navigation
) => {
  if (
    aadharNumber?.replace(/\s/g, '') === frontaadhar?.replace(/\s/g, '') &&
    address?.length > 15
  ) {
    try {
      const response = await axios.post(API + 'post-aadhar-details', {
        D_O_Birth,
        address,
        aadharNumber,
        age
      });
      if (response.data) {
        console.log(response.data);
        setBackAadhar(aadharNumber);
        setAadhaarAddress(address);
        setIsFrontUploaded(false);
        setMessage('Successfully Uploaded Adhaar Card');
    
        setImageHandler();
         Navigation.reset({
          index: 0,
          routes: [{ name: 'Upload Selfie' }],
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
   
  } else if (
    aadharNumber?.replace(/\s/g, '') != frontaadhar?.replace(/\s/g, '') &&
    address?.length > 15
  ) {
    setMessage('Your Aadhaar Card details not matching. Try Again');
    setError(true);
    // setImageHandler();
  } else if (
    aadharNumber?.replace(/\s/g, '') != frontaadhar?.replace(/\s/g, '') &&
    address?.length < 5
  ) {
    setMessage('Unable to read your Address Details');
    // setImageHandler();
    setError(true);
  } else {
    console.log('Unable to read your Aadhar Card! Try Again..');
    setError(true);
    // setImageHandler();
  }
};
