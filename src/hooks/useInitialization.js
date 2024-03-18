import {useEffect} from 'react';
import {Platform} from 'react-native';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
} from 'react-native-iap';

const useInitialization = () => {
  useEffect(() => {
    const init = async () => {
      try {
        await initConnection();
        if (Platform.OS === 'android') {
          flushFailedPurchasesCachedAsPendingAndroid();
        }
      } catch (error) {
        console.error('Error occurred during initialization', error.message);
      }
    };

    init();

    return () => {};
  }, []);
};

export default useInitialization;
