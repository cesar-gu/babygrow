import type { PercentileDataset, Gender } from '@interfaces/index';

/**
 * Gestiona la selección de datasets basada en género
 * Centraliza la lógica repetida en PercentileCalculationService y CalculatorForm
 */

/**
 * Tipo para mapear datasets por género
 */
interface DatasetMap {
  male: PercentileDataset;
  female: PercentileDataset;
}

/**
 * Selecciona el dataset correcto basado en el género
 * @param gender Género del niño
 * @param maleDataset Dataset para niños
 * @param femaleDataset Dataset para niñas
 * @returns Dataset seleccionado
 */
export function selectDatasetByGender(
  gender: Gender,
  maleDataset: PercentileDataset,
  femaleDataset: PercentileDataset
): PercentileDataset {
  return gender === 'male' ? maleDataset : femaleDataset;
}

/**
 * Selecciona múltiples datasets a la vez
 * @param gender Género del niño
 * @param datasets Objeto con todos los datasets (male y female)
 * @returns Objeto con datasets seleccionados
 */
export function selectAllDatasetsByGender(
  gender: Gender,
  datasets: {
    wfa: DatasetMap;
    lhfa: DatasetMap;
    wfl: DatasetMap;
    hcfa: DatasetMap;
    bfa: DatasetMap;
  }
): {
  wfaDataset: PercentileDataset;
  lhfaDataset: PercentileDataset;
  wflDataset: PercentileDataset;
  hcfaDataset: PercentileDataset;
  bfaDataset: PercentileDataset;
} {
  const genderKey = gender === 'male' ? 'male' : 'female';

  return {
    wfaDataset: datasets.wfa[genderKey],
    lhfaDataset: datasets.lhfa[genderKey],
    wflDataset: datasets.wfl[genderKey],
    hcfaDataset: datasets.hcfa[genderKey],
    bfaDataset: datasets.bfa[genderKey],
  };
}
