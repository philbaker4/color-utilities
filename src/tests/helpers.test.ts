import { processValue } from '../helpers';

test('processValue - hex', () => {
  expect(processValue('#ffffff')).toStrictEqual([255, 255, 255]);
});
test('processValue - rgb', () => {
  expect(processValue('rgb(10, 10, 10)')).toStrictEqual([10, 10, 10]);
});
test('processValue - rgba', () => {
  expect(processValue('rgba(10, 10, 10, 100)')).toStrictEqual([10, 10, 10]);
});

test('processValue - css color', () => {
  expect(processValue('red')).toStrictEqual([255, 0, 0]);
});

test('processValue - css color', () => {
  expect(processValue([123, 123, 123])).toStrictEqual([123, 123, 123]);
});
