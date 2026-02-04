<template>
  <div class="space-y-1 md:space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700 md:text-base">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-label="requerido">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
      class="input-field"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" :id="`${id}-error`" class="text-xs text-red-500 md:text-sm" role="alert">{{ error }}</p>
    <p v-if="hint" :id="`${id}-hint`" class="text-xs text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  modelValue: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Seleccione una opción',
  required: false,
  error: '',
  hint: '',
});

defineEmits<Emits>();
</script>
