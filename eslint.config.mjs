import globals, { es2021 } from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    env: {
      commonjs:true,
      es2021:true,
      node: true, // Habilita suporte para APIs do Node.js
    },
    extends:[
      'airbnb-base',
    ],
    parserOptions:{
      ecmaVersion:12,
    },
    rules: {
      'no-param-reassign': 'off',
      camelcase:'off',
      'no-unused-vars':['error', {argsIgnorePattern:'next'}]
    },
  }
];
