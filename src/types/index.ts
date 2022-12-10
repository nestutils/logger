/**
 * Logging Options For Logger
 */
export interface LoggerOptions {
  timestamp?: string | boolean;
  useStringInterpolation?: boolean;
  logFormat?: LogFormat;
  context?: string;
  defaultLoggingContext?: string;
  allowedLogLevels?: LogLevels;
  providerName?: string;
}

export enum LogFormat {
  JSON = 'JSON',
  SIMPLE = 'SIMPLE',
}

// As Per RFC5424 defined the 7 logging levels.
// https://www.rfc-editor.org/rfc/rfc5424
export enum LogLevels {
  error = 'error',
  warn = 'error',
  info = 'info',
  debug = 'debug',
}
