import { Request, Response, Router } from "express";
import { makeContactsController } from "../factories/make-contacts-controller";

const routers = Router();
const contactsController = makeContactsController();

routers.get("/contacts", (request: Request, reply: Response) => {
  return contactsController.getContacts(request, reply);
});

export { routers as contactsRouters };
