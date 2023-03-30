import { EventConsumer } from "../../../application/event/event-consumer";
import { QUEUES } from "../../../helpers/constants/messaging";
import { MessagingService } from "../service/messaging-service";
import { RabbitMQServer } from "./server";

export class RabbitMQConsumer implements EventConsumer {
  constructor(
    private readonly broker: RabbitMQServer,
    private readonly messagingService: MessagingService
  ) {}

  async consume(): Promise<void> {
    await this.broker.connect();

    const queues = [QUEUES.CONTACTS_IMPORTER_FILE];

    const queuesListener = queues.map(async (queue: string) => {
      await this.broker.startConsuming(queue, async (message) => {
        if (!message) {
          return;
        }

        console.log(`[RabbitMQ]: Successfully consumed message`);
        const object = JSON.parse(message.content.toString());
        console.log(object);

        await this.messagingService.handleEvent(queue, object);
      });
    });

    await Promise.all(queuesListener);
  }
}
