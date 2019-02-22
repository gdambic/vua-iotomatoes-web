export const UserRole = {
  ADMINISTRATOR: 'A',
  USER: 'U'
}

export const HttpStatusCode = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

export const ActuatorType = {
  PUMP: 1,
  LIGHT: 2,
  COOLING: 3,
  HEATING: 4
}

export const SensorType = {
  TEMPERATURE: 1,
  AIR_HUMIDITY: 2,
  LIGHT: 3,
  SOIL_HUMIDITY: 4
}

export const DecimalMask = {
  blocks: [2, 7],
  delimiters: ['.']
}