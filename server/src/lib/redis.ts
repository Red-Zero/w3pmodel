'use strict';
import Redis from 'ioredis';
import { getConfig } from 'src/getConfig';

const config = getConfig('redis');
const redis = new Redis(config);
console.log('redis link success ');
export default redis;
