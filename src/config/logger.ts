import pino from 'pino';
import pinoms from 'pino-multi-stream';

// Configuring the stream to Elasticsearch
const pinoElastic = require('pino-elasticsearch');
const streamToElastic = pinoElastic({
  node: process.env.ELASTICSEARCH_URL, 
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME, 
    password: process.env.ELASTICSEARCH_PASSWORD, 
  },
  index: 'user-management-logs', // The Elasticsearch index to store the logs in  
});

// Streams for logging: stdout and Elasticsearch
const streams = [
  { stream: process.stdout }, 
  { stream: streamToElastic },
];

// Initialize Pino logger
let loggerOptions = {};
if (process.env.NODE_ENV !== 'production') {
  loggerOptions = {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true }
    }
  };
}

// Initialize Pino logger with multiple streams
export const logger = pino({}, pinoms.multistream(streams));