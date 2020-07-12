import { processValue, pad} from './helpers'

function getRGBString(color: any) {
    const rgbArray = processValue(color)
    if (!rgbArray) {
        console.error('getRGBString: Color string not formatted correctly or not a valid css color name.')
        return;
    }
    return `rgb(${rgbArray.join(', ')})`
}
function getRGBArray(color: any) {
    const rgbArray = processValue(color);
    if (!rgbArray) {
        console.error('getRGBArray: Color string not formatted correctly or not a valid css color name.')
        return;
    }
    return rgbArray;
}

function getHex(color: any) {
    const rgbArray = processValue(color)
    if (!rgbArray) {
        console.error('getHex: Color string not formatted correctly or not a valid css color name.')
        return;
    }
    const R = pad(rgbArray[0].toString(16), 2);
    const G = pad(rgbArray[1].toString(16), 2);
    const B = pad(rgbArray[2].toString(16), 2);
    return ['#', R, G, B].join('');
}

// Array of colors representing gradient
function getLinearGradient(minColor: string, maxColor: string, steps: number, inclusiveEnds: boolean=true, returnType: string='HEX') {
    let formatFunc;
    switch(returnType) {
        case 'HEX':
            formatFunc = getHex
            break
        case 'RGB_STRING':
            formatFunc = getRGBString
            break
        case 'RGB_ARRAY':
            formatFunc = getRGBArray
            break
        default:
            console.error('getColorSteps: returnType must be one of HEX, RGB_STRING, RGB_ARRAY')
            return;
    }

    var minColorRGB: any = processValue(minColor);
    var maxColorRGB: any = processValue(maxColor);

    if (!minColorRGB) {
        console.error('getColorSteps: minColor not formatted correctly or not a valid css color name.')
        return;
    }
    if (!maxColorRGB) {
        console.error('getColorSteps: maxColor not formatted correctly or not a valid css color name.')
        return;
    }
    const colors: Array<any> = []
    if (inclusiveEnds) colors.push(formatFunc(minColorRGB))
    const stepsPerc = 100 / (steps)
    let minI: number, maxI: number;
    if (inclusiveEnds) { 
        minI = 1;
        maxI = steps - 1;
    }
    else {
        minI = 0;
        maxI = steps;
    }
    for (let i = minI; i < maxI; i++) {
        var valClampRGB = [maxColorRGB[0] - minColorRGB[0], maxColorRGB[1] - minColorRGB[1], maxColorRGB[2] - minColorRGB[2]];
        var clampedR = 
            valClampRGB[0] > 0
                ? Math.round((valClampRGB[0] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[0] + (valClampRGB[0] / 100) * (stepsPerc * (i + 1)))

        var clampedG =
            valClampRGB[1] > 0
                ? Math.round((valClampRGB[1] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[1] + (valClampRGB[1] / 100) * (stepsPerc * (i + 1)))

        var clampedB =
            valClampRGB[2] > 0
                ? Math.round((valClampRGB[2] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[2] + (valClampRGB[2] / 100) * (stepsPerc * (i + 1)))
            
        if (returnType)
        colors.push(formatFunc([clampedR, clampedG, clampedB]))
    }
    if (inclusiveEnds) colors.push(formatFunc(maxColorRGB)) 
    return colors
}


// Array of objects representing steps in a data gradient 
function getLinearDataGradient(minColor: string, minVal: number, maxColor: string, maxVal: number, steps: number, inclusiveEnds: boolean=true, returnType: string='HEX') {
    let formatFunc;
    switch(returnType) {
        case 'HEX':
            formatFunc = getHex
            break
        case 'RBG_STRING':
            formatFunc = getRGBString
            break
        case 'RBG_ARRAY':
            formatFunc = getRGBArray
            break
        default:
            console.error('getColorSteps: returnType must be one of HEX, RGB_STRING, RGB_ARRAY')
            return;
    }

    var minColorRGB = processValue(minColor);
    var maxColorRGB = processValue(maxColor);
    if (!minColorRGB) {
        console.error('getColorSteps: minColor not formatted correctly or not a valid css color name.')
        return;
    }
    if (!maxColorRGB) {
        console.error('getColorSteps: maxColor not formatted correctly or not a valid css color name.')
        return;
    }
    const stepsPerc = 100 / (steps);
    const diff = maxVal - minVal
    const colors: Array<any> = []

    if (inclusiveEnds) colors.push({
        color: formatFunc(minColorRGB),
        minVal,
        maxVal: minVal + diff * stepsPerc/100 
    })
    // const colors = []
    let minI: number, maxI: number;
    if (inclusiveEnds) { 
        minI = 1;
        maxI = steps - 1;
    }
    else {
        minI = 0;
        maxI = steps;
    }
    for (let i = minI; i < maxI; i++) {
        var valClampRGB = [maxColorRGB[0] - minColorRGB[0], maxColorRGB[1] - minColorRGB[1], maxColorRGB[2] - minColorRGB[2]];
        var clampedR = 
        valClampRGB[0] > 0
            ? Math.round((valClampRGB[0] / 100) * (stepsPerc * (i + 1)))
            : Math.round(minColorRGB[0] + (valClampRGB[0] / 100) * (stepsPerc * (i + 1)))

        var clampedG =
            valClampRGB[1] > 0
                ? Math.round((valClampRGB[1] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[1] + (valClampRGB[1] / 100) * (stepsPerc * (i + 1)))

        var clampedB =
            valClampRGB[2] > 0
                ? Math.round((valClampRGB[2] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[2] + (valClampRGB[2] / 100) * (stepsPerc * (i + 1)))
            
        
        colors.push({
                color: formatFunc([clampedR, clampedG, clampedB]),
                minVal: minVal + (i) * stepsPerc/100 * diff,
                maxVal: minVal + (i+1) * stepsPerc/100 * diff
            })
    }
    // last color is max color
    if (inclusiveEnds) colors.push(
        {
            color: formatFunc(maxColorRGB),
            minVal: maxVal - diff * stepsPerc/100,
            maxVal,
        }
    ) 
    return colors
}


export { getRGBArray, getRGBString, getHex, getLinearGradient, getLinearDataGradient}