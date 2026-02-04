<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <label class="font-medium text-gray-700">{{ label }}</label>
      <span class="text-sm font-semibold" :style="{ color: color }" aria-live="polite">
        {{ percentile.toFixed(2) }}th percentile
      </span>
    </div>
    <div class="overflow-hidden rounded-full bg-gray-200">
      <div
        class="h-3 transition-all duration-500 ease-out"
        :style="{ width: `${Math.max(1, percentile)}%`, backgroundColor: color }`"
        role="progressbar"
        :aria-valuenow="Math.round(percentile)"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Progreso: ${percentile.toFixed(2)}%`"
      />
    </div>
    <p class="text-sm text-gray-600">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  percentile: number;
  color: string;
  text: string;
}

defineProps<Props>();
</script>
