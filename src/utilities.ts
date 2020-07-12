import {
  processValue,
  pad,
  getInterpolatedColor,
  _getHex,
  _getRGBArray,
  _getRGBString,
  getFormatFunc,
  getMinMaxColorArrays,
} from './helpers';
import { DataGradientStep, GradientDefinition } from './types';
function getRGBString(color: any) {
  const rgbArray = processValue(color);
  if (!rgbArray) {
    throw new Error('getRGBString: Color string not formatted correctly or not a valid css color name.');
  }
  return _getRGBString(rgbArray);
}
function getRGBArray(color: any) {
  const rgbArray = processValue(color);
  if (!rgbArray) {
    throw new Error('getRGBArray: Color string not formatted correctly or not a valid css color name.');
  }
  return _getRGBArray(rgbArray);
}

function getHex(color: any) {
  const rgbArray = processValue(color);
  if (!rgbArray) {
    throw new Error('getHex: Color string not formatted correctly or not a valid css color name.');
  }
  return _getHex(rgbArray);
}

// Array of colors representing gradient
function getLinearGradient(
  minColor: string | number[],
  maxColor: string | number[],
  steps: number,
  inclusiveEnds: boolean = true,
  returnType: string = 'HEX',
) {
  const formatFunc = getFormatFunc(returnType);

  const { minColorRGB, maxColorRGB } = getMinMaxColorArrays(minColor, maxColor);
  const colors: any[] = [];

  if (inclusiveEnds) {
    colors.push(formatFunc(minColorRGB));
  }
  let minI: number;
  let maxI: number;
  let colorStepPercent: number;
  if (inclusiveEnds) {
    minI = 0;
    maxI = steps - 2;
    colorStepPercent = 100 / (steps - 1);
  } else {
    minI = 0;
    maxI = steps;
    colorStepPercent = 100 / (steps + 1);
  }
  for (let i = minI; i < maxI; i++) {
    const color = getInterpolatedColor(minColorRGB, maxColorRGB, (colorStepPercent * (i + 1)) / 100);

    if (formatFunc) colors.push(formatFunc(color));
  }
  if (inclusiveEnds) colors.push(formatFunc(maxColorRGB));
  return colors;
}

// Array of objects representing steps in a data gradient
function getDataGradient(
  minColor: string | number[],
  minVal: number,
  maxColor: string | number[],
  maxVal: number,
  steps: number,
  inclusiveEnds: boolean = true,
  returnType: string = 'HEX',
): DataGradientStep[] | undefined {
  const formatFunc = getFormatFunc(returnType);
  const { minColorRGB, maxColorRGB } = getMinMaxColorArrays(minColor, maxColor);

  const diff = maxVal - minVal;
  const colors: DataGradientStep[] = [];

  const stepSizePercent: number = 100 / steps;
  // const colors = []
  let minI: number;
  let maxI: number;
  let colorStepPercent: number;
  if (inclusiveEnds) {
    minI = 0;
    maxI = steps - 2;
    colorStepPercent = 100 / (steps - 1);
  } else {
    minI = 0;
    maxI = steps;
    colorStepPercent = 100 / (steps + 1);
  }

  if (inclusiveEnds) {
    colors.push({
      color: formatFunc(minColorRGB),
      minVal,
      maxVal: minVal + (diff * stepSizePercent) / 100,
    });
  }
  for (let i = minI; i < maxI; i++) {
    const color = getInterpolatedColor(minColorRGB, maxColorRGB, (colorStepPercent * (i + 1)) / 100);

    colors.push({
      color: formatFunc(color),
      minVal: minVal + ((i * stepSizePercent) / 100) * diff,
      maxVal: minVal + (((i + 1) * stepSizePercent) / 100) * diff,
    });
  }
  // last color is max color
  if (inclusiveEnds)
    colors.push({
      color: formatFunc(maxColorRGB),
      minVal: maxVal - (diff * stepSizePercent) / 100,
      maxVal,
    });
  return colors;
}

// Array of objects representing steps in a multicolor data gradient
function getMultiColorDataGradient(gradientDefinition: GradientDefinition[], steps: number = 100, returnType: string) {
  const minVal = gradientDefinition[0].minVal;
  const maxVal = gradientDefinition[gradientDefinition.length - 1].maxVal;
  const overallDiff = maxVal - minVal;
  let gradient: DataGradientStep[] = [];
  for (const gr of gradientDefinition) {
    const diff = gr.maxVal - gr.minVal;
    const numSteps = Math.round((steps * diff) / overallDiff);
    const grad = getDataGradient(gr.minColor, gr.minVal, gr.maxColor, gr.maxVal, numSteps, false, returnType);
    if (grad) gradient = gradient.concat(grad);
  }
  return gradient;
}

// adjust saturation of a color
function changeSaturation(color: string | number[], percent: number, returnType: string = 'HEX') {
  if (percent < -1 || percent > 1)
    console.warn('changeSaturation: percent should be a decimal representation in [-1,1]');
  const formatFunc = getFormatFunc(returnType);
  const processedColor = processValue(color);
  if (!processedColor)
    throw new Error('changeSaturation: Color string not formatted correctly or not a valid css color name.');
  const oldR = processedColor[0];
  const oldG = processedColor[1];
  const oldB = processedColor[2];
  const R = Math.round(Math.min(Math.max(0, oldR + 255 * percent), 255));
  const G = Math.round(Math.min(Math.max(0, oldG + 255 * percent), 255));
  const B = Math.round(Math.min(Math.max(0, oldB + 255 * percent), 255));
  return formatFunc([R, G, B]);
}

function getColorFromDataGradient(
  minColor: string | number[],
  minVal: number,
  maxColor: string | number[],
  maxVal: number,
  steps: number,
  value: number,
  inclusiveEnds: boolean = true,
  returnType: string = 'HEX',
  byStep: boolean = true,
) {
  const formatFunc = getFormatFunc(returnType);
  const { minColorRGB, maxColorRGB } = getMinMaxColorArrays(minColor, maxColor);

  if (value < minVal) throw new Error('getColorFromLinearGradient: value is less than minVal');
  if (value > maxVal) throw new Error('getColorFromLinearGradient: value is greater than maxVal');

  const diff = maxVal - minVal;

  if (byStep) {
    const stepSize = diff / steps;

    let colorStepPercent: number;
    if (inclusiveEnds) {
      colorStepPercent = 100 / (steps - 1);
    } else {
      colorStepPercent = 100 / (steps + 1);
    }

    // for now, assuming value is between min, max
    const valStep = Math.floor((value - minVal) / stepSize);
    if (inclusiveEnds) {
      if (valStep === 0) return formatFunc(minColorRGB);
      else if (valStep === steps - 1) return formatFunc(maxColorRGB);
    }
    const color = getInterpolatedColor(minColorRGB, maxColorRGB, (colorStepPercent * (valStep + 1)) / 100);
    return formatFunc(color);
  } else {
    const color = getInterpolatedColor(minColorRGB, maxColorRGB, (value - minVal) / diff);
    return formatFunc(color);
  }
}

function getColorFromMultiColorDataGradient(
  gradientDefinition: GradientDefinition[],
  steps: number,
  value: number,
  returnType?: string,
  byStep: boolean = true,
) {
  if (gradientDefinition.length === 0) throw new Error('getColorFromMultiColorLinearGradient: gradient has no values');
  if (value < gradientDefinition[0].minVal)
    throw new Error('getColorFromMultiColorLinearGradient: value is below the gradient');
  if (value > gradientDefinition[gradientDefinition.length - 1].maxVal)
    throw new Error('getColorFromMultiColorLinearGradient: value is above the gradient');

  const minVal = gradientDefinition[0].minVal;
  const maxVal = gradientDefinition[gradientDefinition.length - 1].maxVal;
  const overallDiff = maxVal - minVal;

  for (let step of gradientDefinition) {
    if (value > step.minVal && value <= step.maxVal) {
      const diff = step.maxVal - step.minVal;
      const numSteps = Math.round((steps * diff) / overallDiff);
      return getColorFromDataGradient(
        step.minColor,
        step.minVal,
        step.maxColor,
        step.maxVal,
        numSteps,
        value,
        false,
        returnType,
        byStep,
      );
    }
  }
}

export {
  getRGBArray,
  getRGBString,
  getHex,
  getLinearGradient,
  getDataGradient,
  getMultiColorDataGradient,
  changeSaturation,
  getColorFromDataGradient,
  getColorFromMultiColorDataGradient,
};
