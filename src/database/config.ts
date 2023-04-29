import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  dialect: process.env.SQL_DIALECT,
  logging: Boolean(process.env.SQL_LOGGING),
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}));
