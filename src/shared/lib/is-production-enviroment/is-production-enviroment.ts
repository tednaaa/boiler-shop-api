export const isProductionEnviroment = () => {
  return process.env.NODE_ENV === 'production';
};
