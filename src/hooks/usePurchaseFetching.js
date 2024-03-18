import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {constants} from '../utils/constants';
import {getAvailablePurchases} from 'react-native-iap';

const usePurchaseFetching = setPremiumUser => {
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const fetchPurchases = async () => {
        try {
          const result = await getAvailablePurchases();
          const hasPurchased = result.find(
            product => product.productId === constants.productSkus[0],
          );
          console.log('hasPurchased',result)
          setLoading(false);
          setPremiumUser(hasPurchased);
        } catch (error) {
          console.error('Error occurred while fetching purchases', error);
        }
      };

      fetchPurchases();
    }, [setPremiumUser]),
  );

  return loading;
};

export default usePurchaseFetching;
