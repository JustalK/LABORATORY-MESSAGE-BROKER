// Import packages.
const express = require('express')
const amqp = require('amqplib');

// Create and configure a webserver.
const app = express()
app.use(express.json())


// Create a test endpoint
app.get('/', async (req, res) => {
  res.status(200).send('SERVER 7');
})

app.get('/server6', async (req, res) => {
  const connection = await amqp.connect('amqp://guess:guess@rabbitmq');
  const channel = await connection.createChannel();
  const queue = 'hello';
  const q = await channel.assertQueue('', {durable: false});
  channel.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
  }, {
      noAck: true
  });
})

// Start the webserver.
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
