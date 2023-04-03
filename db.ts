import {redis} from './deps.ts'

export const db = await redis.connect({
    hostname: 'redis-14781.c1.us-east1-2.gce.cloud.redislabs.com',
    port: 14781,
    username: 'scatterbot',
    password: Deno.env.get('DB_PASS')
})