export interface EventProps {
  queue: string;
  message: string;
}

export interface EventConsumer {
  consume(): Promise<void>;
}
