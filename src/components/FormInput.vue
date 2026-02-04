<template>
  <div class="space-y-1 md:space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700 md:text-base">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-label="requerido">*</span>
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :step="step"
      :min="min"
      :max="max"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
      class="input-field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" :id="`${id}-error`" class="text-xs text-red-500 md:text-sm" role="alert">{{ error }}</p>
    <p v-if="hint" :id="`${id}-hint`" class="text-xs text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue?: string | number;
  type?: 'text' | 'number' | 'date' | 'email';
  placeholder?: string;
  required?: boolean;
  step?: string | number;
  min?: string | number;
  max?: string | number;
  error?: string;
  hint?: string;
}

interface Emits {
  (e: 'update:modelValue', value: string | number | undefined): void;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
  step: undefined,
  min: undefined,
  max: undefined,
  error: '',
  hint: '',
});

defineEmits<Emits>();
</script>
