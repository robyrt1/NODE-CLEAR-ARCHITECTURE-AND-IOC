
export default {
  testEnviroment: 'node',
  roots : ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    
  },
  testEnviromentOptions: {
    resources: 'usable',
    errorOnDeprecated: true
  },
  clearMocks: true,
  coverageProvider: "v8",
  };