const amqp = require('amqplib');

const main = async () => {
  const connection = await amqp.connect('amqp://guess:guess@rabbitmq');
  const channel = await connection.createChannel();
  const queue = 'hello';
  const q = await channel.assertQueue(queue, {durable: false});
  channel.prefetch(1);
  channel.consume(queue, function reply(msg) {
    const n = parseInt(msg.content.toString());
    console.log("NUMBER: ", n);

    var r = n * 10;

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(r.toString()),
      {
        correlationId: msg.properties.correlationId
      }
    );

    channel.ack(msg);
  });
  console.log("Awaiting for RPC requests");
}

module.exports = {
  main
}
