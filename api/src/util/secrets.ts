import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.debug('Using .env.dev file to supply config environment variables');
    dotenv.config({ path: '.env.dev' }); // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env['ENV'];
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const MONGODB_URI = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
logger.debug(MONGODB_URI);
if (!MONGODB_URI) {
    if (prod) {
        logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
    } else {
        logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}

export const JWT_SECRET = process.env['JWT_SECRET'];

if (!JWT_SECRET) {
    logger.error('No JWT secret string. Set JWT_SECRET environment variable.');
    process.exit(1);
}
