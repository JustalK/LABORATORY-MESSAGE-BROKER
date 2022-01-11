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
* Register the event of the server 1
**/
redisClient.subscribe("SERVER_1", (err, count) => {
  console.log(`Subscribed to SERVER_1.`);
});

/**
* Managing when the server is receiving a message from server 2
**/
redisClient.on("message", (channel, message) => {
  if (channel === "SERVER_1") {
    console.log("SERVER_2 : ", message)
  }
});

app.post('/call/server1', async (req, res) => {
    const data = "FROM SERVER 2";
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
