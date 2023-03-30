import { FileStatusUpdateUsecase } from "../../../application/usecases/file-status-update-usecase";
import { EVENT_TYPES, QUEUES } from "../../../helpers/constants/messaging";

export class MessagingService {
  constructor(
    private readonly fileStatusUpdateUsecase: FileStatusUpdateUsecase
  ) {}

  async handleEvent(queue: string, message: any) {
    if (queue === QUEUES.CONTACTS_IMPORTER_FILE) {
      switch (message.eventType) {
        case EVENT_TYPES.FILE_IMPORT_UPDATE:
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
}
