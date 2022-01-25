// Import packages.
const express = require('express')
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guess:guess@rabbitmq', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
});

// Create and configure a webserver.
const app = express()
app.use(express.json())


// Create a test endpoint
app.get('/', async (req, res) => {
  res.status(200).send('SERVER 6');
})

// Start the webserver.
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
