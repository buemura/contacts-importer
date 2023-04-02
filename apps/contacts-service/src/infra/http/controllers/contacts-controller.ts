import { Request, Response } from "express";
import { GetContactsUsecase } from "../../../application/usecases/get-contacts-usecase";

export class ContactsController {
  constructor(private readonly getContactsUsecase: GetContactsUsecase) {}

  async getContacts(request: Request, reply: Response) {
    try {
      const contacts = await this.getContactsUsecase.execute();
      return reply.send(contacts);
    } catch (error: any) {
      return reply.send({
        message: error.message,
      });
    }
  }
}
