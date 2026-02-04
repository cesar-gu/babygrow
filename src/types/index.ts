export type Gender = 'male' | 'female';

export type MetricType = 'weight' | 'height' | 'weight_for_height' | 'head_circumference' | 'bmi';

export interface PercentileData {
  age: number;
  p1: number | null;
  p3: number | null;
  p5: number | null;
  p10: number | null;
  p25: number | null;
  p50: number | null;
  p75: number | null;
  p90: number | null;
  p95: number | null;
  p97: number | null;
  p99: number | null;
}

export interface PercentileDataset {
  type: string;
  version: string;
  lastUpdated: string;
  totalRecords: number;
  ageRange: {
    min: number;
    max: number;
  };
  percentiles: string[];
  data: PercentileData[];
}

export interface ChildMetrics {
  birthDate: Date;
  gender: Gender;
  weight?: number;
  height?: number;
  headCircumference?: number;
}

export interface PercentileResult {
  value: number;
  percentile: number;
  interpretation: InterpretationResult;
}

/**
 * Alias para PercentileResult para mayor claridad semántica
 */
export type MetricResult = PercentileResult;

export interface CalculationResult {
  ageInDays: number;
  ageInMonths: number;
  ageInYears: number;
  metrics: {
    weight?: PercentileResult;
    height?: PercentileResult;
    weightForHeight?: PercentileResult;
    headCircumference?: PercentileResult;
    bmi?: PercentileResult;
  };
}

export interface PercentileResult {
  value: number;
  percentile: number;
  interpretation: InterpretationResult;
}

export interface InterpretationResult {
  level: 'critical_low' | 'warning_low' | 'normal' | 'warning_high' | 'critical_high';
  color: string;
  text: string;
  icon: string;
}

export interface ChartDataPoint {
  x: number;
  y: number;
}

export interface PercentileChartData {
  p1: ChartDataPoint[];
  p3: ChartDataPoint[];
  p5: ChartDataPoint[];
  p10: ChartDataPoint[];
  p25: ChartDataPoint[];
  p50: ChartDataPoint[];
  p75: ChartDataPoint[];
  p90: ChartDataPoint[];
  p95: ChartDataPoint[];
  p97: ChartDataPoint[];
  p99: ChartDataPoint[];
  userPoint: ChartDataPoint;
}
