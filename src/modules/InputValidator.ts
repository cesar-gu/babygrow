import type { ChildMetrics } from '@interfaces/index';

/**
 * Clase responsable de validar la entrada del usuario
 * Principio SOLID: Single Responsibility - solo valida entrada
 */
export class InputValidator {
  private readonly maxAgeInDays = 1825;

  /**
   * Valida que la fecha de nacimiento sea válida
   */
  isValidBirthDate(birthDate: Date): boolean {
    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
      return false;
    }

    const today = new Date();
    return birthDate <= today;
  }

  /**
   * Valida que el sexo sea válido (male o female)
   */
  isValidGender(gender: string): boolean {
    return gender === 'male' || gender === 'female';
  }

  /**
   * Valida que el peso sea válido
   */
  isValidWeight(weight: number): boolean {
    return weight > 0 && weight <= 50;
  }

  /**
   * Valida que la talla sea válida
   */
  isValidHeight(height: number): boolean {
    return height > 0 && height <= 150;
  }

  /**
   * Valida que la circunferencia de la cabeza sea válida
   */
  isValidHeadCircumference(headCircumference: number): boolean {
    return headCircumference > 0 && headCircumference <= 60;
  }

  /**
   * Valida que al menos una métrica esté presente
   */
  hasAtLeastOneMetric(metrics: {
    weight?: number;
    height?: number;
    headCircumference?: number;
  }): boolean {
    return (
      metrics.weight !== undefined ||
      metrics.height !== undefined ||
      metrics.headCircumference !== undefined
    );
  }

  /**
   * Valida los datos completos del niño
   */
  validateChildMetrics(metrics: ChildMetrics): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!this.isValidBirthDate(metrics.birthDate)) {
      errors.push('La fecha de nacimiento no es válida.');
    }

    if (!this.isValidGender(metrics.gender)) {
      errors.push('El sexo debe ser "male" o "female".');
    }

    if (!this.hasAtLeastOneMetric(metrics)) {
      errors.push(
        'Debe proporcionar al menos una métrica: talla, peso o circunferencia de la cabeza.'
      );
    }

    if (metrics.weight !== undefined && !this.isValidWeight(metrics.weight)) {
      errors.push('El peso debe estar entre 0 y 50 kg.');
    }

    if (metrics.height !== undefined && !this.isValidHeight(metrics.height)) {
      errors.push('La talla debe estar entre 0 y 150 cm.');
    }

    if (
      metrics.headCircumference !== undefined &&
      !this.isValidHeadCircumference(metrics.headCircumference)
    ) {
      errors.push('La circunferencia de la cabeza debe estar entre 0 y 60 cm.');
    }

    const today = new Date();
    const ageInDays = (today.getTime() - metrics.birthDate.getTime()) / (1000 * 60 * 60 * 24);

    if (ageInDays > this.maxAgeInDays) {
      errors.push('Esta herramienta está diseñada para niños de 0 a 5 años.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
