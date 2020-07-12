import { getColorFromLinearDataGradient } from './utilities';

console.log(getColorFromLinearDataGradient('red', 0, 'blue', 1, 4, 0.2, true, 'RGB_STRING'));
console.log(getColorFromLinearDataGradient('red', 0, 'blue', 1, 4, 0.2, false, 'RGB_STRING'));
