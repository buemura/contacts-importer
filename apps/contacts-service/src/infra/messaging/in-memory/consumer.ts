import { EventConsumer } from "../../../application/event/event-consumer";

export class InMemoryEventConsumer implements EventConsumer {
  async consume(): Promise<void> {
    console.log("Consuming...");
  }
}
