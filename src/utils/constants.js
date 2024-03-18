import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['premium_plus_plan','premium_plan',],
});
export const constants = {
  productSkus,
};
