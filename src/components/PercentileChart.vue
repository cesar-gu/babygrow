<template>
  <div class="card">
    <h3 class="mb-4 text-lg font-semibold text-gray-900">{{ title }}</h3>
    <div class="relative h-96 w-full">
      <canvas ref="chartContainer" :aria-label="`Gráfico: ${title}`" role="img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import type { PercentileChartData } from '@interfaces/index';

interface Props {
  title: string;
  data: PercentileChartData;
  xlabel: string;
  ylabel: string;
  userPointColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  userPointColor: '#ef4444',
});

const chartContainer = ref<HTMLCanvasElement>();
let chart: Chart | null = null;

const percentileColors: Record<
  'p1' | 'p3' | 'p5' | 'p10' | 'p25' | 'p50' | 'p75' | 'p90' | 'p95' | 'p97' | 'p99',
  string
> = {
  p1: 'rgba(239, 68, 68, 0.3)',
  p3: 'rgba(248, 113, 113, 0.4)',
  p5: 'rgba(252, 165, 165, 0.4)',
  p10: 'rgba(249, 115, 22, 0.5)',
  p25: 'rgba(251, 191, 36, 0.4)',
  p50: 'rgba(34, 197, 94, 0.6)',
  p75: 'rgba(59, 130, 246, 0.3)',
  p90: 'rgba(139, 92, 246, 0.5)',
  p95: 'rgba(236, 72, 153, 0.4)',
  p97: 'rgba(30, 144, 255, 0.4)',
  p99: 'rgba(75, 192, 192, 0.3)',
};

const percentileBorderColors: Record<
  'p1' | 'p3' | 'p5' | 'p10' | 'p25' | 'p50' | 'p75' | 'p90' | 'p95' | 'p97' | 'p99',
  string
> = {
  p1: 'rgb(239, 68, 68)',
  p3: 'rgb(248, 113, 113)',
  p5: 'rgb(252, 165, 165)',
  p10: 'rgb(249, 115, 22)',
  p25: 'rgb(251, 191, 36)',
  p50: 'rgb(34, 197, 94)',
  p75: 'rgb(59, 130, 246)',
  p90: 'rgb(139, 92, 246)',
  p95: 'rgb(236, 72, 153)',
  p97: 'rgb(30, 144, 255)',
  p99: 'rgb(75, 192, 192)',
};

function initChart() {
  if (!chartContainer.value) return;

  const ctx = chartContainer.value.getContext('2d');
  if (!ctx) return;

  if (chart) {
    chart.destroy();
  }

  const datasets = [
    {
      label: 'P3',
      data: props.data.p3,
      borderColor: percentileBorderColors.p3,
      backgroundColor: percentileColors.p3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      borderWidth: 1,
    },
    {
      label: 'P10',
      data: props.data.p10,
      borderColor: percentileBorderColors.p10,
      backgroundColor: percentileColors.p10,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      borderWidth: 1,
    },
    {
      label: 'P25',
      data: props.data.p25,
      borderColor: percentileBorderColors.p25,
      backgroundColor: percentileColors.p25,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      borderWidth: 1,
    },
    {
      label: 'P50 (Media)',
      data: props.data.p50,
      borderColor: percentileBorderColors.p50,
      backgroundColor: percentileColors.p50,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      borderWidth: 2.5,
    },
    {
      label: 'P75',
      data: props.data.p75,
      borderColor: percentileBorderColors.p75,
      backgroundColor: percentileColors.p75,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      borderWidth: 1,
    },
    {
      label: 'P90',
      data: props.data.p90,
      borderColor: percentileBorderColors.p90,
      backgroundColor: percentileColors.p90,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      borderWidth: 1,
    },
    {
      label: 'P97',
      data: props.data.p97,
      borderColor: percentileBorderColors.p97,
      backgroundColor: percentileColors.p97,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      borderWidth: 1,
    },
    {
      label: 'Su hijo/a',
      data: [props.data.userPoint],
      borderColor: props.userPointColor,
      backgroundColor: props.userPointColor,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBorderWidth: 2,
      pointBorderColor: '#fff',
      showLine: false,
      fill: false,
    },
  ];

  const seriesKeys = [
    'p1',
    'p3',
    'p5',
    'p10',
    'p25',
    'p50',
    'p75',
    'p90',
    'p95',
    'p97',
    'p99',
  ] as (keyof typeof props.data)[];

  const allX: number[] = [];
  for (const key of seriesKeys) {
    const series = (props.data as any)[key] as { x: number }[] | undefined;
    if (Array.isArray(series)) {
      for (const pt of series) {
        if (pt && typeof pt.x === 'number') allX.push(pt.x);
      }
    }
  }
  if (props.data.userPoint && typeof props.data.userPoint.x === 'number') {
    allX.push(props.data.userPoint.x);
  }

  const fallbackMin = 0;
  const xMin = allX.length ? Math.min(...allX) : fallbackMin;
  const xMax = allX.length ? Math.max(...allX) : fallbackMin;

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: datasets as any,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest',
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            usePointStyle: true,
            padding: 16,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 13,
          },
          bodyFont: {
            size: 12,
          },
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y.toFixed(2);
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          min: xMin,
          max: xMax,
          bounds: 'data',
          grace: 0,
          title: {
            display: true,
            text: props.xlabel,
            font: {
              size: 12,
              weight: 'bold',
            },
          },
          grid: {
            drawOnChartArea: true,
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
        y: {
          title: {
            display: true,
            text: props.ylabel,
            font: {
              size: 12,
              weight: 'bold',
            },
          },
          grid: {
            drawOnChartArea: true,
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  });
}

onMounted(() => {
  initChart();
});

watch(
  () => props.data,
  () => {
    initChart();
  }
);
</script>
