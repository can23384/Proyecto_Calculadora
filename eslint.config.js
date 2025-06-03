// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// eslint.config.js

import neostandard from 'neostandard'
import pkg from 'globals'           // Importar todo el módulo CommonJS
const { jest: jestGlobals } = pkg   // Extraer la propiedad 'jest' del objeto

// 1) Resolver neostandard() antes de exportar para que no retorne un array anidado
const neoConfig = await neostandard()

export default [/***** BLOQUE 1: Ignorar carpetas innecesarias *****/
{
  ignores: ['node_modules/**', 'dist/**']
}, /***** BLOQUE 2: Configuración base de neostandard (desempaquetada) *****/
...neoConfig, /* 
  neostandard() retorna un array de objetos de configuración.
  Con el operador spread ( ... ) insertamos cada objeto en el nivel superior,
  evitando “Unexpected array.” :contentReference[oaicite:5]{index=5}.
*/

/***** BLOQUE 3: Reglas personalizadas generales *****/
{
  rules: {
    // 3.1) Prohibir punto y coma
    'semi': ['error', 'never'],

    // 3.2) Límite de 120 caracteres por línea (ignorar URLs)
    'max-len': ['error', { code: 120, ignoreUrls: true }]
  }
}, /***** BLOQUE 4: Override para archivos de test usando Jest *****/
{
  // 4.1) Aplica solo a archivos de tests: __tests__/**/*.{js,jsx,ts,tsx}, *.test.js[x], *.spec.js[x]
  files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // 4.2) En lugar de “env: { jest: true }”, usamos “languageOptions.globals” (ESLint v9 Flat Config)
  languageOptions: {
    globals: {
      // 4.2.1) Importamos todas las globals de Jest de forma explícita
      ...jestGlobals
    }
  },
  plugins: {
    // 4.3) Registrar eslint-plugin-jest para reglas específicas de testing
    jest: {}
  },
  // 4.4) Extender las reglas recomendadas de eslint-plugin-jest en Flat Config
  ...require('eslint-plugin-jest').configs['flat/recommended'],
  rules: {
    // 4.5) Asegurar que no se marque “describe”, “it”, “expect” como no definidos
    'no-undef': 'off'
  }
}, ...storybook.configs["flat/recommended"]];

