// constants for switch/case checking representation type
const HEX = 1;
const RGB = 2;
const RGBA = 3;
const ARRAY = 4;
const COLORNAME = 5;

// get the string representation type
function getType(val: string): number {
  if (val.indexOf('#') > -1) return HEX;
  if (val.indexOf('rgb(') > -1) return RGB;
  if (val.indexOf('rgba(') > -1) return RGBA;
  if (Array.isArray(val)) return ARRAY;
  return COLORNAME;
}

const cssColors: { [key: string]: string } = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  'indianred ': '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370d8',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#d87093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};

// process the value irrespective of representation type
export function processValue(val: string | number[]): number[] | undefined {
  if (typeof val === 'string') {
    const type = getType(val);
    switch (type) {
      case HEX: {
        return processHEX(val);
      }
      case RGB: {
        return processRGB(val);
      }
      case RGBA: {
        return processRGB(val);
      }
      case COLORNAME: {
        return processCSSColorName(val);
      }
    }
  } else {
    return processArray(val);
  }
}

// return a workable RGB int array [r,g,b] from rgb/rgba representation
function processRGB(val: string) {
  const rgb = val.split('(')[1].split(')')[0].split(',');
  return [parseInt(rgb[0], 10), parseInt(rgb[1], 10), parseInt(rgb[2], 10)];
}

// return a workable RGB int array [r,g,b] from hex representation
function processHEX(val: string) {
  // does the hex contain extra char?
  const hex = val.length > 6 ? val.substr(1, val.length - 1) : val;
  // is it a six character hex?
  let r;
  let g;
  let b;
  if (hex.length > 3) {
    // scrape out the numerics
    r = hex.substr(0, 2);
    g = hex.substr(2, 2);
    b = hex.substr(4, 2);

    // if not six character hex,
    // then work as if its a three character hex
  } else {
    // just concat the pieces with themselves
    r = hex.substr(0, 1) + hex.substr(0, 1);
    g = hex.substr(1, 1) + hex.substr(1, 1);
    b = hex.substr(2, 1) + hex.substr(2, 1);
  }
  // return our clean values
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}
// return a workable RGB int array [r,g,b] from rgb array representation
function processArray(val: number[]) {
  return [val[0], val[1], val[2]];
}
// return a workable RGB int array [r,g,b] from css color name representation
function processCSSColorName(val: string) {
  if (cssColors[val.toLowerCase()] !== undefined) return processHEX(cssColors[val.toLowerCase()]);

  throw new Error('processCSSColorName: string is not a valid css color name');
}

// used ensure that hex representation subparts are the appropriate length
export function pad(n: string, width: number, z?: string) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// get the color a certain percent of the way between two points
export function getInterpolatedColor(minColorRGB: number[], maxColorRGB: number[], percent: number) {
  const valClampRGB = [
    maxColorRGB[0] - minColorRGB[0],
    maxColorRGB[1] - minColorRGB[1],
    maxColorRGB[2] - minColorRGB[2],
  ];
  const clampedR =
    valClampRGB[0] > 0 ? Math.round(valClampRGB[0] * percent) : Math.round(minColorRGB[0] + valClampRGB[0] * percent);

  const clampedG =
    valClampRGB[1] > 0 ? Math.round(valClampRGB[1] * percent) : Math.round(minColorRGB[1] + valClampRGB[1] * percent);

  const clampedB =
    valClampRGB[2] > 0 ? Math.round(valClampRGB[2] * percent) : Math.round(minColorRGB[2] + valClampRGB[2] * percent);
  return [clampedR, clampedG, clampedB];
}

// get the function that is associated with the passed returnType - RGB_ARRAY, RGB_STRING, HEX
export function getFormatFunc(returnType: string) {
  switch (returnType) {
    case 'HEX':
      return _getHex;
    case 'RGB_STRING':
      return _getRGBString;
    case 'RGB_ARRAY':
      return _getRGBArray;
    default:
      throw new Error('getColorSteps: returnType must be one of HEX, RGB_STRING, RGB_ARRAY');
  }
}

// join rgb color array into a string
export function _getRGBString(color: number[]): string {
  return `rgb(${color.join(', ')})`;
}

// return rgb color array
export function _getRGBArray(color: number[]): number[] {
  return color;
}

// convert rgb color array to hex string
export function _getHex(color: number[]): string {
  const R = pad(color[0].toString(16), 2);
  const G = pad(color[1].toString(16), 2);
  const B = pad(color[2].toString(16), 2);
  return ['#', R, G, B].join('');
}

// convert min, max colors into rgb arrays for usage within gradient utilities
export function getMinMaxColorArrays(minColor: string | number[], maxColor: string | number[]) {
  const minColorRGB: number[] | undefined = processValue(minColor);
  const maxColorRGB: number[] | undefined = processValue(maxColor);
  if (!minColorRGB) {
    throw new Error('getMinMaxColorArrays: minColor not formatted correctly or not a valid css color name.');
  }
  if (!maxColorRGB) {
    throw new Error('getMinMaxColorArrays: maxColor not formatted correctly or not a valid css color name.');
  }
  return { minColorRGB, maxColorRGB };
}
