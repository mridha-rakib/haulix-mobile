/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          verbatimModuleSyntax: false,
          module: "commonjs",
          moduleResolution: "node",
          jsx: "react-jsx",
          skipLibCheck: true,
          noImplicitAny: false,
        },
      },
    ],
  },
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{ts,tsx}", "<rootDir>/src/**/*.test.{ts,tsx}"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/../../packages/ui/jest/mock-file.js",
    "^react-native$": "react-native-web",
    "^react-native-safe-area-context$": "<rootDir>/../../packages/ui/jest/mock-safe-area.js",
    "^@haulix/design-tokens$": "<rootDir>/../../packages/design-tokens/src/index.ts",
    "^@haulix/design-tokens/(.*)$": "<rootDir>/../../packages/design-tokens/$1",
    "^@haulix/logger$": "<rootDir>/../../packages/logger/src/index.ts",
    "^@haulix/utils$": "<rootDir>/../../packages/utils/src/index.ts",
    "^@haulix/i18n$": "<rootDir>/../../packages/i18n/src/index.ts",
    "^@haulix/ui$": "<rootDir>/../../packages/ui/src/index.ts",
  },
  globals: {
    __DEV__: true,
  },
};

module.exports = config;
