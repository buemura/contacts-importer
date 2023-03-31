import { NewContactsUsecase } from "../../application/usecases/new-contacts-usecase";
import { PrismaContactRepository } from "../database/prisma/contact-repository";
import { PrismaFileRepository } from "../database/prisma/file-repository";
import { RabbitMQProducer } from "../messaging";

export function makeNewContactsUsecase() {
  const rabbitMQProducer = new RabbitMQProducer();
  const fileRepository = new PrismaFileRepository();
  const contactRepository = new PrismaContactRepository();
  const newContactsUsecase = new NewContactsUsecase(
    fileRepository,
    contactRepository,
    rabbitMQProducer
  );

  return newContactsUsecase;
}
