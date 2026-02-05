<!-- Footer.vue - componente del footer de BabyGrow -->
<template>
  <footer class="border-t border-gray-300 bg-gray-100 py-10 text-gray-900" role="contentinfo">
    <div class="container-content">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
        <div>
          <a
            href="/babygrow/"
            class="mb-2 inline-block text-xl font-semibold text-gray-700"
            :title="siteData.brandName"
            aria-label="Ir a BabyGrow"
          >
            {{ siteData.brandName }}
          </a>
          <p class="text-sm leading-relaxed text-gray-600">
            Herramienta para calcular percentiles de crecimiento infantil basada en datos de la OMS.
          </p>
        </div>
        <div class="md:text-right">
          <h4 class="mb-3 font-semibold text-gray-700">Conecta conmigo</h4>
          <div class="flex items-center gap-4 md:justify-end" role="list">
            <SocialLink
              v-for="profile in siteData.profiles"
              :key="profile.network"
              :href="profile.url"
              :network="profile.network"
              role="listitem"
            />
            <a
              :href="`mailto:${siteData.email}`"
              :aria-label="`Enviar email a ${siteData.email}`"
              class="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 transition-all duration-300 hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-300/50 focus:outline-none focus:ring-2 focus:ring-primary"
              :title="`Email: ${siteData.email}`"
            >
              <svg class="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h4 class="mb-1 font-semibold text-gray-700">Aviso Legal</h4>
        <p class="text-xs text-gray-600">
          Esta herramienta es orientativa y no sustituye la valoración de un profesional sanitario.
        </p>
      </div>

      <div class="mt-6 border-t border-gray-200 py-4 text-center">
        <p class="text-xs text-gray-500">
          © {{ new Date().getFullYear() }} BabyGrow. Todos los derechos reservados.
        </p>
        <p class="text-xs text-gray-500">
          Hecho por
          <a
            href="https://cesar-gu.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gradient-to-r from-primary to-accent-orange bg-clip-text font-semibold text-transparent transition-colors hover:opacity-90"
            >cesargú</a
          >.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialLink from './SocialLink.vue';
import { siteData } from '../data/site';
</script>

<style scoped>
/* Footer styles specific to BabyGrow */
</style>
