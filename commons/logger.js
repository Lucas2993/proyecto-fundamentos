/**
 * Modulo de configuracion del log4js.
 */
const log4js = require('log4js');

// configuro la salida de los logs en un archivo y en la consola.
log4js.configure({
	appenders: { file: { type: 'file', filename: 'logs/server.log' }, console: { type: 'stdout' } },
	categories: { default: { appenders: ['file', 'console'], level: 'all' } }
});

// obtengo una instancia del logger
const logger = log4js.getLogger('app');

module.exports = logger;