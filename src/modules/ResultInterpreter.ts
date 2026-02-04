import type { InterpretationResult } from '@interfaces/index';

/**
 * Clase responsable de interpretar percentiles y proporcionar contexto visual
 * Principio SOLID: Single Responsibility - solo interpreta resultados
 */
export class ResultInterpreter {
  private readonly criticalLowPercentile = 5;
  private readonly warningLowPercentile = 10;
  private readonly warningHighPercentile = 90;
  private readonly criticalHighPercentile = 95;

  /**
   * Interpreta un valor de percentil y devuelve información visual
   */
  interpret(percentile: number): InterpretationResult {
    if (percentile < this.criticalLowPercentile) {
      return {
        level: 'critical_low',
        color: '#ef4444',
        text: 'Muy por debajo de lo esperado. Se recomienda consulta médica.',
        icon: '⚠️',
      };
    }

    if (percentile < this.warningLowPercentile) {
      return {
        level: 'warning_low',
        color: '#f97316',
        text: 'Por debajo de lo esperado. Recomendamos seguimiento.',
        icon: '⚠️',
      };
    }

    if (percentile <= this.warningHighPercentile) {
      return {
        level: 'normal',
        color: '#3b82f6',
        text: 'Dentro del rango normal.',
        icon: '✓',
      };
    }

    if (percentile <= this.criticalHighPercentile) {
      return {
        level: 'warning_high',
        color: '#f97316',
        text: 'Por encima de lo esperado. Recomendamos seguimiento.',
        icon: '⚠️',
      };
    }

    return {
      level: 'critical_high',
      color: '#ef4444',
      text: 'Muy por encima de lo esperado. Se recomienda consulta médica.',
      icon: '⚠️',
    };
  }

  /**
   * Obtiene el color específico para un percentil
   */
  getPercentileColor(percentile: number): string {
    return this.interpret(percentile).color;
  }

  /**
   * Obtiene el nivel de riesgo
   */
  getRiskLevel(percentile: number): string {
    const interpretation = this.interpret(percentile);
    return interpretation.level;
  }
}
