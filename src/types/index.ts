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
}

export enum LogFormat {
  JSON = 'JSON',
  SIMPLE = 'SIMPLE',
}

// As Per RFC5424 defined the 7 logging levels.
// https://www.rfc-editor.org/rfc/rfc5424
export enum LogLevels {
  emerg = 0,
  alert = 1,
  crit = 2,
  error = 3,
  warning = 4,
  notice = 5,
  info = 6,
  debug = 7,
}
