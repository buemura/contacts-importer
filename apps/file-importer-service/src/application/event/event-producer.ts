export interface EventProps {
  queue: string;
  message: string;
}

export interface EventProducer {
  produce(event: EventProps): Promise<void>;
}
