/**
 * Logging Options For Logger
 */
export interface LoggerOptions {
  timestamp?: boolean;
  context?: string;
  providerName?: string;
}

// As Per RFC5424 defined the 7 logging levels.
// https://www.rfc-editor.org/rfc/rfc5424
export enum LogLevels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
}
