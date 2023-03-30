import { FileStatusUpdateUsecase } from "../../../application/usecases/file-status-update-usecase";
import { QUEUES } from "../../../helpers/constants/messaging";

export class MessagingService {
  constructor(
    private readonly fileStatusUpdateUsecase: FileStatusUpdateUsecase
  ) {}

  async handleEvent(queue: string, message: any) {
    switch (queue) {
      case QUEUES.CONTACTS_FILE_UPDATE:
        await this.fileStatusUpdateUsecase.execute({
          fileId: message.fileId,
          status: message.status,
        });
        break;
      default:
        break;
    }
  }
}
