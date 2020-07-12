import { getRGBString, getRGBArray, getHex, getLinearGradient } from '../utilities'
test('getRGBString', () => {
    expect(getRGBString([123,123,123])).toBe('rgb(123, 123, 123)')
})
test('getRGBArray', () => {
    expect(getRGBArray([123,123,123])).toStrictEqual([123, 123, 123])
})
test('getHex', () => {
    expect(getHex([255, 255, 0])).toStrictEqual('#ffff00')
})

test('getLinearGradient - inclusive - HEX', () => {
    expect(getLinearGradient('red', 'blue', 4,  true, 'HEX')).toStrictEqual(["#ff0000", "#aa0055", "#5500aa", "#0000ff"])
})

test('getLinearGradient - inclusive - RGB_ARRAY', () => {
    expect(getLinearGradient('red', 'blue', 4,  true, 'RGB_ARRAY')).toStrictEqual([[255, 0, 0], [170, 0, 85], [85, 0, 170], [0, 0, 255]])
})

test('getLinearGradient - inclusive - RGB_STRING', () => {
    expect(getLinearGradient('red', 'blue', 4,  true, 'RGB_STRING')).toStrictEqual(['rgb(255, 0, 0)', 'rgb(170, 0, 85)', 'rgb(85, 0, 170)', 'rgb(0, 0, 255)'])
})

test('getLinearGradient - exclusive - hex', () => {
    expect(getLinearGradient('red', 'blue', 4,  false, 'HEX')).toStrictEqual(["#cc0033", "#990066", "#660099", "#3300cc"])
})

test('getLinearGradient - exclusive - RGB_ARRAY', () => {
    expect(getLinearGradient('red', 'blue', 4,  false, 'RGB_ARRAY')).toStrictEqual([ [ 204, 0, 51 ], [ 153, 0, 102 ], [ 102, 0, 153 ], [ 51, 0, 204 ] ] )
})

test('getLinearGradient - exclusive - RGB_STRING', () => {
    expect(getLinearGradient('red', 'blue', 4,  false, 'RGB_STRING')).toStrictEqual([ 'rgb(204, 0, 51)', 'rgb(153, 0, 102)', 'rgb(102, 0, 153)', 'rgb(51, 0, 204)' ] )
})