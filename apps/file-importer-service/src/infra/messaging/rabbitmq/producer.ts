import {
  EventProducer,
  EventProps,
} from "../../../application/event/event-producer";
import { RabbitMQServer } from "./server";

export class RabbitMQProducer implements EventProducer {
  private readonly broker: RabbitMQServer;

  constructor() {
    this.broker = new RabbitMQServer(
      process.env.RABBITMQ_BROKER_URL ?? "amqp://localhost:5672"
    );
  }

  async produce({ queue, message }: EventProps): Promise<void> {
    await this.broker.connect();
    await this.broker.publishInQueue(queue, message);

    console.log("[RabbitMQ]: Successfully produced message");
    console.log(message);

    await this.broker.close();
  }
}
