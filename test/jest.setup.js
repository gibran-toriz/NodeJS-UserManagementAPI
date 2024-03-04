// Mock the logger
jest.mock('../src/config/logger', () => ({
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
  }));
  