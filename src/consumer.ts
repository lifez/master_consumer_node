import amqp, { Channel, Connection } from "amqplib";

const RABBIT_HOST = process.env.RABBIT_HOST || "localhost";

export const startConsumer = () => {
  amqp.connect(`amqp://${RABBIT_HOST}`).then((connection: Connection) => {
    connection.createChannel().then((channel: Channel) => {
      var queue = "user_snapshot";
      channel.assertQueue("task_queue", { durable: true });

      channel.prefetch(1);
      channel.consume(
        queue,
        (msg) => {
          console.log(" [x] Receive %s", msg!.content);
          setTimeout(() => {
            channel.ack(msg!);
          }, 5000);
        },
        { noAck: false }
      );
    });
  });
};
