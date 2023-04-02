import { GetContactsUsecase } from "../../../application/usecases/get-contacts-usecase";
import { PrismaContactRepository } from "../../../infra/database/prisma/contact-repository";
import { ContactsController } from "../controllers/contacts-controller";

export function makeContactsController() {
  const contactsRepository = new PrismaContactRepository();
  const getContactsUsecase = new GetContactsUsecase(contactsRepository);
  const contactsController = new ContactsController(getContactsUsecase);
  return contactsController;
}
