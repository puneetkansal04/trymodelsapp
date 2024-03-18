import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import usePurchaseFetching from '../hooks/usePurchaseFetching';
import {
  finishTransaction,
  getProducts,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from 'react-native-iap';
import { useNavigation } from '@react-navigation/native';
import { constants } from '../utils/constants';

function HomeScreen() {
  const [premiumUser, setPremiumUser] = useState(false);
  const navigation = useNavigation();
  // Call the custom hook
  const loading = usePurchaseFetching(setPremiumUser);

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const notifySuccessfulPurchase = () => {
    Alert.alert('Success', 'Purchase successful', [
      {
        text: 'Home',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  const handlePurchase = async (productId) => {
    // setPurchaseLoading(true)
    console.log('productId',productId)
    try {
      await requestPurchase({ skus: [productId] });
    } catch (error) {
      Alert.alert('Error occurred while making purchase')
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async purchase => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            await finishTransaction({ purchase, isConsumable: false });
          } catch (error) {
            console.error(
              'An error occurred while completing transaction',
              error,
            );
          }
          notifySuccessfulPurchase();
        }
      },
    );
    const purchaseErrorSubscription = purchaseErrorListener(error =>
      console.error('Purchase error', error.message),
    );
    const fetchProducts = async () => {
      try {
        const result = await getProducts({ skus: constants.productSkus });
        setProducts(result);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error fetching products');
      }
    };
    fetchProducts();
    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => { 
                            handlePurchase(constants.productSkus[0])
         }}
        style={{
          flex: 1,
          height: 260,
          borderRadius:5,
          backgroundColor: 'blue',
          margin: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white' }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        numColumns={2}
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
      />
    </View>
  );
}

export default HomeScreen;
