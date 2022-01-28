// Import packages.
const express = require('express')
const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

// Create and configure a webserver.
const app = express()
app.use(express.json())

// Create a test endpoint
app.get('/', async (req, res) => {
  res.status(200).send('SERVER 7');
})

app.get('/server6', async (req, res) => {
  const correlationId = uuidv4();
  const num = parseInt(10);

  const connection = await amqp.connect('amqp://guess:guess@rabbitmq');
  const channel = await connection.createChannel();
  const queue = 'hello';
  const q = await channel.assertQueue('', {durable: false});
  channel.consume(q.queue, function(msg) {
    if (msg.properties.correlationId == correlationId) {
       console.log(' [.] Got %s', msg.content.toString());
       res.status(200).send({
         result: msg.content.toString()
       });
     }
  }, {
      noAck: true
  });

  channel.sendToQueue(queue,
    Buffer.from(num.toString()),{
      correlationId: correlationId,
      replyTo: q.queue
    }
  );
})

// Start the webserver.
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
