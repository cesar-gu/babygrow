/**
 * Funciones de formateo y redondeo de números
 * Centraliza la lógica de Math.round que se repite en múltiples módulos
 */

/**
 * Redondea un número a 2 decimales
 * @param value Valor a redondear
 * @param decimals Número de decimales (por defecto 2)
 * @returns Valor redondeado
 */
export function roundValue(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Redondea un percentil a 2 decimales
 * @param percentile Valor del percentil (0-100)
 * @returns Percentil redondeado
 */
export function roundPercentile(percentile: number): number {
  return roundValue(percentile, 2);
}

/**
 * Redondea el IMC a 2 decimales
 * @param bmi Índice de Masa Corporal
 * @returns IMC redondeado
 */
export function roundBMI(bmi: number): number {
  return roundValue(bmi, 2);
}

/**
 * Redondea una métrica de peso a 2 decimales
 * @param weight Peso en kilogramos
 * @returns Peso redondeado
 */
export function roundWeight(weight: number): number {
  return roundValue(weight, 2);
}

/**
 * Redondea una métrica de altura a 2 decimales
 * @param height Altura en centímetros
 * @returns Altura redondeada
 */
export function roundHeight(height: number): number {
  return roundValue(height, 2);
}

/**
 * Redondea perímetro cefálico a 2 decimales
 * @param circumference Perímetro en centímetros
 * @returns Perímetro redondeado
 */
export function roundCircumference(circumference: number): number {
  return roundValue(circumference, 2);
}
