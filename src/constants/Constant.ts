import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const Constants = {
  SPACE: 4,
  SPACE_LARGE: 8,
  SPACE_X_LARGE: 16,
  SPACE_XX_LARGE: 32,
  SPACE_XXX_LARGE: 64,
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
};
