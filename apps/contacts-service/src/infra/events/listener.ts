import { makeNewContactsUsecase } from "../factories/make-file-status-update";
import { RabbitMQConsumer } from "../messaging/rabbitmq/consumer";
import { MessagingService } from "../messaging/service/messaging-service";

export function eventListener() {
  const newContactsUsecase = makeNewContactsUsecase();

  const messagingService = new MessagingService(newContactsUsecase);
  const rabbitMQConsumer = new RabbitMQConsumer(messagingService);
  return rabbitMQConsumer.consume();
}
