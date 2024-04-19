import AsyncStorage from '@react-native-async-storage/async-storage'

export const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      return token;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  };
  export const fetchUser = async () => {
    try {
      const mobile = await AsyncStorage.getItem('userData');
      console.log("mobile in utils", mobile)
      return mobile;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  };
