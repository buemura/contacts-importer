import { RabbitMQServer } from ".";

export class RabbitMQProducer {
  private broker = new RabbitMQServer(
    process.env.RABBITMQ_URL || "amqp://localhost"
  );

  async sendMessage(queue: string, message: any) {
    await this.broker.connect();
    await this.broker.sendMessage(queue, JSON.stringify(message));
    console.log("[RabbitMQ]: Successfully produced message");
    console.log(message);
  }
}
