const keys = require('./keys');
const {createClient} = require('redis');

(async () => {

    const client = createClient({
        socket: {
            host: keys.REDIS_CLIENT,
            port: keys.REDIS_PORT,
            reconnectStrategy: () => 1000
        }
    }).on('ready', () => {
        console.log('Worker successfully connected to Redis!!');
    }).on('connect', () => {
        console.log('Worker connecting to Redis server...');
    }).on('error', (error) => {
        console.log('Worker error connecting to Redis ' + error);
    });

    await client.connect();

    const subscriber = client.duplicate();
    await subscriber.connect();
    
    await subscriber.subscribe('insert', (message) => {
        client.hSet('values', message, fib(parseInt(message)));
    });
        
})()


function fib(number) {
    if (number < 2) return 1;
    return fib(number - 1) + fib(number - 2);
}