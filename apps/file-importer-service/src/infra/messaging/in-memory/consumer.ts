import { EventConsumer } from "src/application/event/event-consumer";

export class InMemoryEventConsumer implements EventConsumer {
  async consume(): Promise<void> {
    console.log("Consuming...");
  }
}
