import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');
const outputDir = path.join(__dirname, '../src/data');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const datasets = [
  { file: 'wfa-boys-percentiles-expanded-tables.xlsx', name: 'wfa_boys', type: 'weight_for_age' },
  { file: 'wfa-girls-percentiles-expanded-tables.xlsx', name: 'wfa_girls', type: 'weight_for_age' },
  { file: 'lhfa-boys-percentiles-expanded-tables.xlsx', name: 'lhfa_boys', type: 'length_for_age' },
  {
    file: 'lhfa-girls-percentiles-expanded-tables.xlsx',
    name: 'lhfa_girls',
    type: 'length_for_age',
  },
  {
    file: 'wfl-boys-percentiles-expanded-tables.xlsx',
    name: 'wfl_boys',
    type: 'weight_for_length',
  },
  {
    file: 'wfl-girls-percentiles-expanded-tables.xlsx',
    name: 'wfl_girls',
    type: 'weight_for_length',
  },
  {
    file: 'hcfa-boys-percentiles-expanded-tables.xlsx',
    name: 'hcfa_boys',
    type: 'head_circumference_for_age',
  },
  {
    file: 'hcfa-girls-percentiles-expanded-tables.xlsx',
    name: 'hcfa_girls',
    type: 'head_circumference_for_age',
  },
  { file: 'bfa-boys-percentiles-expanded-tables.xlsx', name: 'bfa_boys', type: 'bmi_for_age' },
  { file: 'bfa-girls-percentiles-expanded-tables.xlsx', name: 'bfa_girls', type: 'bmi_for_age' },
];

const percentiles = ['P1', 'P3', 'P5', 'P10', 'P25', 'P50', 'P75', 'P90', 'P95', 'P97', 'P99'];

function convertDataset(filePath, datasetName) {
  console.log(`Procesando ${datasetName}...`);

  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    if (!data || data.length === 0) {
      console.error(`❌ No se encontraron datos en ${filePath}`);
      return null;
    }

    const headers = Object.keys(data[0]);
    console.log(`  Headers encontrados: ${headers.join(', ')}`);

    let ageColumn = headers.find(
      (h) =>
        h.toLowerCase().includes('day') ||
        h.toLowerCase().includes('edad') ||
        h.toLowerCase().includes('age')
    );

    if (!ageColumn && datasetName.includes('wfl')) {
      ageColumn = headers.find(
        (h) =>
          h.toLowerCase().includes('height') ||
          h.toLowerCase().includes('length') ||
          h.toLowerCase().includes('cm') ||
          h.toLowerCase().includes('lh')
      );
      if (ageColumn) console.log(`  Columna de altura (WFL): ${ageColumn}`);
    }

    if (!ageColumn) {
      console.error(`❌ No se encontró columna de edad/altura en ${filePath}`);
      console.error(`  Headers disponibles: ${headers.join(', ')}`);
      return null;
    }

    // Filtrar solo columnas de percentiles válidas (P1, P3, P5, etc.)
    const percentileColumns = headers.filter((h) => percentiles.some((p) => h.includes(p)));

    console.log(`  Columna principal: ${ageColumn}`);
    console.log(`  Percentiles encontrados: ${percentileColumns.join(', ')}`);

    // Transformar datos
    const transformed = data
      .map((row) => {
        const age = Number(row[ageColumn]);
        if (isNaN(age)) return null;

        const percentileData = {
          age: age,
        };

        percentiles.forEach((p) => {
          const column = percentileColumns.find((c) => c.includes(p));
          if (column) {
            percentileData[p.toLowerCase()] = Number(row[column]) || null;
          }
        });

        return percentileData;
      })
      .filter((row) => row !== null && row.age >= 0 && row.age <= 1825);

    if (transformed.length === 0) {
      console.error(`❌ No hay datos válidos después de filtrar en ${datasetName}`);
      return null;
    }

    console.log(`  ✓ ${transformed.length} registros procesados`);

    return {
      type: datasetName,
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      totalRecords: transformed.length,
      ageRange: {
        min: transformed[0].age,
        max: transformed[transformed.length - 1].age,
      },
      percentiles: percentiles,
      data: transformed,
    };
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  console.log('🔄 Iniciando conversión de datasets...\n');

  let successCount = 0;

  datasets.forEach((dataset) => {
    const filePath = path.join(dataDir, dataset.file);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Archivo no encontrado: ${filePath}`);
      return;
    }

    const converted = convertDataset(filePath, dataset.name);

    if (converted) {
      const outputPath = path.join(outputDir, `${dataset.name}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(converted, null, 2));
      console.log(`  📁 Guardado en: ${dataset.name}.json\n`);
      successCount++;
    }
  });

  console.log(`\n✅ Conversión completada: ${successCount}/${datasets.length} datasets procesados`);
}

main();
