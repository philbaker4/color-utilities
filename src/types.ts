export interface DataGradientStep {
  minVal: number;
  maxVal: number;
  color: string | number[];
}

export interface GradientDefinition {
  minVal: number;
  minColor: string | number[];
  maxVal: number;
  maxColor: string | number[];
}
