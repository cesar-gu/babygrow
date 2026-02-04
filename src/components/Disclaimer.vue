<template>
  <footer class="mt-12 rounded-md border border-yellow-400 bg-yellow-50 py-6 shadow-sm" role="contentinfo">
    <div class="container-content">
      <div class="space-y-3 text-base text-gray-700">
        <p>
          <strong class="font-semibold text-gray-800">Fuente de datos:</strong> Todos los datos de
          percentiles provienen de la Organización Mundial de la Salud (OMS).
        </p>
        <p>
          <strong class="font-semibold text-gray-800">Aclaración importante:</strong> Esta
          herramienta es únicamente orientativa y no sustituye la valoración profesional de un
          médico pediatra o especialista en crecimiento infantil. Siempre consulte con un
          profesional sanitario para obtener una evaluación completa del crecimiento y desarrollo de
          su hijo.
        </p>
        <p>
          <strong class="font-semibold text-gray-800">Privacidad:</strong> Esta herramienta no
          almacena, procesa ni transmite datos personales. Todos los cálculos se realizan localmente
          en su dispositivo.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
footer {
  animation: slideUp 0.6s ease-out;
}
</style>
