import { isProductionEnviroment } from './is-production-enviroment';

describe('process.env', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();

    process.env = { ...env };
  });

  it('should return true if production mode', () => {
    process.env.NODE_ENV = 'production';

    expect(isProductionEnviroment()).toBeTruthy();
  });

  it('should return false if not production mode', () => {
    process.env.NODE_ENV = 'development';

    expect(isProductionEnviroment()).toBeFalsy();
  });

  afterEach(() => {
    process.env = env;
  });
});
