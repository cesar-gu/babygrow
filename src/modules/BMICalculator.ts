import { roundBMI } from '@utils/formatting';

/**
 * Clase responsable de calcular el IMC
 * Principio SOLID: Single Responsibility - solo calcula IMC
 */
export class BMICalculator {
  /**
   * Calcula el IMC dado el peso y altura
   * @param weight Peso en kilogramos
   * @param height Altura en centímetros
   * @returns IMC (kg/m²)
   */
  calculateBMI(weight: number, height: number): number {
    if (weight <= 0 || height <= 0) {
      throw new Error('El peso y la altura deben ser valores positivos');
    }

    const heightInMeters = height / 100;

    return weight / (heightInMeters * heightInMeters);
  }

  /**
   * Redondea el IMC a 2 decimales
   * Utiliza función centralizada de formatting
   */
  roundBMI(bmi: number): number {
    return roundBMI(bmi);
  }

  /**
   * Valida que los valores sean adecuados para cálculo de IMC
   */
  isValidInput(weight: number, height: number): boolean {
    return weight > 0 && weight < 50 && height > 0 && height < 200;
  }
}
