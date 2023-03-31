import { NewContactsUsecase } from "../../../application/usecases/new-contacts-usecase";
import { QUEUES } from "../../../helpers/constants/messaging";

export class MessagingService {
  constructor(private readonly newContactsUsecase: NewContactsUsecase) {}

  async handleEvent(queue: string, message: any) {
    switch (queue) {
      case QUEUES.CONTACTS_FILE_NEW:
        await this.newContactsUsecase.execute({
          fileId: message.data.fileId,
          fileStatus: message.data.fileStatus,
          content: message.data.content,
        });
        break;
      default:
        break;
    }
  }
}
