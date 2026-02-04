# Contribuyendo a BabyGrow

¡Gracias por tu interés en contribuir a BabyGrow! Este documento proporciona directrices para contribuir al proyecto.

## Código de Conducta

Todos los contribuyentes deben adherirse a principios de respeto, inclusión y profesionalismo.

## Cómo Contribuir

### Reportar Bugs

Antes de reportar un bug, verifica que no haya sido reportado antes:

1. Abre un issue en GitHub
2. Proporciona un título claro y descriptivo
3. Describe exactamente qué sucede y qué debería suceder
4. Incluye evidencia (screenshots, logs, etc.)
5. Menciona tu entorno (navegador, SO, Node.js version)

### Sugerir Mejoras

Para sugerir mejoras:

1. Abre un issue con la etiqueta `enhancement`
2. Describe claramente la mejora propuesta
3. Explica por qué sería útil
4. Incluye ejemplos de cómo funcionaría

### Pull Requests

#### Antes de empezar

1. Fork el repositorio
2. Clona tu fork localmente
3. Crea una rama para tu feature: `git checkout -b feature/descriptive-name`
4. Instala dependencias: `npm install`

#### Durante el desarrollo

1. Sigue los estándares de código:
   - ESLint: `npm run lint`
   - Prettier: `npm run format`
   - TypeScript: tipos estrictos

2. Principios SOLID:
   - Single Responsibility: una función, una responsabilidad
   - Open/Closed: abierto a extensión, cerrado a modificación
   - Liskov Substitution: substituibilidad de tipos
   - Interface Segregation: interfaces específicas
   - Dependency Inversion: inyección de dependencias

3. Estructura de carpetas:
   - Componentes en `src/components/`
   - Lógica en `src/modules/`
   - Tipos en `src/types/`
   - Páginas en `src/pages/`

4. Commits significativos:
   ```bash
   git commit -m "feat: agregar soporte para nuevas métricas"
   git commit -m "fix: corregir cálculo de percentil"
   git commit -m "docs: actualizar README con ejemplos"
   git commit -m "refactor: simplificar PercentileInterpolator"
   ```

#### Después de completar

1. Asegúrate de que el build pase:

   ```bash
   npm run build
   npm run lint
   npm run format
   ```

2. Crea un Pull Request con:
   - Título claro: "feat: descripción" o "fix: descripción"
   - Descripción de los cambios
   - Referencias a issues relacionados (#123)
   - Screenshots si es relevante

3. Responde a comentarios de reviews
4. Actualiza la rama si hay conflictos: `git rebase main`

## Estándares de Código

### TypeScript

```typescript
// ✅ Bien
export class DataProcessor {
  private readonly maxRetries = 3;

  async processData(input: IDataInput): Promise<IDataOutput> {
    // Implementation
  }
}

// ❌ Evitar
function processData(input: any) {
  var result;
  // Implementation
  return result;
}
```

### Vue Components

```vue
<template>
  <div class="component">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<style scoped>
.component {
  /* Scoped styles */
}
</style>
```

### Comentarios

```typescript
// ✅ Bien: explica por qué, no qué
// Interpolación lineal para encontrar percentil exacto entre dos días
const percentile = linearInterpolation(day1, value1, day2, value2, targetDay);

// ❌ Evitar: comenta el código obvio
// Sumar dos números
const result = a + b;
```

## Testing

Aunque el proyecto no tiene tests automatizados aún, para futuras contribuciones:

```bash
# Pruebas unitarias
npm run test:unit

# Pruebas de integración
npm run test:integration

# Coverage
npm run test:coverage
```

## Documentación

Cualquier cambio en funcionalidad debe acompañarse de:

1. Comentarios JSDoc en código
2. Actualización de README.md si es necesario
3. Actualización de AGENTS.md si agrega nuevos agentes
4. Ejemplos de uso si es aplicable

## Issues y Roadmap

Puedes ver el roadmap del proyecto en:

- GitHub Issues (etiquetadas por prioridad)
- Discussions (para ideas y preguntas)

## Preguntas?

- Abre una Discussion en GitHub
- Revisa la documentación en el README.md
- Consulta AGENTS.md para automatización

## Licencia

Al contribuir, aceptas que tu código esté bajo la licencia MIT del proyecto.

## Reconocimiento

Los contribuyentes serán reconocidos en:

- GitHub Contributors
- README.md (a criterio del mantenedor)

## Código de Conducta Extendido

### Esperamos

- Respeto por opiniones diferentes
- Retroalimentación constructiva
- Paciencia con principiantes
- Inclusión y diversidad

### No Toleramos

- Acoso de cualquier tipo
- Discriminación
- Lenguaje ofensivo
- Conducta inapropiada

## Gracias

¡Gracias por contribuir a BabyGrow y ayudarnos a mejorar la herramienta de crecimiento infantil! 🙏
