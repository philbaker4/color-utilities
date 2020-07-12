import { processValue, pad} from './helpers'

function getRGBString(color: any) {
    const rgbArray = processValue(color)
    if (!rgbArray) {
        throw new Error('getRGBString: Color string not formatted correctly or not a valid css color name.')
    }
    return _getRGBString(rgbArray)
}
function getRGBArray(color: any) {
    const rgbArray = processValue(color);
    if (!rgbArray) {
        throw new Error('getRGBArray: Color string not formatted correctly or not a valid css color name.')
    }
    return _getRGBArray(rgbArray);
}

function getHex(color: any) {
    const rgbArray = processValue(color)
    if (!rgbArray) {
        throw new Error('getHex: Color string not formatted correctly or not a valid css color name.')
    }
    return _getHex(rgbArray);
}

function _getRGBString(color: number[]): string {
    return `rgb(${color.join(', ')})`
}
function _getRGBArray(color: number[]): number[] {
    return color;
}
function _getHex(color: number[]): string {
    const R = pad(color[0].toString(16), 2);
    const G = pad(color[1].toString(16), 2);
    const B = pad(color[2].toString(16), 2);
    return ['#', R, G, B].join('');
}

// Array of colors representing gradient
function getLinearGradient(minColor: string | number[], maxColor: string | number[], steps: number, inclusiveEnds: boolean=true, returnType: string='HEX') {
    let formatFunc;
    switch(returnType) {
        case 'HEX':
            formatFunc = _getHex
            break
        case 'RGB_STRING':
            formatFunc = _getRGBString
            break
        case 'RGB_ARRAY':
            formatFunc = _getRGBArray
            break
        default:
            throw new Error('getColorSteps: returnType must be one of HEX, RGB_STRING, RGB_ARRAY')
    }

    const minColorRGB: number[] | undefined = processValue(minColor);
    const maxColorRGB: number[] | undefined = processValue(maxColor);

    if (!minColorRGB) {
        throw new Error('getColorSteps: minColor not formatted correctly or not a valid css color name.')
    }
    if (!maxColorRGB) {
        throw new Error('getColorSteps: maxColor not formatted correctly or not a valid css color name.')
    }
    const colors: any[]  = []
    
    if (inclusiveEnds) {
        colors.push(formatFunc(minColorRGB))
    }
    let minI: number;
    let maxI: number;
    let stepsPerc: number;
    if (inclusiveEnds) { 
        minI = 0;
        maxI = steps - 2;
        stepsPerc = 100 / (steps-1)
    }
    else {
        minI = 0;
        maxI = steps;
        stepsPerc = 100 / (steps+1)
    }
    for (let i = minI; i < maxI; i++) {
        const valClampRGB = [maxColorRGB[0] - minColorRGB[0], maxColorRGB[1] - minColorRGB[1], maxColorRGB[2] - minColorRGB[2]];
        const clampedR = 
            valClampRGB[0] > 0
                ? Math.round((valClampRGB[0] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[0] + (valClampRGB[0] / 100) * (stepsPerc * (i + 1)))

        const clampedG =
            valClampRGB[1] > 0
                ? Math.round((valClampRGB[1] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[1] + (valClampRGB[1] / 100) * (stepsPerc * (i + 1)))

        const clampedB =
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
function getLinearDataGradient(minColor: string | number[], minVal: number, maxColor: string | number[], maxVal: number, steps: number, inclusiveEnds: boolean=true, returnType: string='HEX'): DataGradientStep[] | undefined {
    let formatFunc;
    switch(returnType) {
        case 'HEX':
            formatFunc = _getHex
            break
        case 'RBG_STRING':
            formatFunc = _getRGBString
            break
        case 'RBG_ARRAY':
            formatFunc = _getRGBArray
            break
        default:
            throw new Error('getColorSteps: returnType must be one of HEX, RGB_STRING, RGB_ARRAY')
    }

    const minColorRGB = processValue(minColor);
    const maxColorRGB = processValue(maxColor);
    if (!minColorRGB) {
        throw new Error('getColorSteps: minColor not formatted correctly or not a valid css color name.')
    }
    if (!maxColorRGB) {
        throw new Error('getColorSteps: maxColor not formatted correctly or not a valid css color name.')
    }
    const diff = maxVal - minVal
    const colors: DataGradientStep[] = []

    
    // const colors = []
    let minI: number;
    let maxI: number;
    let stepsPerc: number;
    if (inclusiveEnds) { 
        minI = 0;
        maxI = steps - 2;
        stepsPerc = 100 / (steps-1)
    }
    else {
        minI = 0;
        maxI = steps;
        stepsPerc = 100 / (steps+1)
    }

    if (inclusiveEnds) {
        colors.push({
            color: formatFunc(minColorRGB),
            minVal,
            maxVal: minVal + diff * stepsPerc/100 
        })
    }
    for (let i = minI; i < maxI; i++) {
        const valClampRGB = [maxColorRGB[0] - minColorRGB[0], maxColorRGB[1] - minColorRGB[1], maxColorRGB[2] - minColorRGB[2]];
        const clampedR = 
        valClampRGB[0] > 0
            ? Math.round((valClampRGB[0] / 100) * (stepsPerc * (i + 1)))
            : Math.round(minColorRGB[0] + (valClampRGB[0] / 100) * (stepsPerc * (i + 1)))

        const clampedG =
            valClampRGB[1] > 0
                ? Math.round((valClampRGB[1] / 100) * (stepsPerc * (i + 1)))
                : Math.round(minColorRGB[1] + (valClampRGB[1] / 100) * (stepsPerc * (i + 1)))

        const clampedB =
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



// Array of objects representing steps in a multicolor data gradient
function getMultiColorDataGradient(gradientDefinition: GradientDefinition[], steps:number = 100) {
    const minVal = gradientDefinition[0].minVal
    const maxVal = gradientDefinition[gradientDefinition.length-1].maxVal
    const overallDiff = maxVal - minVal
    let gradient: DataGradientStep[] = []
    for (const gr of gradientDefinition) {
        const diff = gr.maxVal - gr.minVal
        const numSteps = Math.round(steps * diff / overallDiff)
        const grad = getLinearDataGradient(gr.minColor, gr.minVal, gr.maxColor, gr.maxVal, numSteps, false)
        if (grad) gradient = gradient.concat(grad)
    }
    return gradient
}



export { getRGBArray, getRGBString, getHex, getLinearGradient, getLinearDataGradient, getMultiColorDataGradient}