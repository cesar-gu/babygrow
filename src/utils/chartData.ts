import type { PercentileChartData } from '@interfaces/index';

/**
 * Inicializa una estructura de datos de gráfico de percentiles
 * Evita la repetición de 11 percentiles idénticos en CalculatorForm
 * @returns Estructura con todos los percentiles vacíos
 */
export function initializePercentileChartData(): PercentileChartData {
  return {
    p1: [],
    p3: [],
    p5: [],
    p10: [],
    p25: [],
    p50: [],
    p75: [],
    p90: [],
    p95: [],
    p97: [],
    p99: [],
    userPoint: { x: 0, y: 0 },
  };
}

/**
 * Inicializa todos los gráficos necesarios
 * @returns Objeto con todos los gráficos inicializados
 */
export function initializeAllChartData(): Record<string, PercentileChartData> {
  return {
    weight: initializePercentileChartData(),
    height: initializePercentileChartData(),
    weightForHeight: initializePercentileChartData(),
    headCircumference: initializePercentileChartData(),
    bmi: initializePercentileChartData(),
  };
}

/**
 * Limpia los datos de un gráfico (útil para resetear después de cálculos)
 * @param chartData Datos del gráfico a limpiar
 */
export function resetPercentileChartData(chartData: PercentileChartData): void {
  chartData.p1 = [];
  chartData.p3 = [];
  chartData.p5 = [];
  chartData.p10 = [];
  chartData.p25 = [];
  chartData.p50 = [];
  chartData.p75 = [];
  chartData.p90 = [];
  chartData.p95 = [];
  chartData.p97 = [];
  chartData.p99 = [];
  chartData.userPoint = { x: 0, y: 0 };
}
