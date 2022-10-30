const keys = require('./keys');
const express = require('express');
const cors = require('cors');

const app = express();

// Express API setup

app.use(express.json());
app.use(cors());


// PG client setup

const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUserName,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', () => {
    console.log('Lost Database connection..');
});

pgClient.on('connect', (client) => {
    client
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((error) => console.log("Error==>" + error));
});

// Redis client setup

const { createClient } = require('redis');
const redisClient = createClient({
    socket: {
        host: keys.redisHost || 'localhost',
        port: keys.redisPort || 6359,
        reconnectStrategy: () => 1000
    }
})
    .on('connect', () => {
        console.log(`Successfully connected to Redis server`);
    })
    .on('error', (error) => {
        console.log(`Error connecting to redis ==> ${error}`);
    });

(async () => await redisClient.connect())()
 

// Express routes handlers

app.get('/', (req, res) => {
    res.send('Hiiiii');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    const values = await redisClient.hGetAll('values');
    res.send(values);
});

app.post('/values', async (req, res) => {

    const index = req.body.index;

    if (parseInt(index) > 40) {
        res.status(422).send('Values or index too high.');
    };

    await redisClient.hSet('values', index, 'Nothing yet');
    await redisClient.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ working: true });
});

app.listen(keys.servePort, () => {
    console.log(`Server running on port : ${keys.servePort}`);
});