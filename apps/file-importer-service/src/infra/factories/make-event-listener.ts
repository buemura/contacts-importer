import { EventListener } from "../../application/events/listener";
import { FileStatusUpdateUsecase } from "../../application/usecases/file-status-update-usecase";
import { PrismaFileRepository } from "../database/prisma/file-repository";
import { RabbitMQConsumer } from "../messaging";
import { MessagingService } from "../messaging/service/messaging-service";

export function makeEventListener() {
  const fileRepository = new PrismaFileRepository();
  const fileStatusUpdateUsecase = new FileStatusUpdateUsecase(fileRepository);
  const messagingService = new MessagingService(fileStatusUpdateUsecase);
  const rabbitMQConsumer = new RabbitMQConsumer(messagingService);
  const eventListener = new EventListener(rabbitMQConsumer);
  return eventListener;
}
