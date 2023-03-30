import {
  EventProducer,
  EventProps,
} from "../../../application/event/event-producer";
import { RabbitMQServer } from "./server";

export class RabbitMQProducer implements EventProducer {
  constructor(private readonly broker: RabbitMQServer) {}

  async produce({ queue, message }: EventProps): Promise<void> {
    await this.broker.connect();
    await this.broker.sendMessage(queue, JSON.stringify(message));
    console.log("[RabbitMQ]: Successfully produced message");
    console.log(message);
  }
}
