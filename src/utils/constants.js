import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['app_pro_plan2999'],
});
export const constants = {
  productSkus,
};
