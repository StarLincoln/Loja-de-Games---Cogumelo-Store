const { createDefaultPreset } = require("@jest/globals");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest', // usa TypeScript!
  testEnvironment: 'node', // roda no Node.js
  testMatch: ['**/*.test.ts'], // arquivos que terminam com .test.ts
};