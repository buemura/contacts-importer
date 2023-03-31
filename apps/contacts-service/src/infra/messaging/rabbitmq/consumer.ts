import { EventConsumer } from "../../../application/event/event-consumer";
import { QUEUES } from "../../../helpers/constants/messaging";
import { MessagingService } from "../service/messaging-service";
import { RabbitMQServer } from "./server";

export class RabbitMQConsumer implements EventConsumer {
  private readonly broker: RabbitMQServer;

  constructor(private readonly messagingService: MessagingService) {
    this.broker = new RabbitMQServer(
      process.env.RABBITMQ_BROKER_URL ?? "amqp://localhost:5672"
    );
  }

  async consume(): Promise<void> {
    await this.broker.connect();

    const queue = QUEUES.CONTACTS_FILE_NEW;

    await this.broker.startConsuming(queue, async (message) => {
      if (!message) {
        return;
      }

      console.log(`[RabbitMQ]: Successfully consumed message`);
      console.log(message.content.toString());
      const object = JSON.parse(message.content.toString());
      await this.messagingService.handleEvent(queue, object);
    });
  }
}
