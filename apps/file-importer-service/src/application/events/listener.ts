import { EventConsumer } from "../event/event-consumer";

export class EventListener {
  constructor(private readonly eventConsumer: EventConsumer) {}

  async execute() {
    return this.eventConsumer.consume();
  }
}
