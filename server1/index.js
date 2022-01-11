// Import packages.
const express = require('express')
const redis = require('ioredis')
const NRP = require("node-redis-pubsub");
const { promisify } = require('util')

// Create and configure a webserver.
const app = express()
app.use(express.json())

// Create and configure a Redis client.
const redisClient = redis.createClient('2999', process.env.REDIS_SERVER_IP)
redisClient.on('error', error =>  console.error(error))

redisClient.subscribe("send-user-data", (err, count) => {
  if (err) console.error(err.message);
  console.log(`Subscribed to ${count} channels.`);
});

redisClient.on("message", (channel, message) => {
  console.log(channel, message)
});

app.post('/call/server1', async (req, res) => {
    const data = "FROM SERVER 2";
    nrp.emit("SERVER_2", data);
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
