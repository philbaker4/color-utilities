import { getMultiColorDataGradient, changeSaturation } from './utilities';

// const multiColorGradientDefinition = [
//   {
//     minVal: 0,
//     minColor: 'red',
//     maxVal: 1,
//     maxColor: 'blue',
//   },
//   {
//     minVal: 1,
//     minColor: 'blue',
//     maxVal: 3,
//     maxColor: 'yellow',
//   },
// ];

// console.log(getMultiColorDataGradient(multiColorGradientDefinition, 12, 'HEX'));

console.log(changeSaturation('red', 0.25, 'RGB_STRING'));
console.log(changeSaturation('red', 0.25, 'HEX'));
console.log(changeSaturation('red', -0.25, 'RGB_STRING'));
console.log(changeSaturation('red', -0.25, 'HEX'));
