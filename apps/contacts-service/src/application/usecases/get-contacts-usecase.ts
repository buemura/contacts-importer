import { ContactRepository } from "../repositories/contact-repository";

export class GetContactsUsecase {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute() {
    const contacts = await this.contactRepository.findAll();
    return contacts;
  }
}
