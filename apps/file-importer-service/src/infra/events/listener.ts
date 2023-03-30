import { FileStatusUpdateUsecase } from "../../application/usecases/file-status-update-usecase";
import { PrismaFileRepository } from "../database/prisma/file-repository";
import { RabbitMQConsumer } from "../messaging/rabbitmq/consumer";
import { MessagingService } from "../messaging/service/messaging-service";

export function eventListener() {
  const fileRepository = new PrismaFileRepository();
  const fileStatusUpdateUsecase = new FileStatusUpdateUsecase(fileRepository);
  const messagingService = new MessagingService(fileStatusUpdateUsecase);
  const rabbitMQConsumer = new RabbitMQConsumer(messagingService);
  return rabbitMQConsumer.consume();
}
