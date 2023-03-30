import amqp from "amqplib";

export class RabbitMQServer {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(this.uri);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.log("RabbitMQ: Error connecting to Broker");
      throw new Error("RabbitMQ: Error connecting to Broker");
    }
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }

  async sendMessage(queue: string, message: string) {
    this.channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Sent message: ${message}`);
  }

  async startConsuming(
    queue: string,
    callback: (message: amqp.ConsumeMessage | null) => void
  ) {
    return this.channel.consume(queue, (message) => {
      if (message) {
        callback(message);
        this.channel.ack(message);
      }
    });
  }
}
