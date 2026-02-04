<template>
  <div class="card">
    <div class="mb-4 flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-sm text-gray-600">{{ subtitle }}</p>
      </div>
      <span class="text-2xl" aria-hidden="true">{{ icon }}</span>
    </div>

    <div class="mb-4 space-y-2">
      <div class="flex justify-between">
        <span class="font-medium text-gray-700">Valor</span>
        <span class="font-semibold text-gray-900">{{ value.toFixed(2) }} {{ unit }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-medium text-gray-700">Percentil</span>
        <span class="font-semibold" :style="{ color: color }" role="status">P{{ percentile.toFixed(2) }}</span>
      </div>
    </div>

    <div class="rounded-lg p-3" :style="{ backgroundColor: `${color}15` }">
      <p class="text-sm font-medium" :style="{ color }">{{ interpretation }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
  value: number;
  unit: string;
  percentile: number;
  color: string;
  interpretation: string;
  icon: string;
}

defineProps<Props>();
</script>
