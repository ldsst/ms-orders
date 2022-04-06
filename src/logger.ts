import { createLogger, format, transports } from 'winston';
import { LoggerService } from '@nestjs/common';

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.json(),
  defaultMeta: {
    service: 'arbwallet-ms-orders',
    env: process.env.ENV === 'production' ? 'production' : 'staging',
  },
  transports: [new transports.Console()],
});

export class CommonLogger implements LoggerService {
  log(message) {
    logger.info(message);
  }
  error(message: string, trace: string) {
    logger.error(message, trace);
  }
  warn(message: string) {
    logger.warn(message);
  }
  debug(message: string) {
    logger.debug(message);
  }
  verbose(message: string) {
    logger.verbose(message);
  }
}
