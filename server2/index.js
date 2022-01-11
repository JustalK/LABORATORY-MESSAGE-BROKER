// Import packages.
const express = require('express')
const redis = require('ioredis')
const { promisify } = require('util')

// Create and configure a webserver.
const app = express()
app.use(express.json())

// Create and configure a Redis client.
const redisClient = redis.createClient('2999', process.env.REDIS_SERVER_IP)
redisClient.on('connect', () => console.log('Connected to Redis') )
redisClient.on('error', error =>  console.error(error))

/**
* Send a message with data to server 1
**/
app.get('/call/server2/from/server1', async (req, res) => {
    const data = "FROM SERVER 1";
    redisClient.publish("SERVER_1", data);
    res.status(200).send(data);
})

// Create an endpoint to set a key value pair.
app.post('/setValue', async (req, res) => {

})

// Create an endpoint to get a key value pair.
app.get('/getValue/:key', async (req, res) => {

})

// Start the webserver.
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
