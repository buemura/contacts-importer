import {
  EventProducer,
  EventProps,
} from "../../../application/event/event-producer";

export class InMemoryEventProducer implements EventProducer {
  async produce({ queue, message }: EventProps): Promise<void> {
    console.log("queue:", queue);
    console.log("message:", message);
  }
}
