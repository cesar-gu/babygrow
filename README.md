# BabyGrow - Calculadora de Percentiles Pediátricos

Una herramienta web interactiva y moderna para calcular percentiles de crecimiento infantil (0-5 años) basada en datos de referencia de la Organización Mundial de la Salud (OMS).

## 🌟 Características

- **Cálculo de múltiples métricas:**
  - Peso para la edad
  - Talla para la edad
  - Peso para su altura
  - Perímetro cefálico para la edad
  - Índice de Masa Corporal (IMC)

- **Visualización avanzada:**
  - Gráficos interactivos con Chart.js
  - Todos los percentiles visibles (P1, P3, P5, P10, P25, P50, P75, P90, P95, P97, P99)
  - Punto del usuario destacado en cada gráfico
  - Código de color intuitivo (rojo crítico, naranja advertencia, azul normal)

- **Diseño moderno:**
  - Interfaz mobile-first responsive
  - Animaciones suaves y transiciones
  - Diseño accesible y usable
  - Modo oscuro listo

- **Privacidad y seguridad:**
  - Todos los cálculos se realizan localmente
  - No se almacenan datos personales
  - No hay conexión a servidores externos
  - 100% gratuito y sin publicidad

## 🚀 Inicio Rápido

### Requisitos previos

- Node.js 22.14.0 (ver `.nvmrc`)
- npm 10.x o superior

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/cesar-gu/babygrow.git
cd babygrow

# Usar versión de Node especificada
nvm use

# Instalar dependencias
npm install

# Convertir datasets de Excel a JSON
npm run convert-datasets
```

### Desarrollo

```bash
nvm use
npm run dev
```

Abre http://localhost:3000 en tu navegador.

### Compilación para producción

```bash
nvm use
npm run build
```

### Vista previa de producción

```bash
nvm use
npm run preview
```

## 📁 Estructura del Proyecto

```
babygrow/
├── src/
│   ├── components/       # Componentes Vue reutilizables
│   │   ├── CalculatorForm.vue
│   │   ├── PercentileChart.vue
│   │   ├── ResultCard.vue
│   │   ├── ProgressBar.vue
│   │   ├── FormInput.vue
│   │   ├── FormSelect.vue
│   │   ├── LoadingSpinner.vue
│   │   └── Disclaimer.vue
│   ├── layouts/         # Layouts de Astro
│   │   └── BaseLayout.astro
│   ├── pages/           # Páginas (rutas)
│   │   ├── index.astro
│   │   ├── calculate.astro
│   │   └── faq.astro
│   ├── modules/         # Lógica de negocio (SOLID)
│   │   ├── AgeCalculator.ts
│   │   ├── PercentileInterpolator.ts
│   │   ├── BMICalculator.ts
│   │   ├── ResultInterpreter.ts
│   │   ├── InputValidator.ts
│   │   └── PercentileCalculationService.ts
│   ├── types/           # Definiciones TypeScript
│   │   └── index.ts
│   ├── utils/           # Utilidades compartidas
│   │   ├── chartData.ts
│   │   ├── datasetManager.ts
│   │   ├── errorHandling.ts
│   │   └── formatting.ts
│   ├── data/            # Datasets JSON (generados)
│   │   ├── wfa_boys.json
│   │   ├── wfa_girls.json
│   │   ├── lhfa_boys.json
│   │   ├── lhfa_girls.json
│   │   ├── wfl_boys.json
│   │   ├── wfl_girls.json
│   │   ├── hcfa_boys.json
│   │   ├── hcfa_girls.json
│   │   ├── bfa_boys.json
│   │   └── bfa_girls.json
│   └── styles/          # Estilos globales
│       └── globals.css
├── scripts/             # Scripts de compilación
│   └── convert-datasets.js
├── data/                # Datasets originales (Excel)
│   ├── wfa-boys-percentiles-expanded-tables.xlsx
│   ├── wfa-girls-percentiles-expanded-tables.xlsx
│   ├── lhfa-boys-percentiles-expanded-tables.xlsx
│   ├── lhfa-girls-percentiles-expanded-tables.xlsx
│   ├── wfl-boys-percentiles-expanded-tables.xlsx
│   ├── wfl-girls-percentiles-expanded-tables.xlsx
│   ├── hcfa-boys-percentiles-expanded-tables.xlsx
│   ├── hcfa-girls-percentiles-expanded-tables.xlsx
│   ├── bfa-boys-percentiles-expanded-tables.xlsx
│   └── bfa-girls-percentiles-expanded-tables.xlsx
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions workflow
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc.json
├── package.json
├── .nvmrc
└── README.md
```

## 🏗️ Arquitectura

### Principios SOLID

- **S**ingle Responsibility: Cada módulo tiene una única responsabilidad
  - `AgeCalculator`: Solo calcula edades
  - `PercentileInterpolator`: Solo interpola percentiles
  - `BMICalculator`: Solo calcula IMC
  - `ResultInterpreter`: Solo interpreta resultados
  - `InputValidator`: Solo valida entrada

- **O**pen/Closed: Abierto a extensión, cerrado a modificación
- **L**iskov Substitution: Las clases siguen contratos claros
- **I**nterface Segregation: Interfaces pequeñas y específicas
- **D**ependency Inversion: Las dependencias se inyectan

### Tecnologías

- **Astro 5.x**: Framework SSG (Static Site Generation)
- **Vue 3**: Componentes interactivos con hidratación parcial
- **Tailwind CSS 3.x**: Estilos utilities
- **Chart.js**: Gráficos interactivos
- **TypeScript**: Tipado estático
- **dayjs**: Manipulación de fechas

## 📊 Procesamiento de Datos

Los datasets de Excel se convierten a JSON estático durante la compilación:

1. Se ejecuta `npm run convert-datasets`
2. El script lee los 10 archivos Excel
3. Extrae 11 percentiles: P1, P3, P5, P10, P25, P50, P75, P90, P95, P97, P99
4. Genera archivos JSON en `src/data/`
5. Los datos se empaquetan en el build estático

Los JSON contienen:

- Rango de edad (0-1825 días)
- Datos por día (1826 registros por archivo)
- Todos los percentiles para cada día
- Metadatos (versión, fecha, tipo)

## 🔍 Interpolación

Para encontrar percentiles en días exactos:

1. Se busca el día exacto en el dataset
2. Si no existe, se encuentra los dos días más cercanos
3. Se aplica interpolación lineal entre los dos puntos
4. El resultado se redondea a 2 decimales

## 🎨 Interpretación de Resultados

| Percentil | Color      | Interpretación                  |
| --------- | ---------- | ------------------------------- |
| P < 5     | 🔴 Rojo    | Crítico bajo - Consultar médico |
| P 5-10    | 🟠 Naranja | Advertencia baja - Seguimiento  |
| P 10-90   | 🔵 Azul    | Normal                          |
| P 90-95   | 🟠 Naranja | Advertencia alta - Seguimiento  |
| P > 95    | 🔴 Rojo    | Crítico alto - Consultar médico |

## 🧪 Linting y Formato

```bash
# Ejecutar ESLint
nvm use
npm run lint

# Arreglar problemas automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format
```

## 📦 Despliegue

### GitHub Pages

El proyecto está configurado para desplegar automáticamente en GitHub Pages:

1. Hacer push a la rama `main`
2. GitHub Actions ejecuta el workflow
3. Se compila con Astro
4. Se despliega automáticamente en `https://cesar-gu.github.io/babygrow/`

Ver `.github/workflows/deploy.yml` para detalles.

## 📝 Variables de Entorno

No se requieren variables de entorno. El proyecto es completamente estático.

## 🚨 Aviso Legal

**Esta herramienta es únicamente orientativa y educativa.** No sustituye la valoración profesional de un pediatra o especialista. Los percentiles deben interpretarse en contexto clínico completo por un profesional sanitario.

## 📚 Fuentes de Datos

- **OMS (WHO Anthro)**: https://www.who.int/tools/child_growth_standards
- **Tablas de referencia**: Utilizadas estándares de crecimiento de la OMS 2006

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

## 👤 Autor

Creado como herramienta educativa para monitoreo de crecimiento infantil.

## 🙏 Agradecimientos

- Organización Mundial de la Salud (OMS) por los estándares de crecimiento
- Comunidad de Astro por el excelente framework
- Vue.js por los componentes reactivos
