import amqp, { Channel, Connection } from "amqplib";

const RABBIT_HOST = process.env.RABBIT_HOST || "localhost";

export const startMaster = () => {
  amqp.connect(`amqp://${RABBIT_HOST}`).then((connection: Connection) => {
    connection.createChannel().then((channel: Channel) => {
      var queue = "user_snapshot";

      channel.assertQueue(queue, {
        durable: true,
      });
      Array.from(Array(100).keys()).map((each) => {
        channel.sendToQueue(queue, Buffer.from(each.toString()), {
          deliveryMode: true,
        });
        console.log(" [x] Sent %s", each);
      });
    });
  });
};
