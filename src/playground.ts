import {
  getMultiColorDataGradient,
  changeSaturation,
  getColorFromMultiColorDataGradient,
  getColorFromDataGradient,
} from './utilities';

const multiColorGradientDefinition = [
  {
    minVal: 0,
    minColor: 'red',
    maxVal: 1,
    maxColor: 'blue',
  },
  {
    minVal: 1,
    minColor: 'blue',
    maxVal: 3,
    maxColor: 'yellow',
  },
];

console.log(getMultiColorDataGradient(multiColorGradientDefinition, 12, 'HEX'));

console.log(getColorFromMultiColorDataGradient(multiColorGradientDefinition, 12, 0.5, 'RGB_ARRAY', true));
console.log(getColorFromMultiColorDataGradient(multiColorGradientDefinition, 12, 0.5, 'HEX', true));

console.log(getColorFromDataGradient('red', 0, 'blue', 1, 4, 0.1, false, 'RGB_ARRAY', true));
console.log(getColorFromDataGradient('red', 0, 'blue', 1, 4, 0.1, false, 'RGB_ARRAY', false));
console.log(getColorFromDataGradient('red', 0, 'blue', 1, 4, 0.1, true, 'RGB_ARRAY', true));
console.log(getColorFromDataGradient('red', 0, 'blue', 1, 4, 0.1, true, 'RGB_ARRAY', false));
