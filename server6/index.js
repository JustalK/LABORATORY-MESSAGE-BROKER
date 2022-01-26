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

    channel.assertQueue(queue, {
      durable: false
    });

    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');

    channel.consume(queue, function reply(msg) {
      const n = parseInt(msg.content.toString());
      console.log("NUMBER: ", n);

      var r = n * 10;

      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(r.toString()), {
          correlationId: msg.properties.correlationId
        });

      channel.ack(msg);
    });
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
