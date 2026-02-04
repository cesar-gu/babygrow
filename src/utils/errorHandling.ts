/**
 * Funciones para manejo de errores de validación
 * Centraliza la lógica repetida de limpieza y gestión de errores
 */

/**
 * Tipo para objetos de errores en formularios
 */
export interface FormErrors {
  birthDate?: string;
  gender?: string;
  weight?: string;
  height?: string;
  headCircumference?: string;
  general?: string;
  [key: string]: string | undefined;
}

/**
 * Limpia todos los errores de un objeto de errores
 * Reemplaza la lógica repetida Object.assign(errors, {...})
 * @param errors Objeto de errores a limpiar
 */
export function clearErrors(errors: FormErrors): void {
  errors.birthDate = '';
  errors.gender = '';
  errors.weight = '';
  errors.height = '';
  errors.headCircumference = '';
  errors.general = '';
}

/**
 * Establece un error específico
 * @param errors Objeto de errores
 * @param field Campo donde establecer el error
 * @param message Mensaje de error
 */
export function setError(errors: FormErrors, field: keyof FormErrors, message: string): void {
  errors[field] = message;
}

/**
 * Obtiene el primer error disponible
 * @param errors Objeto de errores
 * @returns Primer error encontrado o null
 */
export function getFirstError(errors: FormErrors): string | null {
  for (const key in errors) {
    if (errors[key as keyof FormErrors]) {
      return errors[key as keyof FormErrors] || null;
    }
  }
  return null;
}

/**
 * Valida que la fecha de nacimiento esté completa
 */
export const ERROR_BIRTH_DATE_REQUIRED = 'La fecha de nacimiento es obligatoria.';

/**
 * Valida que el género esté seleccionado
 */
export const ERROR_GENDER_REQUIRED = 'El sexo es obligatorio.';

/**
 * Valida que al menos una métrica esté presente
 */
export const ERROR_NO_METRICS =
  'Debe proporcionar al menos una métrica: talla, peso o perímetro cefálico.';

/**
 * Error cuando falta peso
 */
export const ERROR_WEIGHT_INVALID = 'El peso debe estar entre 0 y 50 kg.';

/**
 * Error cuando falta altura
 */
export const ERROR_HEIGHT_INVALID = 'La talla debe estar entre 0 y 150 cm.';

/**
 * Error cuando falta perímetro cefálico
 */
export const ERROR_HEAD_CIRCUMFERENCE_INVALID =
  'La circunferencia de la cabeza debe estar entre 0 y 60 cm.';
