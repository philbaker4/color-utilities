import { getMultiColorDataGradient, changeSaturation, getColorFromMultiColorLinearGradient } from './utilities';

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

console.log(getColorFromMultiColorLinearGradient(multiColorGradientDefinition, 12, .5, 'RGB_ARRAY', false))


