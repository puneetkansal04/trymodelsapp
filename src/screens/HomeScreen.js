import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import usePurchaseFetching from "../hooks/usePurchaseFetching";
import {
  finishTransaction,
  getProducts,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from "react-native-iap";
import { useNavigation } from "@react-navigation/native";
import { constants } from "../utils/constants";
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import Orientation from "react-native-orientation-locker";
import FastImage from "react-native-fast-image";

function HomeScreen() {
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Orientation.lockToPortrait();
    });
    return unsubscribe;
  }, [navigation]);

  const [premiumUser, setPremiumUser] = useState([]);
  // Call the custom hook
  const loading = usePurchaseFetching(setPremiumUser);
  const collectionData = useFirestoreCollection("ha-data");

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);


  const handlePurchase = async (productId) => {
    // setPurchaseLoading(true)
    console.log("productId", productId);
    try {
      await requestPurchase({ skus: [productId] });
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            await finishTransaction({ purchase, isConsumable: false });
          } catch (error) {
            console.error(
              "An error occurred while completing transaction",
              error
            );
          }
          notifySuccessfulPurchase();
        }
      }
    );
    const purchaseErrorSubscription = purchaseErrorListener((error) =>
      console.error("Purchase error", error.message)
    );
    const fetchProducts = async () => {
      try {
        const result = await getProducts({ skus: constants.productSkus });
        setProducts(result);
        setLoading(false);
      } catch (error) {
        
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
          if (premiumUser.includes(item?.plan)) {
            navigation.navigate("ViewModel", { dataItem: item });
          } else {
            handlePurchase(constants.productSkus[0]);
          }
        }}
        style={{
          flex: 1,
          height: 260,
          borderRadius: 5,
          margin: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FastImage
          source={{ uri: item?.image }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            borderRadius: 5,
          }}
          resizeMode={FastImage.resizeMode.cover}
        >
          <Text style={{ color: "white" }}>{item?.label}</Text>
        </FastImage>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        numColumns={2}
        data={collectionData?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

export default HomeScreen;
