import type { PercentileData, PercentileDataset } from '@interfaces/index';

/**
 * Clase responsable de interpolar percentiles
 * Principio SOLID: Single Responsibility - solo calcula interpolación
 */
export class PercentileInterpolator {
  /**
   * Busca el valor de un percentil específico para una edad exacta
   * Utiliza interpolación lineal entre dos puntos de datos
   */
  interpolate(
    dataset: PercentileDataset,
    ageInDays: number,
    percentileKey: keyof Omit<PercentileData, 'age'>
  ): number | null {
    if (ageInDays < dataset.ageRange.min || ageInDays > dataset.ageRange.max) {
      return null;
    }

    const exactDay = dataset.data.find((d) => d.age === ageInDays);
    if (exactDay) {
      return exactDay[percentileKey] || null;
    }

    let before: PercentileData | null = null;
    let after: PercentileData | null = null;

    for (let i = 0; i < dataset.data.length; i++) {
      if (dataset.data[i].age < ageInDays) {
        before = dataset.data[i];
      }
      if (dataset.data[i].age > ageInDays && !after) {
        after = dataset.data[i];
        break;
      }
    }

    if (!before || !after) {
      return null;
    }

    const beforeValue = before[percentileKey];
    const afterValue = after[percentileKey];

    if (beforeValue === null || afterValue === null) {
      return null;
    }

    return this.linearInterpolation(before.age, beforeValue, after.age, afterValue, ageInDays);
  }

  /**
   * Calcula la interpolación lineal entre dos puntos
   */
  private linearInterpolation(x1: number, y1: number, x2: number, y2: number, x: number): number {
    if (x2 === x1) return y1;
    return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
  }

  /**
   * Calcula el percentil en el que cae un valor específico
   * Utiliza interpolación para encontrar el percentil exacto
   */
  calculatePercentile(
    dataset: PercentileDataset,
    ageInDays: number,
    measuredValue: number
  ): number | null {
    const percentiles: Array<{ key: keyof Omit<PercentileData, 'age'>; name: string }> = [
      { key: 'p1', name: 'P1' },
      { key: 'p3', name: 'P3' },
      { key: 'p5', name: 'P5' },
      { key: 'p10', name: 'P10' },
      { key: 'p25', name: 'P25' },
      { key: 'p50', name: 'P50' },
      { key: 'p75', name: 'P75' },
      { key: 'p90', name: 'P90' },
      { key: 'p95', name: 'P95' },
      { key: 'p97', name: 'P97' },
      { key: 'p99', name: 'P99' },
    ];

    const values: Array<{ percentile: number; value: number | null }> = percentiles.map((p) => ({
      percentile: Number(p.name.substring(1)),
      value: this.interpolate(dataset, ageInDays, p.key),
    }));

    const validValues = values.filter((v) => v.value !== null) as Array<{
      percentile: number;
      value: number;
    }>;

    if (validValues.length === 0) {
      return null;
    }

    if (measuredValue < validValues[0].value) {
      return 0.5;
    }

    if (measuredValue > validValues[validValues.length - 1].value) {
      return 99.5;
    }

    for (let i = 0; i < validValues.length - 1; i++) {
      if (measuredValue >= validValues[i].value && measuredValue <= validValues[i + 1].value) {
        return this.linearInterpolation(
          validValues[i].value,
          validValues[i].percentile,
          validValues[i + 1].value,
          validValues[i + 1].percentile,
          measuredValue
        );
      }
    }

    return null;
  }
}
