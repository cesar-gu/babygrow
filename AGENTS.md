# AGENTS.md - Especificación de Agentes para BabyGrow

## 📋 Descripción General

Este documento describe cómo colaborar efectivamente con agentes de IA en el proyecto BabyGrow. Define la arquitectura del proyecto, responsabilidades de cada módulo, y puntos de integración para mejoras y automatización.

## 🏗️ Puntos Clave para Agentes

### Stack Tecnológico

- **Framework**: Astro 5.x (SSG - Static Site Generation)
- **Componentes**: Vue 3 (hidratación parcial)
- **Estilos**: Tailwind CSS 3.x
- **Tipado**: TypeScript
- **Visualización**: Chart.js
- **Gestión de fechas**: dayjs

### Scripts Principales

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo (http://localhost:3000)

# Build
npm run build            # Compilación estática para producción

# Datasets
npm run convert-datasets # Convierte Excel → JSON (ejecutar antes de build)

# Calidad de código
npm run lint             # Verifica con ESLint
npm run lint:fix         # Corrige problemas automáticamente
npm run format           # Formatea con Prettier

# Preview
npm run preview          # Previsualiza build de producción localmente
```

### Estructura de Comandos npm

Ver `package.json` para todos los scripts disponibles. Los más importantes para agentes son:

- `convert-datasets`: Pre-compilación (convierte datos Excel)
- `lint`: Validación de código
- `build`: Compilación final

## 🏗️ Componentes Modulares para Agentes

### Module: PercentileCalculationService

```typescript
// Orquestador principal de cálculos
class PercentileCalculationService {
  calculatePercentiles(metrics, datasets): CalculationResult;
}
```

**Agentes que lo usan**: Cálculo, Validación, Análisis

### Module: PercentileInterpolator

```typescript
// Interpola percentiles entre días
class PercentileInterpolator {
  interpolate(dataset, ageInDays, percentileKey): number;
  calculatePercentile(dataset, ageInDays, measuredValue): number;
}
```

**Agentes que lo usan**: Cálculo, Análisis

### Module: InputValidator

```typescript
// Valida entrada del usuario
class InputValidator {
  validateChildMetrics(metrics): { isValid; errors };
}
```

**Agentes que lo usan**: Validación, Precálculo

## 📊 Flujo de Datos para Agentes

```
User Input (formulario)
    ↓
InputValidator.validateChildMetrics()
    ↓ (válido)
AgeCalculator.calculateAgeInDays()
    ↓
PercentileCalculationService.calculatePercentiles()
    ├─ PercentileInterpolator.calculatePercentile()
    ├─ PercentileInterpolator.interpolate()
    ├─ BMICalculator.calculateBMI()
    └─ ResultInterpreter.interpret()
    ↓
PercentileResult (tipos en src/types/index.ts)
    ↓
Vue Component (PercentileChart, ResultCard)
    ↓
HTML renderizado + Chart.js
```

## 🔧 Puntos de Extensión para Agentes

### 1. Pre-Build Hook

Ejecutar antes de compilación en `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ...
  integrations: [
    // El script convert-datasets.js se ejecuta manualmente antes del build
    // Puedes agregar hooks aquí si es necesario
  ],
});
```

**Comando**:

```bash
npm run convert-datasets  # Ejecutar primero
npm run build             # Luego compilar
```

### 2. Custom Build Steps

En `.github/workflows/deploy.yml`:

```yaml
- name: Convert Datasets
  run: npm run convert-datasets

- name: Build
  run: npm run build

- name: Lint Check (opcional)
  run: npm run lint
```

### 3. Type Definitions

Extender tipos en [src/types/index.ts](src/types/index.ts):

```typescript
export interface PercentileResult {
  value: number;
  percentile: number;
  interpretation: InterpretationResult;
  // Agregar campos nuevos aquí
}

export interface ChildMetrics {
  gender: 'M' | 'F';
  birthDate: string;
  weight?: number;
  height?: number;
  headCircumference?: number;
  // Agregar campos nuevos aquí
}
```

## 📋 Checklist para Implementar Nuevos Agentes

- [ ] Definir responsabilidad única del agente
- [ ] Crear módulo en `src/modules/` (si aplica)
- [ ] Agregar tipos en `src/types/index.ts`
- [ ] Implementar lógica de negocio
- [ ] Crear script en `scripts/` (si aplica)
- [ ] Agregar tests unitarios (si se implementan)
- [ ] Documentar en README.md
- [ ] Agregar a este AGENTS.md

## 🧪 Testing (Futuro)

Estructura recomendada para cuando se implemente testing:

```
tests/
├── units/
│   ├── AgeCalculator.test.ts
│   ├── PercentileInterpolator.test.ts
│   ├── BMICalculator.test.ts
│   ├── ResultInterpreter.test.ts
│   └── InputValidator.test.ts
├── integration/
│   └── PercentileCalculationService.test.ts
└── e2e/
    └── calculator.e2e.ts
```

**Nota**: Actualmente no hay tests implementados. Los agentes pueden contribuir agregando tests según sea necesario.

## 🔐 Seguridad para Agentes

- Todas las operaciones son locales (sin llamadas a APIs externas)
- No se almacenan datos personales
- Validación de entrada en cada módulo
- TypeScript para prevenir errores de tipo

## 📈 Monitoreo y Logging

Agentes pueden loguear en:

```typescript
// Para desarrollo
console.log('Info', data);
console.error('Error', error);

// Para producción (si se agrega)
logger.info('User calculation', { ageInDays, gender });
```

## 🚀 Ejemplos de Automatización con Agentes

### Ejemplo 1: Validar Datasets Antes de Build

```bash
#!/bin/bash
# scripts/validate-datasets.sh

npm run convert-datasets
node scripts/validate-data-quality.js
npm run build
```

### Ejemplo 2: Generar Reportes

```javascript
// scripts/generate-report.js
const datasets = [
  /* ... */
];
const report = {
  totalRecords: datasets.reduce((sum, ds) => sum + ds.length, 0),
  percentiles: 11,
  ageRange: '0-1825 days',
};
console.log(JSON.stringify(report, null, 2));
```

### Ejemplo 3: CI/CD Automático

```yaml
# .github/workflows/quality-check.yml
name: Quality Check
on: [pull_request]
jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm run convert-datasets
```

## 📚 Referencias

- Astro Docs: https://docs.astro.build
- Vue 3 Docs: https://vuejs.org
- TypeScript Docs: https://www.typescriptlang.org
- OMS Crecimiento: https://www.who.int/tools/child_growth_standards

## 🤝 Colaboración con Agentes

Para mejor colaboración con agentes de IA:

1. **Definir claramente el contexto**: Incluir relevancia al proyecto
2. **Proporcionar ejemplos**: Mostrar entrada/salida esperada
3. **Especificar restricciones**: Tecnologías, estilos, estándares
4. **Documentar decisiones**: Por qué se eligió cierto enfoque
5. **Mantener modularidad**: SOLID principles facilitan cambios

## ✅ Checklist de Mantenimiento

- [ ] Actualizar AGENTS.md cuando cambien puntos de extensión
- [ ] Mantener tipos TypeScript sincronizados en `src/types/index.ts`
- [ ] Validar nuevas funcionalidades contra este documento
- [ ] Actualizar README.md con cambios significativos
- [ ] Mantener `.github/workflows/deploy.yml` actualizado
- [ ] Revisar y limpiar código regularmente
