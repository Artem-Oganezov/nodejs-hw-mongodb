import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultValue = null) {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(
    `Environment variable ${name} is not set and no default value provided.`,
  );
}
