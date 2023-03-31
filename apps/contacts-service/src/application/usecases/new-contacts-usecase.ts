import { QUEUES } from "../../helpers/constants/messaging";
import { formatMessage } from "../../helpers/format-message";
import { validateCreditCard } from "../../helpers/validations/validate-credit-card";
import { validateEmail } from "../../helpers/validations/validate-email";
import { validatePhone } from "../../helpers/validations/validate-phone";
import { ContactFromEvent, NewContactsDto } from "../dtos/new-contacts-dto";
import { UpdateFileDto } from "../dtos/new-file-dto";
import { EventProducer } from "../event/event-producer";
import { ContactRepository } from "../repositories/contact-repository";
import { FileRepository } from "../repositories/file-repository";

export class NewContactsUsecase {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly contactRepository: ContactRepository,
    private readonly eventProducer: EventProducer
  ) {}

  async execute(data: NewContactsDto) {
    let errorCounter = 0;
    const contacts = data.content;

    const file = await this.fileRepository.create({
      id: data.fileId,
      status: "In Progress",
    });

    await this.sendFileStatusUpdate(file);

    // // Slow creation *not efficient*
    // await this.slowContactsCreation(file.id, contacts, errorCounter);

    // Fast creation *more efficient*
    await this.fastContactsCreation(file.id, contacts, errorCounter);

    const statusUpdated = this.getStatusUpdated({
      contacts: contacts.length,
      errorCounter,
    });

    await this.fileRepository.update({
      id: file.id,
      status: statusUpdated,
    });

    await this.sendFileStatusUpdate({
      id: file.id,
      status: statusUpdated,
    });
  }

  protected validateContact(contact: ContactFromEvent) {
    let isContactValid = true;
    const errors = [];

    if (!validateEmail(contact.email)) {
      errors.push("email");
    }

    if (!validatePhone(contact.phoneNumber)) {
      errors.push("phone_number");
    }

    if (!validateCreditCard(contact.creditCardNumber)) {
      errors.push("credit_card_number");
    }

    if (errors.length > 0) {
      isContactValid = false;
    }

    return { isContactValid, errors };
  }

  protected getStatusUpdated({
    contacts,
    errorCounter,
  }: {
    contacts: number;
    errorCounter: number;
  }) {
    if (contacts === errorCounter) {
      return "Failed";
    }

    return "Terminated";
  }

  protected async sendFileStatusUpdate(file: UpdateFileDto) {
    const messageToSend = formatMessage({
      data: {
        fileId: file.id,
        status: file.status,
      },
    });

    await this.eventProducer.produce({
      queue: QUEUES.CONTACTS_FILE_UPDATE,
      message: messageToSend,
    });
  }

  protected async slowContactsCreation(
    fileId: string,
    contacts: ContactFromEvent[],
    errorCounter: number
  ) {
    for (const contact of contacts) {
      const { isContactValid, errors } = this.validateContact(contact);

      if (!isContactValid) {
        errorCounter++;
      }

      const parsedErrors = errors.join(",");

      await this.contactRepository.create({
        fileId: fileId,
        name: contact.name,
        email: contact.email,
        address: contact.address,
        phoneNumber: contact.phoneNumber,
        company: contact.company,
        jobTitle: contact.jobTitle,
        creditCardNumber: contact.creditCardNumber,
        dateOfBirth: contact.dateOfBirth,
        isValid: isContactValid,
        errors: parsedErrors,
      });
    }
  }

  protected async fastContactsCreation(
    fileId: string,
    contacts: ContactFromEvent[],
    errorCounter: number
  ) {
    const contactsToCreate = contacts.map((contact) => {
      const { isContactValid, errors } = this.validateContact(contact);

      if (!isContactValid) {
        errorCounter++;
      }

      const parsedErrors = errors.join(",");

      return {
        fileId: fileId,
        name: contact.name,
        email: contact.email,
        address: contact.address,
        phoneNumber: contact.phoneNumber,
        company: contact.company,
        jobTitle: contact.jobTitle,
        creditCardNumber: contact.creditCardNumber,
        dateOfBirth: contact.dateOfBirth,
        isValid: isContactValid,
        errors: parsedErrors,
      };
    });

    await this.contactRepository.createMany(contactsToCreate);
  }
}
