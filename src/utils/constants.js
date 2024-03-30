import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['premium_plan','premium_plus_plan'],
});
export const constants = {
  productSkus,
};
