<template>
  <div class="space-y-6 md:space-y-8">
    <!-- Formulario de entrada -->
    <div class="card">
      <h2 class="mb-6 text-xl font-bold text-gray-900 md:text-2xl">Información del niño/a</h2>

      <form @submit.prevent="handleSubmit" class="space-y-5 md:space-y-6">
        <!-- Fecha de nacimiento y Género -->
        <div class="grid gap-4 md:grid-cols-2 md:gap-6">
          <!-- Fecha de nacimiento -->
          <FormInput
            id="birthDate"
            label="Fecha de nacimiento"
            type="date"
            :model-value="form.birthDate"
            @update:model-value="
              form.birthDate =
                typeof $event === 'string'
                  ? $event
                  : typeof $event === 'number'
                    ? $event.toString()
                    : ''
            "
            required
            :error="errors.birthDate"
          />

          <!-- Género -->
          <FormSelect
            id="gender"
            label="Sexo del niño/a"
            :model-value="form.gender"
            :options="[
              { value: 'male', label: 'Niño (Masculino)' },
              { value: 'female', label: 'Niña (Femenino)' },
            ]"
            @update:model-value="form.gender = $event as Gender"
            required
            :error="errors.gender"
          />
        </div>

        <!-- Métricas -->
        <div class="space-y-4 rounded-lg bg-primary-light p-4">
          <p class="text-sm font-medium text-gray-700">Métricas (introduzca al menos una):</p>

          <FormInput
            id="weight"
            label="Peso (kg)"
            type="number"
            :model-value="form.weight"
            @update:model-value="
              form.weight =
                typeof $event === 'number' ? $event : $event ? parseFloat($event) : undefined
            "
            placeholder="ej: 7.5"
            step="0.001"
            min="0"
            max="50"
            :error="errors.weight"
            hint="Rango: 0-50 kg"
          />

          <FormInput
            id="height"
            label="Talla (cm)"
            type="number"
            :model-value="form.height"
            @update:model-value="
              form.height =
                typeof $event === 'number' ? $event : $event ? parseFloat($event) : undefined
            "
            placeholder="ej: 65.5"
            step="0.001"
            min="0"
            max="150"
            :error="errors.height"
            hint="Rango: 0-150 cm"
          />

          <FormInput
            id="headCircumference"
            label="Perímetro cefálico (cm)"
            type="number"
            :model-value="form.headCircumference"
            @update:model-value="
              form.headCircumference =
                typeof $event === 'number' ? $event : $event ? parseFloat($event) : undefined
            "
            placeholder="ej: 42.5"
            step="0.001"
            min="0"
            max="60"
            :error="errors.headCircumference"
            hint="Rango: 0-60 cm"
          />
        </div>

        <!-- Errores generales -->
        <div v-if="errors.general" class="rounded-lg border-l-4 border-red-500 bg-red-50 p-4" role="alert">
          <p class="text-sm text-red-700">{{ errors.general }}</p>
        </div>

        <!-- Botón submit -->
        <button type="submit" :disabled="isLoading" class="btn-primary w-full" :aria-busy="isLoading">
          <span v-if="!isLoading">Calcular Percentiles</span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Calculando...
          </span>
        </button>
      </form>
    </div>

    <!-- Resultados -->
    <div
      v-if="showResults && result && !('error' in result)"
      class="animate-fade-in space-y-6 md:space-y-8"
    >
      <!-- Información de edad -->
      <div class="card">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">Información de edad</h3>
        <div class="grid gap-3 sm:grid-cols-3 md:gap-4">
          <div class="space-y-1">
            <p class="text-sm text-gray-600">Edad en días</p>
            <p class="text-xl font-bold text-primary md:text-2xl">{{ result.ageInDays }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-sm text-gray-600">Edad en meses</p>
            <p class="text-xl font-bold text-primary md:text-2xl">{{ result.ageInMonths }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-sm text-gray-600">Edad en años</p>
            <p class="text-xl font-bold text-primary md:text-2xl">{{ result.ageInYears }}</p>
          </div>
        </div>
      </div>

      <!-- Peso para la edad -->
      <div v-if="result.metrics.weight">
        <ResultCard
          title="Peso para la edad"
          subtitle="Percentil de peso ajustado por edad"
          :value="result.metrics.weight.value"
          unit="kg"
          :percentile="result.metrics.weight.percentile"
          :color="result.metrics.weight.interpretation.color"
          :interpretation="result.metrics.weight.interpretation.text"
          icon="⚖️"
        />
        <PercentileChart
          class="mt-3 md:mt-4"
          title="Gráfico de peso para la edad"
          :data="chartData.weight"
          xlabel="Edad (días)"
          ylabel="Peso (kg)"
        />
      </div>

      <!-- Talla para la edad -->
      <div v-if="result.metrics.height">
        <ResultCard
          title="Talla para la edad"
          subtitle="Percentil de talla ajustado por edad"
          :value="result.metrics.height.value"
          unit="cm"
          :percentile="result.metrics.height.percentile"
          :color="result.metrics.height.interpretation.color"
          :interpretation="result.metrics.height.interpretation.text"
          icon="📏"
        />
        <PercentileChart
          class="mt-3 md:mt-4"
          title="Gráfico de talla para la edad"
          :data="chartData.height"
          xlabel="Edad (días)"
          ylabel="Talla (cm)"
        />
      </div>

      <!-- Peso para la altura -->
      <div v-if="result.metrics.weightForHeight">
        <ResultCard
          title="Peso para su altura"
          subtitle="Percentil de peso ajustado por altura"
          :value="result.metrics.weightForHeight.value"
          unit="kg"
          :percentile="result.metrics.weightForHeight.percentile"
          :color="result.metrics.weightForHeight.interpretation.color"
          :interpretation="result.metrics.weightForHeight.interpretation.text"
          icon="⚖️"
        />
        <PercentileChart
          class="mt-3 md:mt-4"
          title="Gráfico de peso para su altura"
          :data="chartData.weightForHeight"
          xlabel="Altura (cm)"
          ylabel="Peso (kg)"
        />
      </div>

      <!-- Perímetro cefálico -->
      <div v-if="result.metrics.headCircumference">
        <ResultCard
          title="Perímetro cefálico para la edad"
          subtitle="Percentil de perímetro cefálico ajustado por edad"
          :value="result.metrics.headCircumference.value"
          unit="cm"
          :percentile="result.metrics.headCircumference.percentile"
          :color="result.metrics.headCircumference.interpretation.color"
          :interpretation="result.metrics.headCircumference.interpretation.text"
          icon="🧠"
        />
        <PercentileChart
          class="mt-3 md:mt-4"
          title="Gráfico de perímetro cefálico para la edad"
          :data="chartData.headCircumference"
          xlabel="Edad (días)"
          ylabel="Perímetro cefálico (cm)"
        />
      </div>

      <!-- IMC -->
      <div v-if="result.metrics.bmi">
        <ResultCard
          title="Índice de Masa Corporal (IMC)"
          subtitle="IMC ajustado por edad"
          :value="result.metrics.bmi.value"
          unit="kg/m²"
          :percentile="result.metrics.bmi.percentile"
          :color="result.metrics.bmi.interpretation.color"
          :interpretation="result.metrics.bmi.interpretation.text"
          icon="📊"
        />
        <PercentileChart
          class="mt-3 md:mt-4"
          title="Gráfico de IMC para la edad"
          :data="chartData.bmi"
          xlabel="Edad (días)"
          ylabel="IMC (kg/m²)"
        />
      </div>

      <!-- Botón para nuevos cálculos -->
      <button @click="resetForm" class="btn-secondary w-full">Realizar otro cálculo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import FormInput from '@components/FormInput.vue';
import FormSelect from '@components/FormSelect.vue';
import ResultCard from '@components/ResultCard.vue';
import PercentileChart from '@components/PercentileChart.vue';
import { PercentileCalculationService } from '@modules/PercentileCalculationService';
import {
  clearErrors,
  setError,
  ERROR_BIRTH_DATE_REQUIRED,
  ERROR_GENDER_REQUIRED,
  ERROR_NO_METRICS,
} from '@utils/errorHandling';
import { initializeAllChartData } from '@utils/chartData';
import type { CalculationResult, PercentileChartData, Gender } from '@interfaces/index';

import wfaBoys from '@data/wfa_boys.json';
import wfaGirls from '@data/wfa_girls.json';
import lhfaBoys from '@data/lhfa_boys.json';
import lhfaGirls from '@data/lhfa_girls.json';
import wflBoys from '@data/wfl_boys.json';
import wflGirls from '@data/wfl_girls.json';
import hcfaBoys from '@data/hcfa_boys.json';
import hcfaGirls from '@data/hcfa_girls.json';
import bfaBoys from '@data/bfa_boys.json';
import bfaGirls from '@data/bfa_girls.json';
const form = reactive({
  birthDate: '',
  gender: 'male' as Gender,
  weight: undefined as number | undefined,
  height: undefined as number | undefined,
  headCircumference: undefined as number | undefined,
});

const errors = reactive({
  birthDate: '',
  gender: '',
  weight: '',
  height: '',
  headCircumference: '',
  general: '',
});

const isLoading = ref(false);
const showResults = ref(false);
const result = ref<CalculationResult | null>(null);

const chartData = reactive(initializeAllChartData());

async function handleSubmit() {
  clearErrors(errors);

  if (!form.birthDate) {
    setError(errors, 'birthDate', ERROR_BIRTH_DATE_REQUIRED);
    return;
  }

  if (!form.gender) {
    setError(errors, 'gender', ERROR_GENDER_REQUIRED);
    return;
  }

  if (!form.weight && !form.height && !form.headCircumference) {
    setError(errors, 'general', ERROR_NO_METRICS);
    return;
  }

  try {
    isLoading.value = true;

    const datasetsMap = {
      wfa_boys: wfaBoys,
      wfa_girls: wfaGirls,
      lhfa_boys: lhfaBoys,
      lhfa_girls: lhfaGirls,
      wfl_boys: wflBoys,
      wfl_girls: wflGirls,
      hcfa_boys: hcfaBoys,
      hcfa_girls: hcfaGirls,
      bfa_boys: bfaBoys,
      bfa_girls: bfaGirls,
    };

    const wfaDataset = form.gender === 'male' ? datasetsMap['wfa_boys'] : datasetsMap['wfa_girls'];
    const lhfaDataset =
      form.gender === 'male' ? datasetsMap['lhfa_boys'] : datasetsMap['lhfa_girls'];
    const wflDataset = form.gender === 'male' ? datasetsMap['wfl_boys'] : datasetsMap['wfl_girls'];
    const hcfaDataset =
      form.gender === 'male' ? datasetsMap['hcfa_boys'] : datasetsMap['hcfa_girls'];
    const bfaDataset = form.gender === 'male' ? datasetsMap['bfa_boys'] : datasetsMap['bfa_girls'];

    if (!wfaDataset || !lhfaDataset || !wflDataset || !hcfaDataset || !bfaDataset) {
      throw new Error('Uno o más datasets no están disponibles');
    }

    const service = new PercentileCalculationService();

    const calculationResult = service.calculatePercentiles(
      {
        birthDate: new Date(form.birthDate),
        gender: form.gender as Gender,
        weight: form.weight,
        height: form.height,
        headCircumference: form.headCircumference,
      },
      {
        wfaDataset,
        lhfaDataset,
        wflDataset,
        hcfaDataset,
        bfaDataset,
      }
    );

    if ('error' in calculationResult) {
      errors.general = calculationResult.error;
      return;
    }

    result.value = calculationResult;

    buildChartData(
      calculationResult,
      form,
      wfaDataset,
      lhfaDataset,
      wflDataset,
      hcfaDataset,
      bfaDataset
    );

    showResults.value = true;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
    errors.general = `Error al calcular percentiles: ${errorMessage}`;
  } finally {
    isLoading.value = false;
  }
}

function buildChartData(
  calculationResult: CalculationResult,
  formData: typeof form,
  wfaDataset: any,
  lhfaDataset: any,
  wflDataset: any,
  hcfaDataset: any,
  bfaDataset: any
) {
  const buildPercentileSeries = (dataset: any, dataKey: 'age' | 'length' = 'age') => {
    return {
      p1: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p1 }))
        .filter((d: any) => d.y !== null),
      p3: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p3 }))
        .filter((d: any) => d.y !== null),
      p5: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p5 }))
        .filter((d: any) => d.y !== null),
      p10: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p10 }))
        .filter((d: any) => d.y !== null),
      p25: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p25 }))
        .filter((d: any) => d.y !== null),
      p50: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p50 }))
        .filter((d: any) => d.y !== null),
      p75: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p75 }))
        .filter((d: any) => d.y !== null),
      p90: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p90 }))
        .filter((d: any) => d.y !== null),
      p95: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p95 }))
        .filter((d: any) => d.y !== null),
      p97: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p97 }))
        .filter((d: any) => d.y !== null),
      p99: dataset.data
        .map((d: any) => ({ x: d[dataKey], y: d.p99 }))
        .filter((d: any) => d.y !== null),
    };
  };

  if (calculationResult.metrics.weight) {
    const wfaSeries = buildPercentileSeries(wfaDataset);
    chartData.weight = {
      ...wfaSeries,
      userPoint: {
        x: calculationResult.ageInDays,
        y: calculationResult.metrics.weight.value,
      },
    };
  }

  if (calculationResult.metrics.height) {
    const lhfaSeries = buildPercentileSeries(lhfaDataset);
    chartData.height = {
      ...lhfaSeries,
      userPoint: {
        x: calculationResult.ageInDays,
        y: calculationResult.metrics.height.value,
      },
    };
  }

  if (calculationResult.metrics.weightForHeight && formData.height && formData.weight) {
    const wflSeries = buildPercentileSeries(wflDataset, 'age');
    chartData.weightForHeight = {
      ...wflSeries,
      userPoint: {
        x: formData.height,
        y: formData.weight,
      },
    };
  }

  if (calculationResult.metrics.headCircumference) {
    const hcfaSeries = buildPercentileSeries(hcfaDataset);
    chartData.headCircumference = {
      ...hcfaSeries,
      userPoint: {
        x: calculationResult.ageInDays,
        y: calculationResult.metrics.headCircumference.value,
      },
    };
  }

  if (calculationResult.metrics.bmi) {
    const bfaSeries = buildPercentileSeries(bfaDataset);
    chartData.bmi = {
      ...bfaSeries,
      userPoint: {
        x: calculationResult.ageInDays,
        y: calculationResult.metrics.bmi.value,
      },
    };
  }
}

function resetForm() {
  Object.assign(form, {
    birthDate: '',
    gender: 'male' as Gender,
    weight: undefined,
    height: undefined,
    headCircumference: undefined,
  });
  showResults.value = false;
  result.value = null;
  clearErrors(errors);
}
</script>
