import dayjs from 'dayjs';

/**
 * Clase responsable de cálculos de edad
 * Principio SOLID: Single Responsibility - solo calcula edad
 */
export class AgeCalculator {
  private readonly maxAgeInDays = 1825;

  /**
   * Calcula la diferencia de tiempo entre dos fechas
   * Método privado para evitar repetición de código dayjs()
   */
  private calculateDifference(birthDate: Date, unit: 'day' | 'month' | 'year'): number {
    const today = dayjs();
    const birth = dayjs(birthDate);
    return today.diff(birth, unit);
  }

  /**
   * Calcula los días desde el nacimiento hasta hoy
   */
  calculateAgeInDays(birthDate: Date): number {
    return this.calculateDifference(birthDate, 'day');
  }

  /**
   * Calcula los meses desde el nacimiento
   */
  calculateAgeInMonths(birthDate: Date): number {
    return this.calculateDifference(birthDate, 'month');
  }

  /**
   * Calcula los años desde el nacimiento
   */
  calculateAgeInYears(birthDate: Date): number {
    return this.calculateDifference(birthDate, 'year');
  }

  /**
   * Valida que la edad no exceda 5 años (1825 días)
   */
  isValidAge(birthDate: Date): boolean {
    const ageInDays = this.calculateAgeInDays(birthDate);
    return ageInDays >= 0 && ageInDays <= this.maxAgeInDays;
  }

  /**
   * Obtiene el mensaje de error si la edad no es válida
   */
  getAgeValidationError(birthDate: Date): string | null {
    const ageInDays = this.calculateAgeInDays(birthDate);

    if (ageInDays < 0) {
      return 'La fecha de nacimiento no puede ser en el futuro.';
    }

    if (ageInDays > this.maxAgeInDays) {
      return 'Esta herramienta está diseñada para niños de 0 a 5 años. El niño excede esta edad.';
    }

    return null;
  }

  /**
   * Obtiene la edad máxima permitida en días
   */
  getMaxAgeInDays(): number {
    return this.maxAgeInDays;
  }
}
