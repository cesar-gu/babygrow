<template>
  <header class="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm" role="banner">
    <div class="container-content flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/babygrow/" class="flex items-center gap-2" aria-label="BabyGrow - Inicio">
        <svg
          class="h-8 w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#0066cc"
          aria-hidden="true"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
        <span class="text-xl font-bold text-gray-900">BabyGrow</span>
      </a>

      <!-- Navigation Desktop -->
      <nav class="hidden gap-6 md:flex" aria-label="Navegación principal">
        <a
          href="/babygrow/"
          :class="isActiveLink('/babygrow/') ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'"
          class="text-md font-medium transition-colors"
        >Inicio</a>
        <a
          href="/babygrow/calculate"
          :class="isActiveLink('/babygrow/calculate') ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'"
          class="text-md font-medium transition-colors"
        >Calcular</a>
        <a
          href="/babygrow/faq"
          :class="isActiveLink('/babygrow/faq') ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'"
          class="text-md font-medium transition-colors"
        >Preguntas frecuentes</a>
      </nav>

      <!-- Author Credit -->
      <div class="hidden gap-1 text-sm italic text-gray-700 md:flex">
        <span>by</span>
        <a
          href="https://cesar-gu.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-sm font-bold text-transparent transition-colors hover:opacity-90"
          aria-label="Portfolio de cesargú"
          title="Portfolio: cesargú"
          >cesargú
        </a>
      </div>

      <!-- Hamburger Menu Mobile -->
      <button
        class="flex flex-col gap-1.5 p-2 md:hidden"
        :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="isMenuOpen"
        :aria-controls="'mobile-menu'"
        @click="toggleMenu"
      >
        <span
          class="block h-0.5 w-6 bg-primary-dark transition-all"
          :class="{ 'translate-y-2 rotate-45': isMenuOpen }"
          aria-hidden="true"
        />
        <span
          class="block h-0.5 w-6 bg-primary-dark transition-all"
          :class="{ 'opacity-0': isMenuOpen }"
          aria-hidden="true"
        />
        <span
          class="block h-0.5 w-6 bg-primary-dark transition-all"
          :class="{ '-translate-y-2 -rotate-45': isMenuOpen }"
          aria-hidden="true"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <nav
      v-if="isMenuOpen"
      id="mobile-menu"
      class="border-t border-gray-200 bg-white px-4 py-4 md:hidden"
      aria-label="Navegación móvil"
    >
      <div class="flex flex-col gap-4">
        <a
          href="/babygrow/"
          :class="isActiveLink('/babygrow/') ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'"
          class="text-md font-medium transition-colors"
          @click="closeMenu"
          >Inicio</a
        >
        <a
          href="/babygrow/calculate"
          :class="isActiveLink('/babygrow/calculate') ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'"
          class="text-md font-medium transition-colors"
          @click="closeMenu"
          >Calcular</a
        >
        <a
          href="/babygrow/faq"
          :class="isActiveLink('/babygrow/faq') ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'"
          class="text-md font-medium transition-colors"
          @click="closeMenu"
          >Preguntas frecuentes</a
        >
        <div class="border-t border-gray-200 pt-4">
          <div class="flex gap-1 text-sm italic text-gray-700">
            <span>by</span>
            <a
              href="https://cesar-gu.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-sm font-bold text-transparent transition-colors hover:opacity-90"
              aria-label="Portfolio de cesargú"
              title="Portfolio: cesargú"
              >cesargú
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isMenuOpen = ref(false);
const currentPath = ref('');

onMounted(() => {
  currentPath.value = window.location.pathname;
});

const isActiveLink = (href: string): boolean => {
  if (!currentPath.value) return false;

  const normalizedPath = currentPath.value.replace(/\/$/, '') || '/';
  const normalizedHref = href.replace(/\/$/, '') || '/';
  return normalizedPath === normalizedHref;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
