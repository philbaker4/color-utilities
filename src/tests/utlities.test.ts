import { getRGBString, getRGBArray, getHex } from '../utilities'
test('getRGBString', () => {
    expect(getRGBString([123,123,123])).toBe('rgb(123, 123, 123)')
})
test('getRGBArray', () => {
    expect(getRGBArray([123,123,123])).toStrictEqual([123, 123, 123])
})
test('getHex', () => {
    expect(getHex([255, 255, 0])).toStrictEqual('#ffff00')
})