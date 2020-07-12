import {
  getRGBString,
  getRGBArray,
  getHex,
  getLinearGradient,
  getLinearDataGradient,
  getMultiColorDataGradient,
} from '../utilities';
test('getRGBString', () => {
  expect(getRGBString([123, 123, 123])).toBe('rgb(123, 123, 123)');
});
test('getRGBArray', () => {
  expect(getRGBArray([123, 123, 123])).toStrictEqual([123, 123, 123]);
});
test('getHex', () => {
  expect(getHex([255, 255, 0])).toStrictEqual('#ffff00');
});

test('getLinearGradient - inclusive - HEX', () => {
  expect(getLinearGradient('red', 'blue', 4, true, 'HEX')).toStrictEqual(['#ff0000', '#aa0055', '#5500aa', '#0000ff']);
});

test('getLinearGradient - inclusive - RGB_ARRAY', () => {
  expect(getLinearGradient('red', 'blue', 4, true, 'RGB_ARRAY')).toStrictEqual([
    [255, 0, 0],
    [170, 0, 85],
    [85, 0, 170],
    [0, 0, 255],
  ]);
});

test('getLinearGradient - inclusive - RGB_STRING', () => {
  expect(getLinearGradient('red', 'blue', 4, true, 'RGB_STRING')).toStrictEqual([
    'rgb(255, 0, 0)',
    'rgb(170, 0, 85)',
    'rgb(85, 0, 170)',
    'rgb(0, 0, 255)',
  ]);
});

test('getLinearGradient - exclusive - hex', () => {
  expect(getLinearGradient('red', 'blue', 4, false, 'HEX')).toStrictEqual(['#cc0033', '#990066', '#660099', '#3300cc']);
});

test('getLinearGradient - exclusive - RGB_ARRAY', () => {
  expect(getLinearGradient('red', 'blue', 4, false, 'RGB_ARRAY')).toStrictEqual([
    [204, 0, 51],
    [153, 0, 102],
    [102, 0, 153],
    [51, 0, 204],
  ]);
});

test('getLinearGradient - exclusive - RGB_STRING', () => {
  expect(getLinearGradient('red', 'blue', 4, false, 'RGB_STRING')).toStrictEqual([
    'rgb(204, 0, 51)',
    'rgb(153, 0, 102)',
    'rgb(102, 0, 153)',
    'rgb(51, 0, 204)',
  ]);
});

test('getLinearDataGradient - exclusive - RGB_HEX', () => {
  expect(getLinearDataGradient('red', 0, 'blue', 1, 4, false, 'HEX')).toStrictEqual([
    {
      minVal: 0,
      maxVal: 0.25,
      color: '#cc0033',
    },
    {
      minVal: 0.25,
      maxVal: 0.5,
      color: '#990066',
    },
    {
      minVal: 0.5,
      maxVal: 0.75,
      color: '#660099',
    },
    {
      minVal: 0.75,
      maxVal: 1,
      color: '#3300cc',
    },
  ]);
});

test('getLinearDataGradient - exclusive - RGB_STRING', () => {
  expect(getLinearDataGradient('red', 0, 'blue', 1, 4, false, 'RGB_STRING')).toStrictEqual([
    {
      minVal: 0,
      maxVal: 0.25,
      color: 'rgb(204, 0, 51)',
    },
    {
      minVal: 0.25,
      maxVal: 0.5,
      color: 'rgb(153, 0, 102)',
    },
    {
      minVal: 0.5,
      maxVal: 0.75,
      color: 'rgb(102, 0, 153)',
    },
    {
      minVal: 0.75,
      maxVal: 1,
      color: 'rgb(51, 0, 204)',
    },
  ]);
});

test('getLinearDataGradient - exclusive - RGB_ARRAY', () => {
  expect(getLinearDataGradient('red', 0, 'blue', 1, 4, false, 'RGB_ARRAY')).toStrictEqual([
    {
      minVal: 0,
      maxVal: 0.25,
      color: [204, 0, 51],
    },
    {
      minVal: 0.25,
      maxVal: 0.5,
      color: [153, 0, 102],
    },
    {
      minVal: 0.5,
      maxVal: 0.75,
      color: [102, 0, 153],
    },
    {
      minVal: 0.75,
      maxVal: 1,
      color: [51, 0, 204],
    },
  ]);
});

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

test('getMultiColorDataGradient - RGB_ARRAY', () => {
  expect(getMultiColorDataGradient(multiColorGradientDefinition, 12, 'RGB_ARRAY')).toStrictEqual([
    { color: [204, 0, 51], minVal: 0, maxVal: 0.25 },
    { color: [153, 0, 102], minVal: 0.25, maxVal: 0.5 },
    { color: [102, 0, 153], minVal: 0.5, maxVal: 0.75 },
    { color: [51, 0, 204], minVal: 0.75, maxVal: 1 },
    { color: [28, 28, 227], minVal: 1, maxVal: 1.25 },
    { color: [57, 57, 198], minVal: 1.25, maxVal: 1.5 },
    { color: [85, 85, 170], minVal: 1.5, maxVal: 1.75 },
    { color: [113, 113, 142], minVal: 1.75, maxVal: 2 },
    { color: [142, 142, 113], minVal: 2, maxVal: 2.25 },
    { color: [170, 170, 85], minVal: 2.25, maxVal: 2.5 },
    { color: [198, 198, 57], minVal: 2.5, maxVal: 2.75 },
    { color: [227, 227, 28], minVal: 2.75, maxVal: 3 },
  ]);
});

test('getMultiColorDataGradient - RGB_STRING', () => {
  expect(getMultiColorDataGradient(multiColorGradientDefinition, 12, 'RGB_STRING')).toStrictEqual([
    { color: 'rgb(204, 0, 51)', minVal: 0, maxVal: 0.25 },
    { color: 'rgb(153, 0, 102)', minVal: 0.25, maxVal: 0.5 },
    { color: 'rgb(102, 0, 153)', minVal: 0.5, maxVal: 0.75 },
    { color: 'rgb(51, 0, 204)', minVal: 0.75, maxVal: 1 },
    { color: 'rgb(28, 28, 227)', minVal: 1, maxVal: 1.25 },
    { color: 'rgb(57, 57, 198)', minVal: 1.25, maxVal: 1.5 },
    { color: 'rgb(85, 85, 170)', minVal: 1.5, maxVal: 1.75 },
    { color: 'rgb(113, 113, 142)', minVal: 1.75, maxVal: 2 },
    { color: 'rgb(142, 142, 113)', minVal: 2, maxVal: 2.25 },
    { color: 'rgb(170, 170, 85)', minVal: 2.25, maxVal: 2.5 },
    { color: 'rgb(198, 198, 57)', minVal: 2.5, maxVal: 2.75 },
    { color: 'rgb(227, 227, 28)', minVal: 2.75, maxVal: 3 },
  ]);
});

test('getMultiColorDataGradient - HEX', () => {
  expect(getMultiColorDataGradient(multiColorGradientDefinition, 12, 'HEX')).toStrictEqual([
    { color: '#cc0033', minVal: 0, maxVal: 0.25 },
    { color: '#990066', minVal: 0.25, maxVal: 0.5 },
    { color: '#660099', minVal: 0.5, maxVal: 0.75 },
    { color: '#3300cc', minVal: 0.75, maxVal: 1 },
    { color: '#1c1ce3', minVal: 1, maxVal: 1.25 },
    { color: '#3939c6', minVal: 1.25, maxVal: 1.5 },
    { color: '#5555aa', minVal: 1.5, maxVal: 1.75 },
    { color: '#71718e', minVal: 1.75, maxVal: 2 },
    { color: '#8e8e71', minVal: 2, maxVal: 2.25 },
    { color: '#aaaa55', minVal: 2.25, maxVal: 2.5 },
    { color: '#c6c639', minVal: 2.5, maxVal: 2.75 },
    { color: '#e3e31c', minVal: 2.75, maxVal: 3 },
  ]);
});
