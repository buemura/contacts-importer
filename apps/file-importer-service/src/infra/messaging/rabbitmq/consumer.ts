import { RabbitMQServer } from ".";

export async function rabbitmqConsumer() {
  const broker = new RabbitMQServer(
    process.env.RABBITMQ_URL || "amqp://localhost"
  );
  const rabbitMQService = new RabbitMQService();
  const queues = JSON.parse(process.env.RABBITMQ_QUEUES || "");

  await broker.connect();

  await queues.forEach(async (queue: string) => {
    await broker.startConsuming(queue, async (message) => {
      if (!message) {
        return;
      }

      console.log(`[RabbitMQ]: Successfully consumed message`);
      const object = JSON.parse(message.content.toString());
      console.log(object);

      switch (queue) {
        case "customer":
          await rabbitMQService.handleCustomerEvent(object);
          break;
        case "vehicle":
          await rabbitMQService.handleVehicleEvent(object);
          break;
        default:
          break;
      }
    });
  });
}
