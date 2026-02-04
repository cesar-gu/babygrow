import { AgeCalculator } from './AgeCalculator';
import { PercentileInterpolator } from './PercentileInterpolator';
import { BMICalculator } from './BMICalculator';
import { ResultInterpreter } from './ResultInterpreter';
import { InputValidator } from './InputValidator';
import { roundValue } from '@utils/formatting';
import type {
  ChildMetrics,
  CalculationResult,
  PercentileDataset,
  MetricResult,
} from '@interfaces/index';

/**
 * Servicio principal que orquesta los cálculos
 * Principio SOLID: Facade pattern - proporciona interfaz simplificada
 */
export class PercentileCalculationService {
  private ageCalculator: AgeCalculator;
  private percentileInterpolator: PercentileInterpolator;
  private bmiCalculator: BMICalculator;
  private resultInterpreter: ResultInterpreter;
  private inputValidator: InputValidator;

  constructor() {
    this.ageCalculator = new AgeCalculator();
    this.percentileInterpolator = new PercentileInterpolator();
    this.bmiCalculator = new BMICalculator();
    this.resultInterpreter = new ResultInterpreter();
    this.inputValidator = new InputValidator();
  }

  /**
   * Realiza el cálculo completo de percentiles
   */
  calculatePercentiles(
    metrics: ChildMetrics,
    datasets: {
      wfaDataset: PercentileDataset;
      lhfaDataset: PercentileDataset;
      wflDataset: PercentileDataset;
      hcfaDataset: PercentileDataset;
      bfaDataset: PercentileDataset;
    }
  ): CalculationResult | { error: string } {
    const validation = this.inputValidator.validateChildMetrics(metrics);
    if (!validation.isValid) {
      return { error: validation.errors.join(' ') };
    }

    const ageValidationError = this.ageCalculator.getAgeValidationError(metrics.birthDate);
    if (ageValidationError) {
      return { error: ageValidationError };
    }

    const ageInDays = this.ageCalculator.calculateAgeInDays(metrics.birthDate);
    const ageInMonths = this.ageCalculator.calculateAgeInMonths(metrics.birthDate);
    const ageInYears = this.ageCalculator.calculateAgeInYears(metrics.birthDate);

    const result: CalculationResult = {
      ageInDays,
      ageInMonths,
      ageInYears,
      metrics: {},
    };

    if (metrics.weight !== undefined) {
      const metricResult = this.calculateMetric(datasets.wfaDataset, ageInDays, metrics.weight);
      if (metricResult) {
        result.metrics.weight = metricResult;
      }
    }

    if (metrics.height !== undefined) {
      const metricResult = this.calculateMetric(datasets.lhfaDataset, ageInDays, metrics.height);
      if (metricResult) {
        result.metrics.height = metricResult;
      }
    }

    if (metrics.weight !== undefined && metrics.height !== undefined) {
      const metricResult = this.calculateMetric(
        datasets.wflDataset,
        metrics.height,
        metrics.weight
      );
      if (metricResult) {
        result.metrics.weightForHeight = metricResult;
      }
    }

    if (metrics.headCircumference !== undefined) {
      const metricResult = this.calculateMetric(
        datasets.hcfaDataset,
        ageInDays,
        metrics.headCircumference
      );
      if (metricResult) {
        result.metrics.headCircumference = metricResult;
      }
    }

    if (metrics.weight !== undefined && metrics.height !== undefined) {
      const bmi = this.bmiCalculator.calculateBMI(metrics.weight, metrics.height);
      const percentile = this.percentileInterpolator.calculatePercentile(
        datasets.bfaDataset,
        ageInDays,
        bmi
      );
      if (percentile !== null) {
        result.metrics.bmi = {
          value: roundValue(bmi, 2),
          percentile: roundValue(percentile, 2),
          interpretation: this.resultInterpreter.interpret(percentile),
        };
      }
    }

    return result;
  }

  /**
   * Calcula una métrica individual
   * @param dataset Dataset a usar
   * @param age Edad (en días o cm según la métrica)
   * @param value Valor medido
   * @param metricType Tipo de métrica para redondeo consistente
   * @returns Resultado de la métrica o null si el cálculo falla
   */
  private calculateMetric(
    dataset: PercentileDataset,
    age: number,
    value: number
  ): MetricResult | null {
    const percentile = this.percentileInterpolator.calculatePercentile(dataset, age, value);
    if (percentile === null) {
      return null;
    }

    return {
      value: roundValue(value, 2),
      percentile: roundValue(percentile, 2),
      interpretation: this.resultInterpreter.interpret(percentile),
    };
  }
}
